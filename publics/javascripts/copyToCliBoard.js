function copyToCliBoard () {
  const copyText = document.getElementById('copyUrlInput').innerText
  navigator.clipboard.writeText(copyText)
    .then(() => alert('已成功複製'))
    .catch(err => console.log(err))
}
module.exports = copyToCliBoard
