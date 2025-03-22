const specialCharactersRegex = (keyword) =>
	keyword
		.replace(/[çÇcC]/g, "[çÇcC]")
		.replace(/[ğĞgG]/g, "[ğĞgG]")
		.replace(/[ıİiI]/g, "[ıİiI]")
		.replace(/[öÖoO]/g, "[öÖoO]")
		.replace(/[şŞsS]/g, "[şŞsS]")
		.replace(/[üÜuU]/g, "[üÜuU]");

const customSelectFilter = (option, searchText) =>
	specialCharactersRegex(option.data.label)
		.toLowerCase()
		.includes(specialCharactersRegex(searchText).toLowerCase());

export default customSelectFilter;
