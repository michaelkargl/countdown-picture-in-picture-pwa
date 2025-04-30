BeforeAll {
    $GithubUtil = "GithubUtil"
    $MdoulePath = Join-Path -Resolve $PSScriptRoot "../$GithubUtil.psm1"
    Import-Module -Name $MdoulePath -Force
}

Context 'Invoke-InPath' {
    BeforeEach {
        $TestPath = Join-Path 'TestDrive:' ([guid]::NewGuid())
        New-Item -ItemType Directory -Path $TestPath -Force | Out-Null
    }

    AfterEach {
        Remove-Item -Recurse -Force $TestPath -ErrorAction SilentlyContinue | Out-Null
    }

    It 'Should execute scriptblock in the specified path' {
        Get-Location | Should -Not -Be "$TestPath"
        
        Invoke-InPath -Path $TestPath -ScriptBlock {
            Get-Location
        } | Should -Be "$TestPath"
    }

    It 'Moves back to original location afterwards' {
        $CurrentLocation = Get-Location

        Get-Location | Should -Not -Be $TestPath
        Invoke-InPath -Path $TestPath -ScriptBlock {}
        Get-Location | Should -Not -Be $CurrentLocation
    }

    It 'Does not swallow exceptions' {
        $ExpectedMessage = "Test exception"
        {
            Invoke-InPath -Path $TestPath -ScriptBlock { 
                throw $ExpectedMessage
            } 
        } | Should -Throw -ExpectedMessage $ExpectedMessage
    }

    It 'Moves back to previous path after exception' {
        $ExpectedPath = Get-Location
        Get-Location | Should -Not -Be "$TestPath"
        
        try {
            Invoke-InPath -Path $TestPath -ScriptBlock { throw 'Test exception' }
        } catch {
        }
        
        Get-Location | Should -Be "$ExpectedPath"
    }
}