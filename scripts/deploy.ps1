Param(
    [Parameter()]
    [ValidateScript({ Test-Path $_ })]
    [string] $ProjectRoot = (Split-Path -Parent $PSScriptRoot),
    # --------------------------------------------
    [Parameter()][string] $BuildDirName = 'public',
    # --------------------------------------------
    [Parameter()] [switch] $NoBuild
)

Set-StrictMode -Version 3
Import-Module (Join-Path -Resolve $ProjectRoot 'scripts/GithubUtil.psm1') -Force

Write-Host '1️⃣ PRE-DEPLOY'
# necessary for gh-pages cmd to work
Clear-GithubPagesCache -ProjectRoot $ProjectRoot

$BuildPath = Join-Path $ProjectRoot $BuildDirName
$BuildExists = Test-Path $BuildPath
if (-not $NoBuild -or -not $BuildExists) {
    Write-Host '2️⃣ BUILD'
    Write-Host '🏗️ Building the project...'
    Remove-Item -Recurse -Force $BuildPath -Verbose -ErrorAction SilentlyContinue
    yarn run build
}


Write-Host '3️⃣ DEPLOY'

Invoke-InPath -Path $ProjectRoot -ScriptBlock {
    Write-Host '🚢️ Deploying to gh-pages...'
    # deployment is done from the root (unfortunately theres no option to change that)
    yarn run gh-pages --dist $BuildDirName `
                      --dest '.' `
                      --branch 'gh-pages' `
                      --no-history
}