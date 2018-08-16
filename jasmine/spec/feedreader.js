/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
     
    describe('RSS Feeds', function() {
         
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         
        it('URL Validation', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).not.toBe('');  
            });
        });

         
        it('Name validation', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toEqual('string');
                expect(feed.name.length).toBeGreaterThan(0);
                expect(feed.name).not.toBe('');  
            });
        });
    });


    // Menu test suite.
    describe('The menu', function() {

        it('body has a class menu-hidden initially', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('body toggles the class menu-hidden by clicking menu icon', function() {
            var menu = $('.menu-icon-link');
            menu.click();             
            expect($('body').hasClass('menu-hidden')).toBe(false);


            menu.click();              
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

         
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('has at least one entry', function(done) {
            //document.querySelectorAll('.feed .entry');
            var entryLen = ($('.feed .entry').length);  //$('.entry').length;
            expect(entryLen).toBeGreaterThan(0);
            done();
        });
    });
        /* New Feed Selection valiation (This is the seventh test) -> a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
    describe('New Feed Selection', function() {

        var feedFirst;
        var feedSecond;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedFirst = $('.feed').html();
                done();
            });
        });

        it('feed section has been loaded and different', function(done) {
            loadFeed(1, function() {
                feedSecond = $('.feed').html();
                expect(feedSecond).not.toEqual(feedFirst);
                done();
            });
        });
    });
}());