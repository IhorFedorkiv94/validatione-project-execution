import React from 'react';
import  {faker} from '@faker-js/faker';
import Papa from 'papaparse';

const SyntheticDataGenerator = () => {
  const generateData = () => {
    // Generating titles dataset
    const titles = [];
    const ageCertifications = ["G", "PG", "PG-13",];
    const roles = ["Director", "Producer",];

    for (let i = 0; i < 100; i++) {
      titles.push({
        id: i + 1,
        title: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        release_year: faker.date.past(50).getFullYear(),
        age_certification: faker.arrayElement(ageCertifications),
        runtime: faker.number({ min: 30, max: 180 }),
        genres: [faker.database.arrayElement(['Action', 'Drama', 'Comedy']), faker.arrayElement(['Sci-Fi', 'Romance', 'Horror'])].join(', '),
        production_country: faker.address.countryCode(),
        seasons: faker.arrayElement([faker.number({ min: 1, max: 5 }), ''])
      });
    }

    // Generating credits dataset
    const credits = [];

    for (let i = 0; i < 100; i++) {
      credits.push({
        id: i + 1,
        title_id: faker.random.number({ min: 1, max: 100 }),
        real_name: faker.name.findName(),
        character_name: faker.name.firstName(),
        role: faker.random.arrayElement(roles)
      });
    }

    // Convert to CSV
    const titlesCSV = Papa.unparse(titles);
    const creditsCSV = Papa.unparse(credits);

    // Download CSV
    downloadCSV(titlesCSV, "titles.csv");
    downloadCSV(creditsCSV, "credits.csv");

    alert('Data generated and files are being downloaded!');
  };

  const downloadCSV = (csvContent, fileName) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <button onClick={generateData}>
      Generate Synthetic Data
    </button>
  );
};

export default SyntheticDataGenerator;
