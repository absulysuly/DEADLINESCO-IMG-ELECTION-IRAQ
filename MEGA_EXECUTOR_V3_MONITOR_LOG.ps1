Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\HB LAPTOP STORE> cd E:\HamletUnified
PS E:\HamletUnified> ./MEGA_EXECUTOR_V3_MONITOR_LOG.ps1
At E:\HamletUnified\MEGA_EXECUTOR_V3_MONITOR_LOG.ps1:113 char:11
+ Safe-Log "ðŸ§© Frontend environment file generated."
+           ~~~~
Unexpected token 'ðŸ§©' in expression or statement.
    + CategoryInfo          : ParserError: (:) [], ParseException
    + FullyQualifiedErrorId : UnexpectedToken

PS E:\HamletUnified> cd E:\HamletUnified
PS E:\HamletUnified> ./MEGA_EXECUTOR_V3_MONITOR_LOG.ps1
At E:\HamletUnified\MEGA_EXECUTOR_V3_MONITOR_LOG.ps1:113 char:11
+ Safe-Log "ðŸ§© Frontend environment file generated."
+           ~~~~
Unexpected token 'ðŸ§©' in expression or statement.
    + CategoryInfo          : ParserError: (:) [], ParseException
    + FullyQualifiedErrorId : UnexpectedToken

PS E:\HamletUnified> Safe-Log "ðŸ§© Frontend environment file generated."
Safe-Log : The term 'Safe-Log' is not recognized as the name of a cmdlet, function, script file, or operable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ Safe-Log "ðŸ§© Frontend environment file generated."
+ ~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (Safe-Log:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS E:\HamletUnified> Safe-Log "ðŸ§© Frontend environment file generated."
Safe-Log : The term 'Safe-Log' is not recognized as the name of a cmdlet, function, script file, or operable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ Safe-Log "ðŸ§© Frontend environment file generated."
+ ~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (Safe-Log:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS E:\HamletUnified> # --- Frontend Env Setup ---
PS E:\HamletUnified> $FrontendEnv = "$FrontendRepo\.env.production"
PS E:\HamletUnified> @"
>> NEXT_PUBLIC_API_BASE_URL=$BackendURL
>> NEXT_PUBLIC_SUPABASE_URL=$($env:SUPABASE_URL)
>> NEXT_PUBLIC_SUPABASE_ANON_KEY=$($env:SUPABASE_SERVICE_KEY)
>> "@ | Out-File -Encoding utf8 $FrontendEnv -Force
PS E:\HamletUnified> Safe-Log "[INFO] Frontend environment file generated."
Safe-Log : The term 'Safe-Log' is not recognized as the name of a cmdlet, function, script file, or operable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ Safe-Log "[INFO] Frontend environment file generated."
+ ~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (Safe-Log:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS E:\HamletUnified>     + FullyQualifiedErrorId : CommandNotFoundException
At line:1 char:6
+     + FullyQualifiedErrorId : CommandNotFoundException
+      ~
Missing expression after unary operator '+'.
At line:1 char:7
+     + FullyQualifiedErrorId : CommandNotFoundException
+       ~~~~~~~~~~~~~~~~~~~~~
Unexpected token 'FullyQualifiedErrorId' in expression or statement.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : MissingExpressionAfterOperator

PS E:\HamletUnified>
PS E:\HamletUnified> PS E:\HamletUnified> Safe-Log "ðŸ§© Frontend environment file generated."
Get-Process : A positional parameter cannot be found that accepts argument 'Safe-Log'.
At line:1 char:1
+ PS E:\HamletUnified> Safe-Log "ðŸ§© Frontend environment file generat ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidArgument: (:) [Get-Process], ParameterBindingException
    + FullyQualifiedErrorId : PositionalParameterNotFound,Microsoft.PowerShell.Commands.GetProcessCommand

PS E:\HamletUnified> Safe-Log : The term 'Safe-Log' is not recognized as the name of a cmdlet, function, script file, or operable program.
Safe-Log : The term 'Safe-Log' is not recognized as the name of a cmdlet, function, script file, or operable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ Safe-Log : The term 'Safe-Log' is not recognized as the name of a cmd ...
+ ~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (Safe-Log:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS E:\HamletUnified> Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
Check : The term 'Check' is not recognized as the name of a cmdlet, function, script file, or operable program. Check
the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ Check the spelling of the name, or if a path was included, verify tha ...
+ ~~~~~
    + CategoryInfo          : ObjectNotFound: (Check:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS E:\HamletUnified> At line:1 char:1
The AT command has been deprecated. Please use schtasks.exe instead.

Invalid command.

The AT command schedules commands and programs to run on a computer at
a specified time and date. The Schedule service must be running to use
the AT command.

AT [\\computername] [ [id] [/DELETE] | /DELETE [/YES]]
AT [\\computername] time [/INTERACTIVE]
    [ /EVERY:date[,...] | /NEXT:date[,...]] "command"

\\computername     Specifies a remote computer. Commands are scheduled on the
                   local computer if this parameter is omitted.
id                 Is an identification number assigned to a scheduled
                   command.
/delete            Cancels a scheduled command. If id is omitted, all the
                   scheduled commands on the computer are canceled.
/yes               Used with cancel all jobs command when no further
                   confirmation is desired.
time               Specifies the time when command is to run.
/interactive       Allows the job to interact with the desktop of the user
                   who is logged on at the time the job runs.
/every:date[,...]  Runs the command on each specified day(s) of the week or
                   month. If date is omitted, the current day of the month
                   is assumed.
/next:date[,...]   Runs the specified command on the next occurrence of the
                   day (for example, next Thursday).  If date is omitted, the
                   current day of the month is assumed.
"command"          Is the Windows NT command, or batch program to be run.

PS E:\HamletUnified> + Safe-Log "ðŸ§© Frontend environment file generated."
At line:1 char:2
+ + Safe-Log "ðŸ§© Frontend environment file generated."
+  ~
Missing expression after unary operator '+'.
At line:1 char:3
+ + Safe-Log "ðŸ§© Frontend environment file generated."
+   ~~~~~~~~
Unexpected token 'Safe-Log' in expression or statement.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : MissingExpressionAfterOperator

PS E:\HamletUnified> + ~~~~~~~~
At line:1 char:2
+ + ~~~~~~~~
+  ~
Missing expression after unary operator '+'.
At line:1 char:3
+ + ~~~~~~~~
+   ~~~~~~~~
Unexpected token '~~~~~~~~' in expression or statement.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : MissingExpressionAfterOperator

PS E:\HamletUnified>     + CategoryInfo          : ObjectNotFound: (Safe-Log:String) [], CommandNotFoundException
At line:1 char:6
+     + CategoryInfo          : ObjectNotFound: (Safe-Log:String) [], C ...
+      ~
Missing expression after unary operator '+'.
At line:1 char:7
+     + CategoryInfo          : ObjectNotFound: (Safe-Log:String) [], C ...
+       ~~~~~~~~~~~~
Unexpected token 'CategoryInfo' in expression or statement.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : MissingExpressionAfterOperator

PS E:\HamletUnified>     + FullyQualifiedErrorId : CommandNotFoundException
At line:1 char:6
+     + FullyQualifiedErrorId : CommandNotFoundException
+      ~
Missing expression after unary operator '+'.
At line:1 char:7
+     + FullyQualifiedErrorId : CommandNotFoundException
+       ~~~~~~~~~~~~~~~~~~~~~
Unexpected token 'FullyQualifiedErrorId' in expression or statement.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : MissingExpressionAfterOperator

PS E:\HamletUnified>
PS E:\HamletUnified> PS E:\HamletUnified> # --- Frontend Env Setup ---
PS : Cannot find a process with the name "E:\HamletUnified>". Verify the process name and call the cmdlet again.
At line:1 char:1
+ PS E:\HamletUnified> # --- Frontend Env Setup ---
+ ~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (E:\HamletUnified>:String) [Get-Process], ProcessCommandException
    + FullyQualifiedErrorId : NoProcessFoundForGivenName,Microsoft.PowerShell.Commands.GetProcessCommand

PS E:\HamletUnified> PS E:\HamletUnified> $FrontendEnv = "$FrontendRepo\.env.production"
Get-Process : A positional parameter cannot be found that accepts argument '\.env.production'.
At line:1 char:1
+ PS E:\HamletUnified> $FrontendEnv = "$FrontendRepo\.env.production"
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidArgument: (:) [Get-Process], ParameterBindingException
    + FullyQualifiedErrorId : PositionalParameterNotFound,Microsoft.PowerShell.Commands.GetProcessCommand

PS E:\HamletUnified> PS E:\HamletUnified> @"
>> >> NEXT_PUBLIC_API_BASE_URL=$BackendURL
>> >> NEXT_PUBLIC_SUPABASE_URL=$($env:SUPABASE_URL)
>> >> NEXT_PUBLIC_SUPABASE_ANON_KEY=$($env:SUPABASE_SERVICE_KEY)
>> >> "@ | Out-File -Encoding utf8 $FrontendEnv -Force
>> PS E:\HamletUnified> Safe-Log "[INFO] Frontend environment file generated."
>> Safe-Log : The term 'Safe-Log' is not recognized as the name of a cmdlet, function, script file, or operable program.
>> Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
>> At line:1 char:1
>> + Safe-Log "[INFO] Frontend environment file generated."
>> + ~~~~~~~~
>>     + CategoryInfo          : ObjectNotFound: (Safe-Log:String) [], CommandNotFoundException
>>     + FullyQualifiedErrorId : CommandNotFoundException
>>
>> PS E:\HamletUnified>function Safe-Log($text) {
>>     try {
>>         $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
>>         Write-Host "[$timestamp] $text" -ForegroundColor Cyan
>>     }
>>     catch {
>>         Write-Host ⚠️ Log write failed: $($_.Exception.Message)" -ForegroundColor Yellow
>>     }
>> }
>> Safe-Log "[INFO] Frontend environment file generated."
>>