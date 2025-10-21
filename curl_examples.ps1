# PowerShell curl examples for the API (adjust the port or host if needed)
$base = 'http://localhost:5000/api'

Write-Host "GET items"
curl "$base/items" -Method GET | ConvertFrom-Json | ConvertTo-Json -Depth 5

Write-Host "Create item"
$body = @{ title = 'CLI Item'; price = 19.99 } | ConvertTo-Json
curl "$base/items" -Method POST -Body $body -ContentType 'application/json' | ConvertFrom-Json | ConvertTo-Json -Depth 5

Write-Host "Replace :id in the following commands with the actual id returned from creation"
