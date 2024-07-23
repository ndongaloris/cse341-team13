const db = require('./models'); // Ensure this path is correct

async function createInstitutions() {
  try {
    const existingInstitutions = await db.institution.find({});
    
    if (existingInstitutions.length === 0) {
      // Create institutions if none exist
      const institutions = await Promise.all([
        db.institution.create({
          institutionCode: 'BYU-I',
          name: 'Brigham Young University-Idaho',
          address: '525 S Center St, Rexburg, ID 83460',
          description: 'A private university offering various undergraduate programs.',
          contactInfo: {
            email: 'info@byui.edu',
            phoneNumber: '208-496-1411'
          },
          website: 'https://www.byui.edu',
          accreditation: 'Regional',
        }),
        db.institution.create({
          institutionCode: 'EN',
          name: 'Ensign College',
          address: '95 N 300 W, Salt Lake City, UT 84101',
          description: 'An institution offering a variety of certificate and degree programs.',
          contactInfo: {
            email: 'info@ensign.edu',
            phoneNumber: '801-524-8125'
          },
          website: 'https://www.ensign.edu',
          accreditation: 'National',
        })
      ]);

      console.log('Institutions created:', institutions);
    } else {
      console.log('Institutions already exist.');
    }
  } catch (error) {
    console.error('Error creating institutions:', error);
  }
}

module.exports = createInstitutions;
