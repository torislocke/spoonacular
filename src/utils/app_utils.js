const Filter = require('bad-words');
const customBadWords = require('./custom_bad_words');

// Use the bad-words filter to restrict spoonacular results to eliminate certain dietary restrictions:
const filter = new Filter({ placeHolder: '*', emptyList: true });
filter.addWords(...customBadWords);

const searchPagination = (searchText, pageNumber, resultsPerPage, totalResults) => {
	const maxPage = Math.ceil(totalResults / resultsPerPage);
    const currPage = Math.min(pageNumber, maxPage);

	const pd = 7;  // set number of pages to display on the bar.
	const pdFloor = Math.floor(pd/2);

	let low = 0, high = 0;

	if ( (maxPage <= pd) || (currPage <= pdFloor) ) {
		low = 1;
		high = Math.min(pd, maxPage);
	}
	else if ( maxPage - currPage < pdFloor) {
		low = maxPage - pd + 1;
		high = maxPage;
	}
	else {
		low = currPage - pdFloor;
		high = currPage + pdFloor;
	}

	const previousPage = (currPage === 1) ? 1 : (currPage - 1);
	const nextPage = (currPage === maxPage) ? maxPage : (currPage + 1);

	let pages = [{
		text: '<',
		current: false,
		blocked: (currPage === 1),
		dest: `/search?searchText=${searchText}&pageNumber=${previousPage}`,
		required: 'required'
	}];
	for (let i = low; i <= high; i++) {
		pages.push( {
			text: String(i),
			current: (i === currPage),
			blocked: false,
			dest: `/search?searchText=${searchText}&pageNumber=${i}`,
			required: (Math.abs(currPage - i) <= 1) ? 'page-required' : 'page-not-required'
		});
	}
	pages.push({
		text: '>',
		current: false,
		blocked: (currPage === maxPage),
		dest: `/search?searchText=${searchText}&pageNumber=${nextPage}`,
		required: 'required'
	});

	return pages;
}


/** Just an option to filter out specific diet types based on spoonacular api
 * Returns the text filtered removing undesired words.
 * In case text is not a string, returns an empty string.
 */
const filterBadWords = (text) => {
	if (! (typeof text === 'string'))
		return '';
	return filter.clean(text);
}

module.exports = {
	searchPagination,
	filterBadWords
};
