
angular.module('ScoutIOApp') //, ['ngMap'], ['uiGmapgoogle-maps']
  .controller('ResultsController', ResultsController);


function ResultsController($state, $http, NgMap, Search) {

  var results = this;

  results.setting = {};
  results.setting.indoor = true;
  results.setting.outdoor = true;

  results.radius = 5;

  results.name = "Scout IQ";

  results.$http = $http;
  results.$state = $state;


  /*Triggers SearchFactory method sets response to ... redirects to results
  @param {string} query [comma deliniated word string]*/
  results.getByTagOnly = function(query){
    console.log(query);

    results.$state.go('results');
    // Search.getByTagOnly(query)
    //   .then(function(response){
    //      console.log(response);
            // this.photos = response
    //      this.$state.go('results');
      // })
  };


// photo.tag is a space separated string of tags so need to use .split(" ") to get a comma seperated array
// the host url is not on this object but can be created by following this convention https://www.flickr.com/photos/{photo.pathalias}/{photo.id}/
  results.samplePhoto = {
    "id": "10500976616",
    "owner": "35213698@N08",
    "secret": "1a65b05014",
    "server": "7380",
    "farm": 8,
    "title": "The Old Fishing Boats at Little Virginia Lakes",
    "ispublic": 1,
    "isfriend": 0,
    "isfamily": 0,
    "datetaken": "2013-10-13 08:25:30",
    "datetakengranularity": 0,
    "datetakenunknown": 0,
    "tags": "california ca travel autumn usa lake snow color fall nature water northerncalifornia photoshop canon vintage landscape boat photo interestingness google interesting fishing october aluminum day photographer little picture clarity resort explore adobe getty norcal adjust infocus highway395 easternsierra leevining virginialakes monocounty cs6 2013 denoise 60d topazlabs photographersnaturecom davetoussaint",
    "latitude": 38.048217,
    "longitude": -119.258952,
    "accuracy": 16,
    "context": 0,
    "place_id": "NsbUWfBTUb4mbyVu",
    "woeid": "2347563",
    "geo_is_family": 0,
    "geo_is_friend": 0,
    "geo_is_contact": 0,
    "geo_is_public": 1,

    "url_sq": "https:\/\/farm8.staticflickr.com\/7380\/10500976616_1a65b05014_s.jpg",
    "height_sq": 75,
    "width_sq": 75,

    "url_q": "https:\/\/farm8.staticflickr.com\/7380\/10500976616_1a65b05014_q.jpg",
    "height_q": "150",
    "width_q": "150",
    "pathalias": "davetoussaint",

    // generated url for this photo
    "url": "https://www.flickr.com/photos/davetoussaint/10500976616/"
  };


// 10 photo objects to use as dummy data (but they are real flickr photos) //tag search was Eastern Sierra + snow
// updated to retrieve url for small 240 on longest side and medium 500 on longest side
results.photos2 = [
     { "id": "22317291440", "owner": "66558193@N06", "secret": "b51cda1f08", "server": "744", "farm": 1, "title": "Fall Colors Trip - The Splendor Of Fall - 0102", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2015-10-21 12:43:00", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "autumn trees snow mountains fall nature beautiful clouds landscape freshair outdoors fallcolors exploring adventure autumncolors stunning rollinghills naturephotography splendor easternsierra naturescape 2015 snowcappedpeaks grandvista mountainpeaks landscapephotography wideopenspaces horizontalimage fallcolorstrip karltonhuber", "latitude": 38.099847, "longitude": -119.249118, "accuracy": 11, "context": 0, "place_id": "1e.gphhTUbNhexDO", "woeid": "2394399", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm1.staticflickr.com\/744\/22317291440_b51cda1f08.jpg", "height_m": "334", "width_m": "500", "url_s": "https:\/\/farm1.staticflickr.com\/744\/22317291440_b51cda1f08_m.jpg", "height_s": "160", "width_s": "240", "pathalias": "karltonhuber" },
     { "id": "22149875345", "owner": "66926252@N07", "secret": "336a2fae9d", "server": "5808", "farm": 6, "title": "Parker Mountain", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2015-10-06 11:21:03", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "california autumn usa mountain snow plant tree fall pine landscape unitedstates outdoor aspen sagebrush anseladamswilderness easternsierra inyonationalforest parkermountain parkerlaketrail", "latitude": 37.843991, "longitude": -119.145880, "accuracy": 16, "context": 0, "place_id": "KIW949xQUL.Wj4hEhw", "woeid": "12587695", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm6.staticflickr.com\/5808\/22149875345_336a2fae9d.jpg", "height_m": "500", "width_m": "500", "url_s": "https:\/\/farm6.staticflickr.com\/5808\/22149875345_336a2fae9d_m.jpg", "height_s": "240", "width_s": "240", "pathalias": "kirklougheed" },
     { "id": "22030555586", "owner": "96297516@N04", "secret": "cec0bddb0d", "server": "5836", "farm": 6, "title": "Lundy Canyon Trail", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2015-10-05 09:19:54", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "california mountain snow clouds landscape sierranevada lundy easternsierra lundycanyon lundylake", "latitude": 38.023855, "longitude": -119.255776, "accuracy": 14, "context": 0, "place_id": "JQlNJKJTVr6T3uXA", "woeid": "2443104", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm6.staticflickr.com\/5836\/22030555586_cec0bddb0d.jpg", "height_m": "333", "width_m": "500", "url_s": "https:\/\/farm6.staticflickr.com\/5836\/22030555586_cec0bddb0d_m.jpg", "height_s": "160", "width_s": "240", "pathalias": "jonetling" },
     { "id": "15105398564", "owner": "27450922@N07", "secret": "724706f5c3", "server": "5616", "farm": 6, "title": "contrast.", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2013-10-24 02:49:01", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "mountain snow night foliage aspen junelake easternsierra startrail canonef24105mmf4lis flickrexportdemo", "latitude": 37.834395, "longitude": -119.120807, "accuracy": 13, "context": 0, "place_id": "KIW949xQUL.Wj4hEhw", "woeid": "12587695", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm6.staticflickr.com\/5616\/15105398564_724706f5c3.jpg", "height_m": "500", "width_m": "375", "url_s": "https:\/\/farm6.staticflickr.com\/5616\/15105398564_724706f5c3_m.jpg", "height_s": "240", "width_s": "180", "pathalias": "cl191" },
     { "id": "15676649586", "owner": "23183960@N00", "secret": "3a3c735a6f", "server": "7488", "farm": 8, "title": "Early Morning Mist", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2014-11-02 07:31:14", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "california county morning travel trees copyright usa mist lake snow cold fall jeff colors weather canon photography eos photo october nevada sunny sierra clear cottonwood sullivan douglas eastern topaz 2014 easternsierra gardnerville monocounty 70d visitca visitcalifornia visitmonocounty visiteasternsierra", "latitude": 38.680551, "longitude": -119.546442, "accuracy": 13, "context": 0, "place_id": "JARTJWFTV7odq6Sk", "woeid": "2507154", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm8.staticflickr.com\/7488\/15676649586_3a3c735a6f.jpg", "height_m": "333", "width_m": "500", "url_s": "https:\/\/farm8.staticflickr.com\/7488\/15676649586_3a3c735a6f_m.jpg", "height_s": "160", "width_s": "240", "pathalias": "jeffreysullivan" },
     { "id": "15505083839", "owner": "23183960@N00", "secret": "b7958a0855", "server": "3941", "farm": 4, "title": "Last Light on the Three Sisters", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2014-11-01 16:52:51", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "california travel trees sunset copyright usa lake snow mountains fall jeff colors weather canon photography eos golden photo october day nevada sierra hour cottonwood threesisters sullivan eastern sweetwater alpenglow topaz 2014 easternsierra douglascounty gardnerville monocounty 70d visitca visitcalifornia visitmonocounty visiteasternsierra", "latitude": 38.679278, "longitude": -119.546785, "accuracy": 13, "context": 0, "place_id": "JARTJWFTV7odq6Sk", "woeid": "2507154", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm4.staticflickr.com\/3941\/15505083839_b7958a0855.jpg", "height_m": "333", "width_m": "500", "url_s": "https:\/\/farm4.staticflickr.com\/3941\/15505083839_b7958a0855_m.jpg", "height_s": "160", "width_s": "240", "pathalias": "jeffreysullivan" },
     { "id": "14305808501", "owner": "23183960@N00", "secret": "423843c0ea", "server": "3765", "farm": 4, "title": "Milky Way Over Dechambeau Hotel - A shot from our Bodie night photography workshop last Sunday night.", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2014-05-30 18:19:12", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "california park travel copyright usa snow storm canon photo state cloudy may sierra historic bodie bridgeport eastern 2014 easternsierra jeffsullivan visitca visitcalifornia bdsh visitmonocounty visiteasternsierra caliparks", "latitude": 38.211327, "longitude": -119.013572, "accuracy": 16, "context": 0, "place_id": "KIW949xQUL.Wj4hEhw", "woeid": "12587695", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm4.staticflickr.com\/3765\/14305808501_423843c0ea.jpg", "height_m": "333", "width_m": "500", "url_s": "https:\/\/farm4.staticflickr.com\/3765\/14305808501_423843c0ea_m.jpg", "height_s": "160", "width_s": "240", "pathalias": "jeffreysullivan" },
     { "id": "14263770631", "owner": "23183960@N00", "secret": "fdf1c95692", "server": "2902", "farm": 3, "title": "Bodie Dusted with Snow", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2014-05-20 17:23:54", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "park travel wild copyright snow storm west abandoned jeff weather clouds rural buildings photography town state decay ghost may sierra historic american bodie sullivan bridgeport eastern hdr workshops 2014 easternsierra visitca visitcalifornia bdsh visitmonocounty visiteasternsierra caliparks", "latitude": 38.211563, "longitude": -119.010729, "accuracy": 16, "context": 0, "place_id": "KIW949xQUL.Wj4hEhw", "woeid": "12587695", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm3.staticflickr.com\/2902\/14263770631_fdf1c95692.jpg", "height_m": "333", "width_m": "500", "url_s": "https:\/\/farm3.staticflickr.com\/2902\/14263770631_fdf1c95692_m.jpg", "height_s": "160", "width_s": "240", "pathalias": "jeffreysullivan" },
     { "id": "14220022752", "owner": "38414403@N08", "secret": "e09e52dcd0", "server": "5199", "farm": 6, "title": "Winter Morning - Merced River", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2013-12-14 17:58:03", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "california morning trees winter snow reflection ice sunrise landscape nikon yosemitenationalpark yosemitevalley winterscape mercedriver easternsierra pohonobridge", "latitude": 37.716532, "longitude": -119.666787, "accuracy": 16, "context": 0, "place_id": "TFX225VTVroMNJIy", "woeid": "2405399", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm6.staticflickr.com\/5199\/14220022752_e09e52dcd0.jpg", "height_m": "331", "width_m": "500", "url_s": "https:\/\/farm6.staticflickr.com\/5199\/14220022752_e09e52dcd0_m.jpg", "height_s": "159", "width_s": "240", "pathalias": "davidshield" },
     { "id": "13238199924", "owner": "47442337@N08", "secret": "b0fbfab7c7", "server": "7196", "farm": 8, "title": "twin lakes", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2013-10-13 15:01:12", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "california light sky usa cloud snow tree rock canon landscape photography view unitedstates lakes twinlakes mammothlakes easternsierra ericlo eos5dmarkiii 5d3 2470lii ef2470mmf28liiusm", "latitude": 37.611214, "longitude": -119.010064, "accuracy": 16, "context": 0, "place_id": "CLGC0OtTVrmcS32n", "woeid": "2435022", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm8.staticflickr.com\/7196\/13238199924_b0fbfab7c7.jpg", "height_m": "333", "width_m": "500", "url_s": "https:\/\/farm8.staticflickr.com\/7196\/13238199924_b0fbfab7c7_m.jpg", "height_s": "160", "width_s": "240", "pathalias": "eric5dmark2" },
     { "id": "12185853864", "owner": "47442337@N08", "secret": "ecb80d4fd8", "server": "5514", "farm": 6, "title": "lake mary", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2013-10-13 11:18:23", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "california longexposure autumn sky usa cloud mountain lake snow reflection tree fall water 30 canon landscape photography unitedstates wideangle filter nd resin mammothlakes 06 lakemary easternsierra 14l gnd ericlo neutraldensity 10stops 165mm ef14mmf28liiusm eos5dmarkiii 5d3 prostop formatthitech lucroit", "latitude": 37.600210, "longitude": -118.997244, "accuracy": 16, "context": 0, "place_id": "QWhYY7BTVr60xFAC", "woeid": "2444595", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm6.staticflickr.com\/5514\/12185853864_ecb80d4fd8.jpg", "height_m": "333", "width_m": "500", "url_s": "https:\/\/farm6.staticflickr.com\/5514\/12185853864_ecb80d4fd8_m.jpg", "height_s": "160", "width_s": "240", "pathalias": "eric5dmark2" },
     { "id": "12183728585", "owner": "52694009@N00", "secret": "3befced4d8", "server": "7450", "farm": 8, "title": "June Lake Aframe Cabin", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2000-10-01 00:00:00", "datetakengranularity": 4, "datetakenunknown": 0, "tags": "california road ca trip autumn winter vacation fish snow mountains fall cali outside outdoors fishing highway hiking budget lakes rental calif waterfalls trips reverse sierranevada cheap aframe 158 cabins easternsierra rentals junemountain junelakeloop rushcreek carsonpeak casr158", "latitude": 37.763202, "longitude": -119.107697, "accuracy": 16, "context": 0, "place_id": "s1jGoDZTVrlRMSLm", "woeid": "2430295", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm8.staticflickr.com\/7450\/12183728585_3befced4d8.jpg", "height_m": "500", "width_m": "375", "url_s": "https:\/\/farm8.staticflickr.com\/7450\/12183728585_3befced4d8_m.jpg", "height_s": "240", "width_s": "180", "pathalias": "danamite" },
     { "id": "11868274276", "owner": "47442337@N08", "secret": "481941ffa7", "server": "3717", "farm": 4, "title": "convict lake at twilight", "ispublic": 1, "isfriend": 0, "isfamily": 0, "datetaken": "2013-12-24 16:52:21", "datetakengranularity": 0, "datetakenunknown": 0, "tags": "california winter sunset sky usa cloud mountain lake snow reflection water rock canon landscape photography twilight unitedstates sony wideangle mammothlakes easternsierra convictlake tiltshift ericlo a7r 165mm tse17mmf4l tse17l metabones formatthitech lucroit smartadapter eftonex ilce7r", "latitude": 37.594579, "longitude": -118.851728, "accuracy": 16, "context": 0, "place_id": "wUIvQ4JTV7uNmm7Z", "woeid": "2519959", "geo_is_family": 0, "geo_is_friend": 0, "geo_is_contact": 0, "geo_is_public": 1, "url_m": "https:\/\/farm4.staticflickr.com\/3717\/11868274276_481941ffa7.jpg", "height_m": "333", "width_m": "500", "url_s": "https:\/\/farm4.staticflickr.com\/3717\/11868274276_481941ffa7_m.jpg", "height_s": "160", "width_s": "240", "pathalias": "eric5dmark2" }
  ];

// 10 photo objects to use as dummy data (but they are real flickr photos) //tag search was Eastern Sierra + snow
  results.photos = [
    {
      "id": "22374118427",
      "owner": "66558193@N06",
      "secret": "722e53ef30",
      "server": "5711",
      "farm": 6,
      "title": "Fall Colors Trip - Gull Lake - 0266",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0,
      "datetaken": "2015-10-22 06:38:14",
      "datetakengranularity": 0,
      "datetakenunknown": 0,
      "tags": "longexposure autumn sky mountain lake inspiration snow reflection fall nature water beautiful clouds landscape outdoors morninglight still lowlight solitude shadows fallcolors exploring details relaxing earlymorning peaceful calm adventure autumncolors invigorating naturephotography newday gulllake easternsierra 2015 upearly landscapephotography junelakeloop mountainpeak smoothwater verticalimage newbeginings fallcolorstrip karltonhuber nikond750",
      "latitude": 37.778109,
      "longitude": -119.079365,
      "accuracy": 13,
      "context": 0,
      "place_id": "KIW949xQUL.Wj4hEhw",
      "woeid": "12587695",
      "geo_is_family": 0,
      "geo_is_friend": 0,
      "geo_is_contact": 0,
      "geo_is_public": 1,
      "url_sq": "https:\/\/farm6.staticflickr.com\/5711\/22374118427_722e53ef30_s.jpg",
      "height_sq": 75,
      "width_sq": 75,
      "url_q": "https:\/\/farm6.staticflickr.com\/5711\/22374118427_722e53ef30_q.jpg",
      "height_q": "150",
      "width_q": "150",
      "pathalias": "karltonhuber"
    },

    {
      "id": "22398481310",
      "owner": "11420421@N06",
      "secret": "98717d3d71",
      "server": "5658",
      "farm": 6,
      "title": "Convicted",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0,
      "datetaken": "2015-10-18 14:57:08",
      "datetakengranularity": 0,
      "datetakenunknown": 0,
      "tags": "california trees mountain lake snow mountains fall water colors us unitedstates fallcolors sony nevada sierra 1855 mammothlakes sierranevada convict eastern laurel ilc easternsierra convictlake laurelmountain nex7",
      "latitude": 37.594563,
      "longitude": -118.851762,
      "accuracy": 16,
      "context": 0,
      "place_id": "KIW949xQUL.Wj4hEhw",
      "woeid": "12587695",
      "geo_is_family": 0,
      "geo_is_friend": 0,
      "geo_is_contact": 0,
      "geo_is_public": 1,
      "url_sq": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71_s.jpg",
      "height_sq": 75,
      "width_sq": 75,
      "url_q": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71_q.jpg",
      "height_q": "150",
      "width_q": "150",
      "pathalias": "process21_calvin"
    },

    {
      "id": "22317291440",
      "owner": "66558193@N06",
      "secret": "b51cda1f08",
      "server": "744",
      "farm": 1,
      "title": "Fall Colors Trip - The Splendor Of Fall - 0102",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0,
      "datetaken": "2015-10-21 12:43:00",
      "datetakengranularity": 0,
      "datetakenunknown": 0,
      "tags": "autumn trees snow mountains fall nature beautiful clouds landscape freshair outdoors fallcolors exploring adventure autumncolors stunning rollinghills naturephotography splendor easternsierra naturescape 2015 snowcappedpeaks grandvista mountainpeaks landscapephotography wideopenspaces horizontalimage fallcolorstrip karltonhuber",
      "latitude": 38.099847,
      "longitude": -119.249118,
      "accuracy": 11,
      "context": 0,
      "place_id": "1e.gphhTUbNhexDO",
      "woeid": "2394399",
      "geo_is_family": 0,
      "geo_is_friend": 0,
      "geo_is_contact": 0,
      "geo_is_public": 1,
      "url_sq": "https:\/\/farm1.staticflickr.com\/744\/22317291440_b51cda1f08_s.jpg",
      "height_sq": 75,
      "width_sq": 75,
      "url_q": "https:\/\/farm1.staticflickr.com\/744\/22317291440_b51cda1f08_q.jpg",
      "height_q": "150",
      "width_q": "150",
      "pathalias": "karltonhuber"
    },

    {
      "id": "22463355692",
      "owner": "66558193@N06",
      "secret": "0db0bf4a63",
      "server": "5722",
      "farm": 6,
      "title": "Fall Colors Trip - Rock Creek Lake - 9242",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0,
      "datetaken": "2015-10-19 07:29:18",
      "datetakengranularity": 0,
      "datetakenunknown": 0,
      "tags": "longexposure light mountain lake snow cold landscape morninglight solitude kayak quiet wind peaceful bluesky ripples wilderness breeze deserted boatdock rockcreeklake mtmorgan easternsierra 2015 mountainpeaks landscapephotography wideopenspaces wildplaces horizontalimage fallcolorstrip karltonhuber",
      "latitude": 37.461642,
      "longitude": -118.727202,
      "accuracy": 13,
      "context": 0,
      "place_id": "VeX8U_hQUL.qOD5IhQ",
      "woeid": "12587679",
      "geo_is_family": 0,
      "geo_is_friend": 0,
      "geo_is_contact": 0,
      "geo_is_public": 1,
      "url_sq": "https:\/\/farm6.staticflickr.com\/5722\/22463355692_0db0bf4a63_s.jpg",
      "height_sq": 75,
      "width_sq": 75,
      "url_q": "https:\/\/farm6.staticflickr.com\/5722\/22463355692_0db0bf4a63_q.jpg",
      "height_q": "150",
      "width_q": "150",
      "pathalias": "karltonhuber"
    },

    {
      "id": "21825327794",
      "owner": "66558193@N06",
      "secret": "79ed533b28",
      "server": "678",
      "farm": 1,
      "title": "Fall Colors Trip - Just A Pinch Of Snow - 9045",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0,
      "datetaken": "2015-10-18 11:23:26",
      "datetakengranularity": 0,
      "datetakenunknown": 0,
      "tags": "trees light sky mountain snow nature beautiful weather rock clouds landscape colorful details wilderness drama invigorating naturalworld rugged steep naturephotography easternsierra 2015 landscapephotography mountainpeak bishopcreekcanyon wildplaces horizontalimage fallcolorstrip nikkor28300mm karltonhuber nikond750",
      "latitude": 37.213685,
      "longitude": -118.612967,
      "accuracy": 13,
      "context": 0,
      "place_id": "96l.IVBQUL_PkuGXzw",
      "woeid": "12587683",
      "geo_is_family": 0,
      "geo_is_friend": 0,
      "geo_is_contact": 0,
      "geo_is_public": 1,
      "url_sq": "https:\/\/farm1.staticflickr.com\/678\/21825327794_79ed533b28_s.jpg",
      "height_sq": 75,
      "width_sq": 75,
      "url_q": "https:\/\/farm1.staticflickr.com\/678\/21825327794_79ed533b28_q.jpg",
      "height_q": "150",
      "width_q": "150",
      "pathalias": "karltonhuber"
    },

    {
      "id": "22261203429",
      "owner": "66558193@N06",
      "secret": "12c3b660ae",
      "server": "5835",
      "farm": 6,
      "title": "Fall Colors Trip - High Country Drama - 9048",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0,
      "datetaken": "2015-10-18 11:39:34",
      "datetakengranularity": 0,
      "datetakenunknown": 0,
      "tags": "trees light sky mountain snow nature beautiful weather rock clouds landscape colorful details wilderness drama invigorating naturalworld rugged steep highcountry naturephotography easternsierra 2015 landscapephotography mountainpeak bishopcreekcanyon wildplaces horizontalimage fallcolorstrip nikkor28300mm karltonhuber nikond750",
      "latitude": 37.194749,
      "longitude": -118.563014,
      "accuracy": 13,
      "context": 0,
      "place_id": "96l.IVBQUL_PkuGXzw",
      "woeid": "12587683",
      "geo_is_family": 0,
      "geo_is_friend": 0,
      "geo_is_contact": 0,
      "geo_is_public": 1,
      "url_sq": "https:\/\/farm6.staticflickr.com\/5835\/22261203429_12c3b660ae_s.jpg",
      "height_sq": 75,
      "width_sq": 75,
      "url_q": "https:\/\/farm6.staticflickr.com\/5835\/22261203429_12c3b660ae_q.jpg",
      "height_q": "150",
      "width_q": "150",
      "pathalias": "karltonhuber"
    },

    {
      "id": "22434678402",
      "owner": "66558193@N06",
      "secret": "94e460bf07",
      "server": "5810",
      "farm": 6,
      "title": "Fall Colors Trip - An Autumn Morning In McGee Canyon_HDR_9247_48_49_50",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0,
      "datetaken": "2015-10-19 08:24:23",
      "datetakengranularity": 0,
      "datetakenunknown": 0,
      "tags": "ranch autumn light snow fall nature beautiful landscape freshair outdoors freedom morninglight colorful solitude quiet shadows fallcolors gorgeous exploring details peaceful canyon brush adventure autumncolors aspens wilderness barbwire invigorating hdr stables fencepost fenceline naturephotography trailhead easternsierra 2015 mountainpeaks landscapephotography mcgeecreek packstation mcgeecanyon ruggedcountry wildplaces peakcolor horizontalimage fallcolorstrip naturestreasure karltonhuber nikond750",
      "latitude": 37.560159,
      "longitude": -118.795680,
      "accuracy": 13,
      "context": 0,
      "place_id": "KIW949xQUL.Wj4hEhw",
      "woeid": "12587695",
      "geo_is_family": 0,
      "geo_is_friend": 0,
      "geo_is_contact": 0,
      "geo_is_public": 1,
      "url_sq": "https:\/\/farm6.staticflickr.com\/5810\/22434678402_94e460bf07_s.jpg",
      "height_sq": 75,
      "width_sq": 75,
      "url_q": "https:\/\/farm6.staticflickr.com\/5810\/22434678402_94e460bf07_q.jpg",
      "height_q": "150",
      "width_q": "150",
      "pathalias": "karltonhuber"
    },

    {
      "id": "22149875345",
      "owner": "66926252@N07",
      "secret": "336a2fae9d",
      "server": "5808",
      "farm": 6,
      "title": "Parker Mountain",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0,
      "datetaken": "2015-10-06 11:21:03",
      "datetakengranularity": 0,
      "datetakenunknown": 0,
      "tags": "california autumn usa mountain snow plant tree fall pine landscape unitedstates outdoor aspen sagebrush anseladamswilderness easternsierra inyonationalforest parkermountain parkerlaketrail",
      "latitude": 37.843991,
      "longitude": -119.145880,
      "accuracy": 16,
      "context": 0,
      "place_id": "KIW949xQUL.Wj4hEhw",
      "woeid": "12587695",
      "geo_is_family": 0,
      "geo_is_friend": 0,
      "geo_is_contact": 0,
      "geo_is_public": 1,
      "url_sq": "https:\/\/farm6.staticflickr.com\/5808\/22149875345_336a2fae9d_s.jpg",
      "height_sq": 75,
      "width_sq": 75,
      "url_q": "https:\/\/farm6.staticflickr.com\/5808\/22149875345_336a2fae9d_q.jpg",
      "height_q": "150",
      "width_q": "150",
      "pathalias": "kirklougheed"
    },

    {
      "id": "22030555586",
      "owner": "96297516@N04",
      "secret": "cec0bddb0d",
      "server": "5836",
      "farm": 6,
      "title": "Lundy Canyon Trail",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0,
      "datetaken": "2015-10-05 09:19:54",
      "datetakengranularity": 0,
      "datetakenunknown": 0,
      "tags": "california mountain snow clouds landscape sierranevada lundy easternsierra lundycanyon lundylake",
      "latitude": 38.023855,
      "longitude": -119.255776,
      "accuracy": 14,
      "context": 0,
      "place_id": "JQlNJKJTVr6T3uXA",
      "woeid": "2443104",
      "geo_is_family": 0,
      "geo_is_friend": 0,
      "geo_is_contact": 0,
      "geo_is_public": 1,
      "url_sq": "https:\/\/farm6.staticflickr.com\/5836\/22030555586_cec0bddb0d_s.jpg",
      "height_sq": 75,
      "width_sq": 75,
      "url_q": "https:\/\/farm6.staticflickr.com\/5836\/22030555586_cec0bddb0d_q.jpg",
      "height_q": "150",
      "width_q": "150",
      "pathalias": "jonetling"
    },

    {
      "id": "21666565912",
      "owner": "14832049@N00",
      "secret": "e4872488b2",
      "server": "5643",
      "farm": 6,
      "title": "Black Horse in Coral and the High Sierra",
      "ispublic": 1,
      "isfriend": 0,
      "isfamily": 0,
      "datetaken": "2015-03-31 00:00:00",
      "datetakengranularity": 0,
      "datetakenunknown": 0,
      "tags": "sky blackandwhite horse snow mountains blackwhite fuji sierra linhof bigsky provia fujinon owensvalley wideaspect bishopca easternsierra sierramountains wideformat padock 6x12 linhoftechnika wideaspectratio opticfilm120 125mmfujinonw",
      "latitude": 37.331436,
      "longitude": -118.394722,
      "accuracy": 15,
      "context": 0,
      "place_id": "96l.IVBQUL_PkuGXzw",
      "woeid": "12587683",
      "geo_is_family": 0,
      "geo_is_friend": 0,
      "geo_is_contact": 0,
      "geo_is_public": 1,
      "url_sq": "https:\/\/farm6.staticflickr.com\/5643\/21666565912_e4872488b2_s.jpg",
      "height_sq": 75,
      "width_sq": 75,
      "url_q": "https:\/\/farm6.staticflickr.com\/5643\/21666565912_e4872488b2_q.jpg",
      "height_q": "150",
      "width_q": "150",
      "pathalias": "fotographis"
    }
  ];

  NgMap.getMap().then(function(map) {
    results.map = map;
  });

  results.positions = [];
  for (var i = 0; i < results.photos.length; i++) {
    //console.log(results.photos[i]);
    results.positions.push({
      pos: [results.photos[i].latitude, results.photos[i].longitude],
      src: results.photos[i].url_sq
    })
  }
  console.log(results.positions);

  results.showPhotoPin = function(evt, photoId) {
    results.photo = results.photos[id];
    results.map.showInfoWindow('photoInfo', this);
  };

  //https://snazzymaps.com/
  results.mapStyle = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];

  results.placeChanged = function() {
    results.place = this.getPlace();
    console.log('location', results.place.geometry.location);
    results.map.setCenter(results.place.geometry.location);
  };

// generated by this flickr api call (api_key is flickr default not ours)
  var apiDEMO = {
    URL: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a8faad8e29a6cfb369a1133d2020ffaf&tags=%27eastern+sierra%27%2C+snow&tag_mode=all&has_geo=1&extras=geo%2Ctags%2C+date_taken%2Cpath_alias%2C+url_sq%2C+url_q&per_page=&format=json&nojsoncallback=1&api_sig=55a4f7f41a3b405d30120bec519036e6"
  }

}
