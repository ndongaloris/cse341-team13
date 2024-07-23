const db = require('./models'); // Ensure this path is correct

async function createDegrees() {
  try {
    // Fetch institutions
    const institutions = await db.institution.find({}).exec();
    const byui = institutions.find(inst => inst.name === 'Brigham Young University-Idaho');
    const ensign = institutions.find(inst => inst.name === 'Ensign College');

    if (!byui || !ensign) {
      throw new Error('One or more institutions not found.');
    }

    // Define degrees to be created
    const degrees = [
      {
        degreeCode: 'BYUI-BS-CSE',
        name: 'Bachelor of Science in Computer Science',
        institutions: byui._id,
        certificatesRequired: [], // Add certificate ObjectIds if applicable
        type: 'Bachelor',
        description: 'A comprehensive computer science degree program.',
        potentialEmployment: ['Software Engineer', 'Data Scientist'],
        duration: '4 years',
        creditsRequired: 120,
        level: 'Undergraduate'
      },
      {
        degreeCode: 'BYUI-BS-IT',
        name: 'Bachelor of Science in Information Technology',
        institutions: byui._id,
        certificatesRequired: [], // Add certificate ObjectIds if applicable
        type: 'Bachelor',
        description: 'An information technology degree focusing on IT systems and management.',
        potentialEmployment: ['IT Specialist', 'Network Administrator'],
        duration: '4 years',
        creditsRequired: 120,
        level: 'Undergraduate'
      },
      {
        degreeCode: 'EN-BS-BM',
        name: 'Bachelor of Science in Business Management',
        institutions: ensign._id,
        certificatesRequired: [], // Add certificate ObjectIds if applicable
        type: 'Bachelor',
        description: 'A degree focusing on business management and leadership.',
        potentialEmployment: ['Business Manager', 'Entrepreneur'],
        duration: '4 years',
        creditsRequired: 120,
        level: 'Undergraduate'
      },
      {
        degreeCode: 'EN-BS-ACC',
        name: 'Bachelor of Science in Accounting',
        institutions: ensign._id,
        certificatesRequired: [], // Add certificate ObjectIds if applicable
        type: 'Bachelor',
        description: 'An accounting degree preparing students for financial analysis and management.',
        potentialEmployment: ['Accountant', 'Financial Analyst'],
        duration: '4 years',
        creditsRequired: 120,
        level: 'Undergraduate'
      }
    ];

    // Fetch existing degrees to prevent duplicates
    const existingDegrees = await db.degree.find({}).exec();

    // Create degrees
    for (const degree of degrees) {
      const degreeExists = existingDegrees.some(
        d => d.degreeCode === degree.degreeCode && d.institutions.equals(degree.institutions)
      );

      if (degreeExists) {
        console.log(`Degree with code ${degree.degreeCode} already exists.`);
        continue;
      }

      await db.degree.create(degree);
    }

    console.log('Degrees created!');
  } catch (error) {
    console.error('Error creating degrees:', error);
  }
}

module.exports = createDegrees;
