const countries = {
    greece: "Greece",
    italy: "Italy",
    spain: "Spain",
    uk: 'UK',
    benelux: "Benelux",
    sweeden: 'Sweeden',
    rfn: 'RFN',
    austria: 'Austria',
}
const notCountryTypes = {
    railways: 'Railways',
    plant: 'Plant',
}

const isACountry = (country) => Object.values(countries).find(val => val === country);

export {countries, notCountryTypes, isACountry};