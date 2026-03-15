module.exports = async function createApiKey({ container }) {
  const apiKeyService = container.resolve("apiKeyModuleService")
  
  console.log("Creating API key...")
  
  const apiKey = await apiKeyService.createApiKeys({
    title: "Payload CMS Sync",
    type: "secret",
    created_by: "system"
  })
  
  console.log("API Key created successfully:")
  console.log(JSON.stringify(apiKey, null, 2))
}
