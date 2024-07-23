const db = require('./models'); // Ensure this path is correct

async function createCourses() {
  try {
    // Fetch degrees
    const degrees = await db.degree.find({}).exec();
    const degreesMap = degrees.reduce((map, degree) => {
      map[degree.degreeCode] = degree._id;
      return map;
    }, {});

    // Define courses to be created
    const courses = [
      {
        name: 'Intro to Computer Science',
        code: 'CS1010', // Ensure this is at least 6 characters long
        description: 'An introductory course on computer science.',
        credit: 3,
        courseType: 'Core',
        degree: degreesMap['BYUI-BS-CSE'], // Replace with actual degree code
      },
      // Add more courses as needed
    ];

    // Fetch existing courses to prevent duplicates
    const existingCourses = await db.course.find({}).exec();

    // Create courses
    for (const course of courses) {
      const courseExists = existingCourses.some(
        c => c.code === course.code && c.degree.equals(course.degree)
      );

      if (courseExists) {
        console.log(`Course with code ${course.code} already exists.`);
        continue;
      }

      await db.course.create(course);
    }

    console.log('Courses created!');
  } catch (error) {
    console.error('Error creating courses:', error);
  }
}

module.exports = createCourses;
