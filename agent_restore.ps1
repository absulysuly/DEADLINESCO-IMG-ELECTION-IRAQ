# ===============================
# 🧠 Hamlet Agent Monitor — Local Restore v3.0
# ===============================

Write-Host "🔄 Restoring local agent monitor..."

# Define base directories
$baseDir = "E:\HamletUnified"
$agentDir = "$baseDir\full_consolidation\agents"
$monitorDir = "$baseDir\monitoring"

# Ensure monitoring folder exists
if (!(Test-Path $monitorDir)) {
    New-Item -ItemType Directory -Path $monitorDir | Out-Null
    Write-Host "📁 Created monitoring directory at $monitorDir"
}

# Initialize monitoring files
$statusFile = "$monitorDir\agent_status.json"
$logFile = "$monitorDir\agent_logs.log"
$alertFile = "$monitorDir\alerts.json"

# Scan for active agents
Write-Host "🔍 Scanning for agents in $agentDir ..."
$agents = Get-ChildItem -Path $agentDir -Recurse -Include *.json,*.ts,*.js,*.py | Select-Object FullName, Name, LastWriteTime

if ($agents.Count -eq 0) {
    Write-Host "⚠️ No agents found — please verify the agent folder path."
} else {
    $agentData = @()
    foreach ($agent in $agents) {
        $obj = [PSCustomObject]@{
            agent_id    = ($agent.Name -replace '\..*$', '')
            governorate = ($agent.FullName -split '\\')[-2]
            role        = ($agent.Name -replace '.*_', '').Split('.')[0]
            status      = "active"
            last_ping   = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
        }
        $agentData += $obj
    }

    # Save to JSON
    $agentData | ConvertTo-Json -Depth 5 | Set-Content $statusFile
    Write-Host "✅ Agent registry restored to $statusFile"
}

# Create empty alert and log files
if (!(Test-Path $alertFile)) { "[]" | Out-File $alertFile }
if (!(Test-Path $logFile)) { "" | Out-File $logFile }

# Start heartbeat monitor loop
Write-Host "💓 Starting local agent heartbeat monitor (interval: 3 min)..."

while ($true) {
    $agentStatus = Get-Content $statusFile | ConvertFrom-Json
    $now = Get-Date

    foreach ($agent in $agentStatus) {
        $delta = ($now - [datetime]$agent.last_ping).TotalMinutes
        if ($delta -gt 10) {
            $alert = [PSCustomObject]@{
                agent_id = $agent.agent_id
                message  = "Agent inactive for $([math]::Round($delta,1)) min"
                timestamp = $now.ToString("yyyy-MM-ddTHH:mm:ss")
            }
            $alerts = Get-Content $alertFile | ConvertFrom-Json
            $alerts += $alert
            $alerts | ConvertTo-Json -Depth 5 | Set-Content $alertFile
            Add-Content $logFile "⚠️ $($alert.timestamp): $($alert.message)"
            Write-Host "⚠️ $($agent.agent_id) inactive for $([math]::Round($delta,1)) minutes"
        }
    }

    Start-Sleep -Seconds 180
}
