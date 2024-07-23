const db = require('./models'); // Ensure this path is correct

async function createCertificates() {
  try {
    // Fetch institutions and courses
    const institutions = await db.institution.find({}).exec();
    const courses = await db.course.find({}).exec();

    const institutionsMap = institutions.reduce((map, inst) => {
      map[inst.name] = inst._id;
      return map;
    }, {});

    const coursesMap = courses.reduce((map, course) => {
      map[course.code] = course._id;
      return map;
    }, {});

    // Define certificates to be created
    const certificates = [
      {
        certificateCode: 'CERT101',
        name: 'Certificate in Data Science',
        description: 'A certificate focusing on data science skills and knowledge.',
        requirements: ['Completion of introductory statistics', 'Completion of a programming course'],
        institution: institutionsMap['Brigham Young University-Idaho'], 
        coursesRequired: [coursesMap['CS1010']], 
      },
      // Add more certificates as needed
    ];

    // Fetch existing certificates to prevent duplicates
    const existingCertificates = await db.certificate.find({}).exec();

    // Create certificates
    for (const certificate of certificates) {
      const certExists = existingCertificates.some(
        c => c.certificateCode === certificate.certificateCode && c.institution.equals(certificate.institution)
      );

      if (certExists) {
        console.log(`Certificate with code ${certificate.certificateCode} already exists.`);
        continue;
      }

      await db.certificate.create(certificate);
    }

    console.log('Certificates created!');
  } catch (error) {
    console.error('Error creating certificates:', error);
  }
}

module.exports = createCertificates;
