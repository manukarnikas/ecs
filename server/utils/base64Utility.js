function decodeBase64Image(base64String) {
    const base64Image = base64String.replace(/^data:image\/(png|jpeg);base64,/, '');
    return Buffer.from(base64Image, 'base64');
}

module.exports = {
    decodeBase64Image
}