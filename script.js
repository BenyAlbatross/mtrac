function generatePDF() {
    const { jsPDF } = window.jspdf;
    const form = document.getElementById('riskForm');
    const formData = new FormData(form);
    const pdf = new jsPDF();

    pdf.setFontSize(12);
    pdf.text('Risk Assessment Checklist', 10, 10);

    let y = 20;
    formData.forEach((value, key) => {
        pdf.text(`${key}: ${value}`, 10, y);
        y += 10;
    });

    // Add the signature to the PDF
    const canvas = document.getElementById('signature-canvas');
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, y, 180, 60);

    pdf.save('risk_assessment_checklist.pdf');
}

function clearSignature() {
    signaturePad.clear();
}

let signaturePad;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('signature-canvas');
    signaturePad = new SignaturePad(canvas);

    function resizeCanvas() {
        const ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});