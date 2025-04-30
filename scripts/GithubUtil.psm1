
Function Invoke-InPath {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory)][string] $Path,
        [Parameter(Mandatory)][scriptblock]$ScriptBlock
    )

    Push-Location $Path
    try {
        & $ScriptBlock
    } finally {
        Pop-Location
    }
}

Function Clear-GithubPagesCache {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory)]
        [ValidateScript({ Test-Path $_ })]
        [string] $ProjectRoot
    )

    Write-Host "🚮 Deleting gh-pages cache..."
    $CacheDir = Join-Path -Path $ProjectRoot -ChildPath 'node_modules/.cache/gh-pages'
    Remove-Item -Recurse -Force $CacheDir -Verbose -ErrorAction SilentlyContinue
}


Export-ModuleMember -Function (
    'Clear-GithubPagesCache',
    'Invoke-InPath'
)