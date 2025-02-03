function generateCompositeCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let compositeCode = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    compositeCode += characters[randomIndex];
  }

  return compositeCode;
}

module.exports = {
  generateCompositeCode,
};
