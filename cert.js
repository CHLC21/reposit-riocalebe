function gerarCertificado() {
    const nome = document.getElementById('nome').value.trim();

    if (nome === "") {
        alert("Por favor, digite seu nome.");
        return;
    }

    document.getElementById('nome-certificado').textContent = nome;

    const data = new Date();
    const dataFormatada = data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    document.getElementById('data-atual').textContent = dataFormatada;

    document.getElementById('certificado').style.display = 'block';
    document.getElementById('btn-download').style.display = 'inline-block';
}

function baixarImagem() {
    const certificado = document.getElementById('certificado');

    html2canvas(certificado).then(canvas => {
        const link = document.createElement('a');
        link.download = 'certificado-programador.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
