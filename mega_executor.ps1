# ==========================================================
# ?? Hamlet Mega Executor v4 — Safe Polyglot Controller
# ==========================================================
Write-Host "??  Initializing Mega Executor v4..."

$baseDir = "E:\HamletUnified"
$agentDir = "$baseDir\CascadeProjects\windsurf-project-8\agents"
$monitorDir = "$baseDir\monitoring"
$queueDir = "$baseDir\task_queue"

foreach ($dir in @($monitorDir, $queueDir)) {
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
}

$statusFile = "$monitorDir\executor_status.json"
$logFile    = "$monitorDir\executor_log.log"
if (!(Test-Path $statusFile)) { "[]" | Out-File $statusFile }
Add-Content $logFile "?? Mega Executor started at $(Get-Date)"

function LogEvent($msg) {
    $entry = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') | $msg"
    Add-Content $logFile $entry
    Write-Host $entry
}

function Execute-Task($command) {
    LogEvent "?? Task received: $command"
    $lower = $command.ToLower()
    switch -Wildcard ($lower) {
        "*restart*" { LogEvent "?? Restarting all agents..."; Get-Process | Where-Object { $_.ProcessName -like "*agent*" } | Stop-Process -Force -ErrorAction SilentlyContinue; LogEvent "? Agents restarted." }
        "*status*"  { LogEvent "?? Reporting agent status..."; if (Test-Path $statusFile) { Get-Content $statusFile | Out-Host } else { LogEvent "?? No status file found." } }
        "*scan*"    {
            LogEvent "?? Scanning agents in $agentDir ..."
            $agents = Get-ChildItem -Path $agentDir -Recurse -Include *.json,*.js,*.ts,*.py -ErrorAction SilentlyContinue
            $agentData = @()
            foreach ($agent in $agents) {
                $agentData += [PSCustomObject]@{
                    agent_id    = $agent.BaseName
                    governorate = ($agent.FullName -split '\\')[-2]
                    status      = "active"
                    last_update = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
                }
            }
            $agentData | ConvertTo-Json -Depth 5 | Set-Content $statusFile
            LogEvent "? Scan complete: $($agentData.Count) agents found."
        }
        "*exit*"    { LogEvent "?? Executor stopped by user."; exit }
        default     {
            LogEvent "?? Executing PowerShell: $command"
            try { Invoke-Expression $command; LogEvent "? Executed successfully." }
            catch { LogEvent "? Execution failed: $($_.Exception.Message)" }
        }
    }
}

LogEvent "?? Monitoring task queue in $queueDir ..."
while ($true) {
    $tasks = Get-ChildItem $queueDir -Filter *.task -ErrorAction SilentlyContinue
    foreach ($task in $tasks) {
        $cmd = Get-Content $task.FullName | Out-String
        Execute-Task $cmd
        Remove-Item $task.FullName -Force
    }
    Start-Sleep -Seconds 10
}
