const pdfService = require('../services/pdfService');

exports.generate = async (req, res) => {
  try {
    const data = req.body;
    console.log('[BACKEND] Received generation request for:', data.personal?.fullName);

    // Server-side validation
    if (!data.personal?.fullName || !data.personal?.email || !data.objective || !data.skills?.length) {
      console.warn('[BACKEND] Validation failed. Missing fields:', {
        fullName: !!data.personal?.fullName,
        email: !!data.personal?.email,
        objective: !!data.objective,
        skills: !!data.skills?.length
      });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const pdfBuffer = await pdfService.createPDF(data);

    const sanitizedName = data.personal.fullName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-'); // Sanitize

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="resume_${sanitizedName}.pdf"`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ error: 'Error generating PDF' });
  }
};
