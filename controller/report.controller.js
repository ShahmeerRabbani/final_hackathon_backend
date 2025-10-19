const path = require('path');
const fs = require('fs');
const Report = require('../model/report.modal');

exports.createReport = async (req, res) => {
  try {
    console.log('Incoming body:', req.body);
    console.log('Uploaded file:', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // ✅ Build file path
    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    // ✅ Optionally read file data if needed
    // const fileData = fs.readFileSync(filePath);

    // ✅ Build accessible URL (for frontend preview)
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    // ✅ Create report record
    const newReport = new Report({
      title: req.body.title,
      reportType: req.body.reportType,
      reportDate: req.body.reportDate,
      fileUrl, // required field
      uploadedAt: new Date(),
    });

    await newReport.save();

    res.status(201).json({
      message: 'Report uploaded successfully!',
      report: newReport,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ uploadedAt: -1 }); // latest first
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
};
