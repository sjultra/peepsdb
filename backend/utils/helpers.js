const azureVault = require('./azure-vault');

const replaceDashWithLowDash = (string) => {
  return string.replace('-', '_');
};

const getEnvVariable = async (variableName, vaultName) => {
  if (process.env.ENVIRONMENT && process.env.ENVIRONMENT === 'DEV')
    return process.env[replaceDashWithLowDash(variableName)];
  return azureVault.getSecret(variableName, vaultName);
};
module.exports = {
  getEnvVariable,
};
