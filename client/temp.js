angular.module('bbException', []).factory('$exceptionHandler', ['$log', function($log) {
  return function(exception, cause) {
    if (typeof NREUM !== "undefined") {
      NREUM.noticeError(exception)
    }
    $log.error.apply($log, arguments)
  }
}]);
angular.module('bbLodash', []).factory("_", function($window) {
  var _ = $window._
  delete($window._)
  _.naturalList = function(collection) {
    if (collection.length > 2) {
      var head = collection.slice(0, -1)
      var tail = collection[collection.length - 1]
      return (head.join(", ") + ", and " + tail)
    }
    if (collection.length === 2) {
      return (collection.join(" and "))
    }
    if (collection.length) {
      return (collection[0])
    }
    return ("")
  }
  return (_)
})
angular.module('bbLogging', []).factory('LoggingService', ['$http', function($http) {
  function LoggingService() {
    var self = this
    self.serverSideLog = function(data, type) {
      type = type || "debug"
    }
  }
  return new LoggingService();
}])
angular.module('bbPopups', []).factory('PopupsService', ['$http', '$log', function($http, $log) {
  function PopupsService() {
    var self = this
    self.createPopup = function(data) {
      return $http({
        method: "post",
        url: "/api/rest/popups/create",
        data: data
      })
    }
    self.updatePopup = function(data) {
      return $http({
        method: "put",
        url: "/api/rest/popups/update/",
        data: data
      })
    }
    self.getPopups = function() {
      return $http({
        method: "get",
        url: "/api/rest/popups/all"
      })
    }
    self.getPopupForUrl = function(url) {
      return $http({
        method: "get",
        url: "/api/rest/popups/get?url=" + encodeURIComponent(url)
      })
    }
  }
  return new PopupsService()
}]);
angular.module("bbThinkTank", []).factory('ThinkTankService', ['$http', '$q', function($http, $q) {
  function ThinkTankService() {
    var self = this
    self.getConfig = function() {
      var deferred = $q.defer()
      $http.get('/js/json/thinktank.json').success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.getCustomerSubmissions = function(customerId) {
      return $http({
        method: "get",
        url: '/api/rest/thinktank/submissions/' + customerId,
      })
    }
    self.getDesign = function(designId) {
      return $http({
        method: "get",
        url: '/api/rest/thinktank/design/' + designId
      })
    }
    self.saveDesign = function(data) {
      return $http({
        method: "post",
        data: data,
        url: "/api/rest/thinktank/submit/"
      })
    }
  }
  return new ThinkTankService()
}]);
'use strict'
var BetabrandApp = angular.module('BetabrandApp', ['templates', 'error', 'forceRefresh', 'varnish', 'ngRoute', 'ngTouch', 'facebook', 'ngSanitize', 'ngAnimate', 'ngCookies', 'ngKookies', 'ngScrollDepth', 'ngMessages', 'angularUtils.directives.dirPagination', 'angularModalService', 'sticky', 'duParallax', 'duScroll', 'ngTagsInput', 'dynform', 'ngClipboard', 'angularFileUpload', 'vcRecaptcha', 'djds4rce.angular-socialshare', 'cfp.hotkeys', 'ng.shims.placeholder', 'RecursionHelper', 'angular-inview', 'bbPopups', 'bbLodash', 'bbLogging', 'bbException', 'afkl.lazyImage', 'ngPinchZoom', 'bbThinkTank', 'angularTrix']).config(function($routeProvider, $locationProvider, paginationTemplateProvider, $facebookProvider, $logProvider, ngClipProvider, $scrollDepthProvider, $sceDelegateProvider) {
  var cookies = " " + document.cookie
  var parts = cookies.split(" " + "DEBUG" + "=")
  var debug = (parts.length == 2) && ((parts.pop().split("").shift()) == 1) ? true : false
  $logProvider.debugEnabled(debug)
  ngClipProvider.setPath("/angular/bower_components/zeroclipboard/dist/ZeroClipboard.swf")
  $routeProvider.when('/', {
    controller: 'HomepageController',
    templateUrl: '/angular/app/homepage/homepage.html',
    title: 'Betabrand - Pants, Jackets, Hoodies, Breakthroughs',
    categoryId: 36,
    reloadOnSearch: false
  }).when('/category/favorites.html', {
    controller: 'HomepageController',
    templateUrl: '/angular/app/homepage/homepage.html',
    title: 'Betabrand - Pants, Jackets, Hoodies, Breakthroughs',
    categoryId: 36,
    reloadOnSearch: false
  }).when('/holiday.html', {
    controller: 'HomepageController',
    templateUrl: '/angular/app/homepage/homepage.html',
    title: 'Betabrand - Pants, Jackets, Hoodies, Breakthroughs',
    categoryId: 160,
    reloadOnSearch: false
  }).when('/returns', {
    controller: 'ReturnsController',
    templateUrl: '/angular/app/returns/returns.html',
    title: 'Betabrand - Returns',
    reloadOnSearch: false
  }).when('/returns/order/:incrementId/email/:customerEmail', {
    controller: 'ReturnsController',
    templateUrl: '/angular/app/returns/returns.html',
    title: 'Betabrand - Returns',
    reloadOnSearch: false
  }).when('/returns/token/:returnToken', {
    controller: 'ReturnsController',
    templateUrl: '/angular/app/returns/returns.html',
    title: 'Betabrand - Returns',
    reloadOnSearch: false
  }).when('/search', {
    controller: 'SearchController',
    templateUrl: '/angular/app/search/search.html',
    title: 'Betabrand - Pants, Jackets, Hoodies, Breakthroughs',
    reloadOnSearch: false
  }).when('/cart/checkout', {
    controller: 'CheckoutController',
    templateUrl: '/angular/app/checkout/checkout.html',
    title: 'Betabrand - Checkout'
  }).when('/cart/checkout/paypal/', {
    controller: 'CheckoutController',
    templateUrl: '/angular/app/checkout/checkout-paypal.html',
    title: 'Betabrand - Checkout With Paypal'
  }).when('/cart/checkout/success/:orders/:hashes', {
    controller: 'CheckoutSuccessController',
    templateUrl: '/angular/app/checkout/checkout-success.html',
    title: 'Betabrand - Order Confirmation'
  }).when('/modelcitizen', {
    controller: 'ModelCitizenController',
    templateUrl: '/angular/app/modelcitizen/modelcitizen.html',
    title: 'Betabrand - Model Citizen Program - Upload a photo, get a discount!'
  }).when('/referrals/landing/friend', {
    controller: 'ReferralsLandingController',
    templateUrl: '/angular/app/referrals/landing-return.html',
    title: 'Betabrand - Pants, Jackets, Hoodies, Breakthroughs'
  }).when('/think-tank.html', {
    controller: 'CategoryController',
    templateUrl: '/angular/app/thinktank/thinktank.html',
    title: 'Betabrand - Think Tank',
    categoryId: 67,
    reloadOnSearch: false
  }).when('/think-tank/vote.html', {
    redirectTo: "/think-tank.html"
  }).when('/how-it-works', {
    controller: 'HowItWorksController',
    templateUrl: '/angular/app/thinktank/how-it-works.html',
    title: 'Betabrand - Think Tank - How It Works'
  }).when('/submission/', {
    controller: 'SubmissionLandingController',
    controllerAs: 'submission',
    templateUrl: '/angular/app/thinktank/submission/submission-landing.html',
    title: 'Betabrand - Think Tank - Submit Your Idea'
  }).when('/submission/edit/:id', {
    controller: 'SubmissionLandingController',
    controllerAs: 'submission',
    templateUrl: '/angular/app/thinktank/submission/submission-landing.html',
    title: 'Betabrand - Think Tank - Submit Your Idea'
  }).when('/referrals/landing/about/', {
    controller: 'ReferralsController',
    templateUrl: '/angular/app/referrals/landing.html',
    title: 'Betabrand - Referral Program - Refer Friends and Earn'
  }).when('/referrals/landing/about/email/:email/product/:productId/method/:method/source/:source', {
    controller: 'ReferralsController',
    templateUrl: '/angular/app/referrals/landing.html',
    title: 'Betabrand - Referral Program - Refer Friends and Earn'
  }).when('/referrals/landing/advocate/', {
    controller: 'ReferralsLandingController',
    templateUrl: '/angular/app/referrals/advocate.html',
    reloadOnSearch: false
  }).when('/account/dashboard/', {
    controller: 'AccountController',
    templateUrl: '/angular/app/account/dashboard.html',
    title: 'Betabrand - Account Dashboard'
  }).when('/account/user/', {
    redirectTo: "/account/profile/"
  }).when('/account/profile/', {
    controller: 'EditAccountController',
    templateUrl: '/angular/app/account/edit-account.html',
    title: 'Betabrand - Edit Profile'
  }).when('/account/submissions/', {
    controller: 'SubmissionsController',
    templateUrl: '/angular/app/account/submissions.html',
    title: 'Betabrand - Account Dashboard'
  }).when('/account/addresses/', {
    controller: 'AddressesController',
    templateUrl: '/angular/app/account/address.html',
    title: 'Betabrand - Saved Addresses'
  }).when('/account/payments/', {
    controller: 'PaymentsController',
    templateUrl: '/angular/app/account/cards.html',
    title: 'Betabrand - Saved Cards'
  }).when('/account/orders/', {
    controller: 'OrdersController',
    templateUrl: '/angular/app/account/orders.html',
    title: 'Betabrand - Order History'
  }).when('/account/order/:orderId', {
    controller: 'OrdersController',
    templateUrl: '/angular/app/account/order.html',
    title: 'Betabrand - Order Status'
  }).when('/404', {
    controller: 'NotFoundController',
    templateUrl: '/angular/app/pages/404.html',
    title: 'Betabrand - This Is Not The Page You Are Looking For'
  }).when('/account/referrals/', {
    controller: 'AccountController',
    templateUrl: '/angular/app/account/referrals.html',
    title: 'Betabrand - Referrals'
  }).when('/shop', {
    controller: 'ReferralsLandingController',
    templateUrl: '/angular/app/referrals/landing-return.html',
    title: 'Betabrand',
    reloadOnSearch: false
  }).when('/account/forgotpassword', {
    controller: 'ForgotPasswordController',
    templateUrl: '/angular/app/account/forgot-password.html'
  }).when('/account/resetpassword', {
    controller: 'ForgotPasswordController',
    templateUrl: '/angular/app/account/reset-password.html'
  }).when('/collections/dress-pant-yoga-pants-collection.html', {
    controller: 'CategoryController',
    templateUrl: '/angular/app/category/special/category-dpyp.html',
    categoryId: 88,
    reloadOnSearch: false
  }).otherwise({
    controller: function($scope, $routeParams, $controller, LookupService) {
      if (typeof LookupService.controller == "undefined")
        return
      $controller(LookupService.controller, {
        $scope: $scope
      })
      delete LookupService.controller
    },
    template: '<div ng-include="templateUrl"></div>',
    reloadOnSearch: false
  })
  $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**', '*://www.whiplashmerch.com/**']);
  $locationProvider.html5Mode(true)
  paginationTemplateProvider.setPath('/angular/bower_components/angular-utils-pagination/dirPagination.tpl.html')
  $facebookProvider.init({
    appId: '186514391432562',
    version: 'v2.3',
    status: true,
    cookie: true,
    xfbml: true
  }, false)
  window.betabrand.timing.flag('appInitialized')
  window.performance.mark("appInitialized")
}).controller('AppController', ['$scope', '$timeout', '$interval', '$window', '$rootScope', '$location', '$route', '$kookies', '$http', '$log', 'LookupService', 'ModalService', 'PageService', 'ReferralsService', 'BannerService', 'CustomerService', 'CartService', 'HeaderService', 'CheckoutService', 'SearchService', 'ProductService', 'OptimizelyService', '$cacheFactory', 'TrackingService', '_', 'AssetService', function($scope, $timeout, $interval, $window, $rootScope, $location, $route, $kookies, $http, $log, LookupService, ModalService, PageService, ReferralsService, BannerService, CustomerService, CartService, HeaderService, CheckoutService, SearchService, ProductService, OptimizelyService, $cacheFactory, TrackingService, _, AssetService) {
  var self = this
  this.nonEssentialScriptsLoaded = false
  $http.post('/varnish/cache/gifCookie').success(function() {
    $log.debug('frontend cookie acquired')
  })
  AssetService.loadOptimizedFont({
    "ttf": "/angular/css/ttf.css",
    "woff": "/angular/css/woff.css",
    "woff2": "/angular/css/woff2.css"
  })
  $scope.$on('viewLoaded', function() {
    if (!self.nonEssentialScriptsLoaded) {
      AssetService.loadJs("//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js")
      AssetService.loadJs("//connect.facebook.net/en_US/all.js")
      AssetService.loadJs("//platform.twitter.com/widgets.js")
      self.nonEssentialScriptsLoaded = true
    }
  })
  $scope.page = PageService
  $scope.messages = BannerService
  $scope.referrals = ReferralsService
  $scope.cart = CartService
  $scope.header = HeaderService
  $scope.checkout = CheckoutService
  $scope.search = SearchService
  $scope.product = ProductService
  $scope.toggleCart = false
  $scope.toggleSearch = false
  $scope.isMobile = true
  $rootScope.mobileBuybar = false
  $rootScope.isPOS = $location.host().match(/^pos\./) ? true : false
  $scope.loadingJokes = ["", ]
  $scope.loadingDelay = 500
  $scope.showLoadingContent = false
  $scope.loadingTimer = $timeout(function() {})
  $scope.staticHeader = function() {
    $scope.isZoomed = (document.documentElement.clientWidth / window.innerWidth) > 1
  }
  $scope.calcDevice = function() {
    var windowWidth = $window.innerWidth
    $scope.isMobile = (windowWidth < 1024) ? true : false
    $rootScope.isDesktop = (windowWidth >= 1024) ? true : false
    $rootScope.isTablet = ((windowWidth >= 768) && (windowWidth < 1024)) ? true : false
    $rootScope.isPhone = (windowWidth < 768) ? true : false
    $rootScope.isMobile = $scope.isMobile
    if (windowWidth < 1024)
      HeaderService.mobileMenuOpen = false
  }
  $scope.calcWindowHeight = function() {
    $rootScope.windowHeight = $window.innerHeight
  }
  $scope.calcDevice()
  $scope.calcWindowHeight()
  $scope.isSafari = navigator.vendor != undefined && navigator.vendor.indexOf("Apple") == 0 && /\sSafari\//.test(navigator.userAgent)
  $interval(function() {
    $scope.calcDevice()
    $scope.calcWindowHeight()
  }, 3000)
  angular.element($window).bind('resize', function() {
    $scope.calcDevice()
    $scope.calcWindowHeight()
    $scope.$apply()
  })
  var params = $location.search()
  var campaignData = params.utm_campaign + "," + params.utm_source + "," + params.utm_medium + "," + params.utm_term + ',' + params.nan_pid + ',' + Date()
  $kookies.set('betabrand-campaign-last', campaignData, {
    expires: 365,
    path: '/'
  })
  if (params.utm_campaign !== undefined) {
    $kookies.set('betabrand-campaign-session', campaignData, {
      path: '/'
    })
  }
  if ($kookies.get('betabrand-campaign-first') === undefined && params.utm_campaign !== undefined) {
    $kookies.set('betabrand-campaign-first', campaignData, {
      expires: 365,
      path: '/'
    })
  }
  var showNewsletterModal = $kookies.get('betabrand-introduction') === undefined
  if (params.r || params.no_popup || params.utm_source == "The%20Betabrand%20Newsletter" || params.utm_source == "The Betabrand Newsletter") {
    showNewsletterModal = false
  }
  if (params.utm_source == "Pinterest") {
    showNewsletterModal = false
  }
  if (showNewsletterModal) {
    $kookies.set('betabrand-introduction', 'true', {
      expires: 365,
      path: '/'
    })
    var mobileTemplate = $rootScope.isMobile ? "-mobile" : ""
    ModalService.showModal({
      templateUrl: "/angular/app/modal/newsletter/newsletter-modal" + mobileTemplate + ".html",
      controller: "NewsletterModalController"
    }).then(function(modal) {
      modal.close.then(function(result) {
        $scope.newUser = false
      })
    })
  }
  $scope.$on('viewLoaded', function() {
    $timeout(function() {
      $scope.isLoaded = true
      $scope.loadingMessage = ""
      $scope.showLoadingContent = false
    });
    $timeout.cancel($scope.loadingTimer)
    _clearHttpCache()
    window.performance.mark("viewLoaded")
    if (!$kookies.get('betabrand-timing')) {
      $kookies.set('betabrand-timing', '1', {
        expires: 14,
        path: '/'
      })
      window.betabrand.timing.flag('viewLoaded')
      TrackingService.track("timing")
    }
  })
  _clearHttpCache = _.debounce(function() {
    $log.debug("[Cache] Flushing $http cache")
    $cacheFactory.get('$http').removeAll()
  }, 180000)
  $scope.$on('viewLoading', function(event, message) {
    $scope.showLoadingOverlay(message)
  })
  $scope.showLoadingOverlay = function(message) {
    $scope.isLoaded = false
    $scope.loadingTimer = $timeout(function() {
      $scope.loadingMessage = message || $scope.loadingJokes[Math.floor(Math.random() * $scope.loadingJokes.length)]
      $scope.showLoadingContent = true;
    }, $scope.loadingDelay)
  }
  $rootScope.$on('$locationChangeStart', handleUniqueIdentifiers)
  angular.optimizely = {}
  $scope.$on('$routeChangeSuccess', function() {
    OptimizelyService.activate()
  });

  function handleUniqueIdentifiers(event, currentUrl, previousUrl) {
    if ($route.current && currentUrl && previousUrl && currentUrl.split('?')[0] == previousUrl.split('?')[0] && $route.current.reloadOnSearch === false) {
      return false
    }
    SearchService.showSearch = false
    HeaderService.showMobileMenu = false
    HeaderService.showDropdowns = false
    ProductService.showSidebar = false
    CartService.showCart = false
    $rootScope.mobileBuybar = false
    $rootScope.$broadcast('closeModals')
    angular.element(document.body).removeClass('enlarge')
    $scope.showLoadingOverlay()
    var path = $location.path()
    var isDefined = (path == "/") ? true : false
    angular.forEach($route.routes, function(route, index) {
      if (!route.regexp)
        return
      if (route.regexp.test(path)) {
        isDefined = true
        return false
      }
    })
    if (isDefined) return false
    LookupService.query($location.path()).then(function(lookupDefinition) {
      $route.reload()
    }, function() {
      $location.url("/404")
    })
  }
}]).filter('socialCurrencyUrl', function() {
  return function(url) {
    url = url || ""
    return url.replace("https://", "http://")
  }
}).filter('bbTimestampToJSDate', function() {
  return function(input) {
    if (input instanceof Date) {
      return input
    } else {
      return new Date(input * 1000)
    }
  }
}).run(['$rootScope', '$route', 'HeaderService', '_', 'PageService', function($rootScope, $route, _, HeaderService, PageService) {
  $rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {
    if (oldVal !== newVal) {
      window.scrollTo(0, 0)
      if ($route.current.title) {
        document.title = $route.current.title
        PageService.setTitle($route.current.title)
      }
    }
  })
}]);
(function() {
  var myApplication = angular.module("BetabrandApp")
  fetchData().then(bootstrapApplication)

  function fetchData() {
    var initInjector = angular.injector(["ng"])
    var $http = initInjector.get("$http")
    var request = $http({
      method: "GET",
      url: "/api/rest/appconfig/"
    }).then(function(response) {
      myApplication.constant("APP_CONFIG", response.data)
    }, function(errorResponse) {
      myApplication.constant("APP_CONFIG", false)
    })
    return request
  }

  function bootstrapApplication() {
    window.betabrand.timing.flag('bootstrap')
    window.performance.mark("bootstrap")
    angular.element(document).ready(function() {
      angular.bootstrap(document, ["BetabrandApp"])
    })
  }
}());
BetabrandApp.controller('AccountController', ['$scope', '$location', '$compile', 'CustomerService', 'OrderService', '$routeParams', 'ReferralsService', 'ModalService', 'PageService', 'CheckoutService', '$log', function AccountController($scope, $location, $compile, CustomerService, OrderService, $routeParams, ReferralsService, ModalService, PageService, CheckoutService, $log) {
  $scope.orderService = OrderService
  $scope.shippingFormMode = "preview"
  $scope.parseInt = parseInt;
  $scope.mode = "preview"
  $scope.newAddressMode = "edit"
  $scope.addingNewAddress = false
  $scope.updatingCards = false
  $scope.ordersLoaded = false
  $scope.defaultImage = 'angular/images/user/user.png'
  CustomerService.getData().then(function(response) {
    $scope.customer = CustomerService.data
    $scope.firstname = CustomerService.data.firstname
    $scope.lastname = CustomerService.data.lastname
    $scope.email = CustomerService.data.email
    $scope.gender = CustomerService.data.gender
    if (response.loggedIn == false)
      $location.path("/")
    if (typeof $routeParams.orderId !== "undefined") {
      OrderService.getOrder($routeParams.orderId).then(function(response) {
        $scope.order = response
      })
    }
    return CustomerService.getAddresses($scope.customer.id)
  }).then(function(response) {
    $scope.addresses = response
    return OrderService.getAllOrders();
  }).then(function(response) {
    $scope.ordersLoaded = true
    $scope.orders = response.data
    return CustomerService.getReferrals();
  }).then(function(data) {
    $scope.referrals = data
    return CustomerService.getReferralsCf()
  }).then(function(data) {
    $scope.referralsCf = data
    return ReferralsService.getStats()
  }).then(function(response) {
    $scope.shares = response.shares
    $scope.products = response.products
    $scope.totals = response.totals
    return CheckoutService.getSavedCards()
  }).then(function(data) {
    $scope.cards = data.cards
  });
  $scope.$emit('viewLoaded')
  PageService.setBodyClass('account__page')
  PageService.setMicrodataItemType('ProfilePage')
  $scope.showReferralModal = function(productId) {
    ModalService.showModal({
      templateUrl: "/angular/app/modal/referrals/referral-modal.html",
      controller: "ReferralModalController",
      inputs: {
        productId: productId
      }
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
}]);
BetabrandApp.directive('accountSidebar', [function() {
  return {
    scope: {
      tab: "=",
      customer: "=",
      isPhone: "="
    },
    templateUrl: '/angular/app/account/sidebar.html',
    replace: true,
    link: function($scope) {
      $scope.defaultImage = '/angular/images/user/user.png'
    }
  }
}])
BetabrandApp.controller('AddressesController', ['$scope', '$location', '$compile', 'CustomerService', 'OrderService', '$routeParams', 'ReferralsService', 'ModalService', 'PageService', 'CheckoutService', function AddressesController($scope, $location, $compile, CustomerService, OrderService, $routeParams, ReferralsService, ModalService, PageService, CheckoutService) {
  $scope.shippingFormMode = "preview"
  $scope.parseInt = parseInt;
  $scope.mode = "preview"
  $scope.newAddressMode = "edit"
  $scope.addingNewAddress = false
  CustomerService.getData().then(function(response) {
    $scope.customer = CustomerService.data
    $scope.firstname = CustomerService.data.firstname
    $scope.lastname = CustomerService.data.lastname
    $scope.email = CustomerService.data.email
    if (response.loggedIn == false)
      $location.path("/")
    return CustomerService.getAddresses($scope.customer.id)
  }).then(function(response) {
    $scope.addresses = response
    PageService.setBodyClass('account__page')
    $scope.$emit('viewLoaded')
  });
  $scope.updateAddress = function() {
    $scope.messages.hideBanner()
    var nameParts = this.address.name.split(" ")
    var firstname = nameParts.shift()
    var lastname = nameParts.join(" ") || "NA"
    var data = {
      "firstname": firstname,
      "lastname": lastname,
      "street-address": (typeof this.address['street-address2'] != "undefined") ? this.address['street-address'] + "\n" + this.address['street-address2'] : this.address['street-address'],
      "city": this.address.locality,
      "region": this.address.region,
      "region_id": this.address.region_id,
      "country": this.address.country,
      "postcode": this.address['postal-code'],
      "telephone": this.address.tel,
      "company": this.address.company,
      "email": this.address.email,
      "isDefaultBilling": this.address.isDefaultBilling,
      "isDefaultShipping": this.address.isDefaultShipping
    }
    if (this.address.id) {
      CustomerService.updateAddress(this.address.id, data).then(function() {
        CustomerService.getAddresses($scope.customer.id).then(function(response) {
          $scope.addresses = response
        }, function(response) {
          $scope.messages.showError(error)
        })
      })
    } else {
      CustomerService.addAddress(CustomerService.data.id, data).then(function(response) {
        $scope.addresses = response
        $scope.cleanUpNewAddressForm()
      }, function(error) {
        $scope.newAddressMode = "edit"
        $scope.messages.showError(error)
      })
    }
  }
  $scope.addAddress = function(element) {
    $scope.addingNewAddress = true
    $scope.newAddressMode = "edit"
    var el = $compile('<address-form class="address__block" account-address="true" id="newAddressForm" model-name="address" form-name="address" submit-method="updateAddress()" cancel-method="cancelAddAddress()" mode="newAddressMode"></address-form>')($scope)
    angular.element(document.getElementById('js-account-addresses')).append(el);
  }
  $scope.cleanUpNewAddressForm = function() {
    $scope.newAddressMode = "edit"
    $scope.addingNewAddress = false
    angular.element(document.getElementById('newAddressForm')).remove();
  }
  $scope.cancelAddAddress = function() {
    $scope.cleanUpNewAddressForm()
  }
  $scope.deleteAddress = function() {
    CustomerService.deleteAddress(this.address.id)
  }
}]);
BetabrandApp.controller('ForgotPasswordController', ['$scope', '$location', 'CustomerService', function ForgotPasswordController($scope, $location, CustomerService) {
  $scope.showForm = true
  $scope.data = {
    email: "",
    password: "",
    confirmation: "",
    id: $location.search().id,
    token: $location.search().token
  }
  $scope.$emit('viewLoaded')
  $scope.advocateId = ($location.search().a) ? true : false
  $scope.forgot = function() {
    CustomerService.resetPassword($scope.data.email).then(function(response) {
      $scope.messages.showSuccess("Your password has been successfully reset. Check your email to complete the process.", {
        timeout: 10000
      })
    }, function(response) {
      $scope.messages.showError(response.messages.error[0].message, {
        timeout: 5000
      })
    })
  }
  $scope.reset = function() {
    CustomerService.updatePassword($scope.password, $scope.confirmation, $scope.data.email, $scope.data.id, $scope.data.token).then(function() {
      $scope.messages.showSuccess("Your password has been successfully updated. You can now login.", {
        timeout: 10000
      })
      $location.path("/")
    }, function(response) {
      $scope.messages.showError(response.messages.error[0].message, {
        timeout: 5000
      })
    })
  }
}])
BetabrandApp.controller('OrdersController', ['$scope', '$location', '$compile', 'CustomerService', 'OrderService', '$routeParams', 'PageService', function OrdersController($scope, $location, $compile, CustomerService, OrderService, $routeParams, PageService) {
  $scope.orderService = OrderService
  $scope.parseInt = parseInt;
  $scope.ordersLoaded = false
  CustomerService.getData().then(function(response) {
    $scope.customer = CustomerService.data
    $scope.firstname = CustomerService.data.firstname
    $scope.lastname = CustomerService.data.lastname
    $scope.email = CustomerService.data.email
    if (response.loggedIn == false)
      $location.path("/")
    if (typeof $routeParams.orderId !== "undefined") {
      OrderService.getOrder($routeParams.orderId).then(function(response) {
        $scope.order = response
        $scope.$emit('viewLoaded')
      })
    } else {
      OrderService.getAllOrders().then(function(response) {
        $scope.orders = response.data
        $scope.ordersLoaded = true
        $scope.$emit('viewLoaded')
      })
    }
  })
  PageService.setBodyClass('account__page')
  $scope.startRMA = function(orderId, email) {
    OrderService.getRMA(orderId, email).then(function(response) {
      $location.url("/returns/token/" + response.data.rma_token)
    }, function(error) {
      alert(error.data.messages.error[0].message)
    })
  }
}]);
BetabrandApp.directive('ordersTable', ['$location', function($location) {
  return {
    restrict: 'E',
    templateUrl: '/angular/app/account/orders-table.html',
    replace: true,
    link: function(scope, elm, attrs) {
      scope.limit = attrs.limit
    }
  };
}]);
BetabrandApp.controller('PaymentsController', ['$scope', '$location', '$compile', 'CustomerService', '$routeParams', 'CheckoutService', 'PageService', function PaymentsController($scope, $location, $compile, CustomerService, $routeParams, CheckoutService, PageService) {
  $scope.updatingCards = false
  CustomerService.getData().then(function(response) {
    if (response.loggedIn == false)
      $location.path("/")
    $scope.customer = CustomerService.data
    $scope.firstname = CustomerService.data.firstname
    $scope.lastname = CustomerService.data.lastname
    $scope.email = CustomerService.data.email
    return CheckoutService.getSavedCards()
  }).then(function(data) {
    $scope.cards = data.cards
    PageService.setBodyClass('account__page')
    $scope.$emit('viewLoaded')
  });
  $scope.deleteSavedCard = function(cardId) {
    $scope.updatingCards = true
    CheckoutService.deleteSavedCard(cardId).then(function(data) {
      $scope.updatingCards = false
      $scope.cards = data.cards
      $log.debug("deleted saved credit card", data)
      if ((!data.profile.savedCards || data.profile.savedCards.length == 0) && CheckoutService.data.payment.selected) {
        delete CheckoutService.data.payment.selected.auth_pp_id
      }
    })
  }
}]);
BetabrandApp.controller('ReferralsController', ['$scope', '$location', '$compile', 'CustomerService', 'OrderService', '$routeParams', 'ReferralsService', 'ModalService', 'PageService', 'CheckoutService', function ReferralsController($scope, $location, $compile, CustomerService, OrderService, $routeParams, ReferralsService, ModalService, PageService, CheckoutService) {
  $scope.orderService = OrderService
  $scope.shippingFormMode = "preview"
  $scope.parseInt = parseInt;
  $scope.mode = "preview"
  $scope.newAddressMode = "edit"
  $scope.addingNewAddress = false
  $scope.updatingCards = false
  CustomerService.getData().then(function(response) {
    $scope.customer = CustomerService.data
    $scope.firstname = CustomerService.data.firstname
    $scope.lastname = CustomerService.data.lastname
    $scope.email = CustomerService.data.email
    if (response.loggedIn == false)
      $location.path("/")
    if (typeof $routeParams.orderId !== "undefined") {
      OrderService.getOrder($routeParams.orderId).then(function(response) {
        $scope.order = response
      })
    }
    return CustomerService.getAddresses($scope.customer.id)
  }).then(function(response) {
    $scope.addresses = response
    return CustomerService.getReferrals();
  }).then(function(data) {
    $scope.referrals = data
    return CustomerService.getReferralsCf()
  }).then(function(data) {
    $scope.referralsCf = data
    return ReferralsService.getStats()
  }).then(function(response) {
    $scope.shares = response.shares
    $scope.products = response.products
    $scope.totals = response.totals
    PageService.setBodyClass('account__page')
    PageService.setMicrodataItemType('ProfilePage')
    return CheckoutService.getSavedCards()
  }).then(function(data) {
    $scope.cards = data.cards
    $scope.$emit('viewLoaded')
  });
  $scope.showReferralModal = function(productId) {
    ModalService.showModal({
      templateUrl: "/angular/app/modal/referrals/referral-modal.html",
      controller: "ReferralModalController",
      inputs: {
        productId: productId
      }
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
}]);
BetabrandApp.controller('SubmissionsController', ['$scope', '$location', 'ThinkTankService', 'CustomerService', 'PageService', '_', function SubmissionsController($scope, $location, ThinkTankService, CustomerService, PageService, _) {
  CustomerService.getData().then(function(response) {
    $scope.customer = CustomerService.data
    if (response.loggedIn == false)
      $location.path("/")
    return ThinkTankService.getCustomerSubmissions($scope.customer.id)
  }).then(function(response) {
    $scope.submissions = response.data
    $scope.$emit('viewLoaded')
    PageService.setBodyClass('account__page')
  })
}])
BetabrandApp.controller('EditAccountController', ['$scope', '$location', '$compile', 'CustomerService', '$routeParams', '$upload', '$q', '$log', 'PageService', function EditAccountController($scope, $location, $compile, CustomerService, $routeParams, $upload, $q, $log, PageService) {
  $scope.isSaving = false
  CustomerService.getData().then(function(response) {
    $scope.customer = CustomerService.data
    $scope.firstname = CustomerService.data.firstname
    $scope.lastname = CustomerService.data.lastname
    $scope.email = CustomerService.data.email
    $scope.designerBio = CustomerService.data.designerBio
    $scope.image = CustomerService.data.image
    $scope.dob = new Date(CustomerService.data.dob)
    $scope.gender = CustomerService.data.gender
    if (response.loggedIn == false)
      $location.path("/")
    $scope.$emit('viewLoaded')
    PageService.setBodyClass('account__page')
  });

  function _uploadImage() {
    var deferred = $q.defer()
    if (!$scope.image[0])
      return deferred.resolve({})
    $upload.upload({
      url: "/all/index/upload/",
      fields: {
        'title': $scope.firstname + " " + $scope.lastname,
      },
      file: $scope.image[0]
    }).progress(function(evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name)
    }).success(function(data, status, headers, config) {
      $log.debug('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data))
      deferred.resolve(data)
    }).error(function(data) {
      deferred.resolve(data)
    })
    return deferred.promise
  }
  $scope.updateAccount = function() {
    $scope.isSaving = true
    _uploadImage().then(function(result) {
      var data = {
        "firstname": $scope.firstname,
        "lastname": $scope.lastname,
        "email": $scope.email,
        "dob": $scope.dob,
        "gender": $scope.gender,
        "designerBio": $scope.designerBio
      }
      if (result.image)
        data.designerImageUrl = result.image
      if ($scope.changePassword) {
        data["current_password"] = $scope.currentPassword
        data["password"] = $scope.newPassword
        data["confirmation"] = $scope.confirmPassword
      }
      CustomerService.updateAccount($scope.customer.id, data).then(function() {
        $scope.messages.showSuccess("Account updated!", {
          timeout: 5000
        })
        $scope.isSaving = false
        CustomerService.getData(true).then(function(data) {
          $scope.customer = data
        })
      }, function(response) {
        $scope.isSaving = false
        $scope.messages.showError(response.messages.error[0].message, {
          timeout: 5000
        })
      })
    })
  }
  $scope.$watch(function() {
    return $scope.profileImage
  }, function() {
    $log.debug($scope.profileImage)
    if (typeof $scope.profileImage == "undefined")
      return
    CustomerService.uploadImage($scope.profileImage).then(function(result) {
      $scope.isSaving = true
      var data = {
        designerImageUrl: result.image
      }
      CustomerService.updateAccount($scope.customer.id, data).then(function() {
        CustomerService.getData(true).then(function(data) {
          $scope.isSaving = false
          if ($scope.customer.designerBio !== data.designerBio) {
            $scope.customer.image = data.image
          }
          $scope.customer.image = data.image
        })
      })
    })
  })
}]);
BetabrandApp.controller('BannerController', ['$scope', 'BannerService', 'MarketingModalsService', '$sce', '$rootScope', 'OptimizelyService', 'CustomerService', function($scope, BannerService, MarketingModalsService, $sce, $rootScope, OptimizelyService, CustomerService) {
  var self = this
  self.initialized = false
  $scope.bannerService = BannerService
  $rootScope.$on('viewLoaded', function(event, current) {
    if (!self.initialized) {
      MarketingModalsService.getPromoMessage().then(function(data) {
        if (data.content == "null")
          return;
        BannerService.showMarketing(data.content, {
          identifier: data.identifier
        })
      }, function() {
        CustomerService.getData().then(function(data) {
          var credit = parseFloat(data.betabrandStoreCredit).toFixed(2)
          if (credit > 4.99) {
            if (data.firstname)
              var message = "Hello, " + data.firstname + ". "
            else
              var message = ""
            BannerService.showSuccess(message + "Don't forget you have $" + credit + " store credit. Happy shopping!")
          }
        })
      })
      self.initialized = true;
    }
  })
  $scope.bannerClose = function() {
    BannerService.hideBanner()
    $scope.hideBanner = BannerService.isHidden()
  }
}])
BetabrandApp.factory('BannerService', ['$timeout', '$log', '$location', '$q', function BannerService($timeout, $log, $location, $q) {
  return {
    isVisible: false,
    message: "",
    type: "",
    identifier: "",
    showSuccess: function(msg, options) {
      options = options || {}
      this.type = "success"
      this.identifier = options.identifier
      this._updateMessage(msg, options)
    },
    showMarketing: function(msg, options) {
      options = options || {}
      this.type = "marketing"
      this.identifier = options.identifier
      this._updateMessage(msg, options)
    },
    showAlert: function(msg, options) {
      options = options || {}
      this.type = "alert"
      this.identifier = options.identifier
      this._updateMessage(msg, options)
    },
    showError: function(msg, options) {
      options = options || {}
      this.type = "error"
      this.identifier = options.identifier
      if (typeof msg == "object") {
        msg = this._decodeMessage(msg)
      }
      this._updateMessage(msg, options)
    },
    hideBanner: function() {
      this.isVisible = false
    },
    hideError: function() {
      if (this.type == "error") {
        this.isVisible = false
      }
    },
    _decodeMessage: function(msg) {
      if (msg && msg.messages && msg.messages.error && msg.messages.error[0]) {
        return msg.messages.error[0].message
      }
      return ""
    },
    _updateMessage: function(msg, options) {
      var self = this
      this.message = msg
      self.isVisible = true
      if (options.timeout > 0) {
        $timeout(function() {
          self.isVisible = false
        }, options.timeout)
      }
    }
  }
}])
BetabrandApp.directive('buybar', ['$log', '$document', '$rootScope', '$timeout', 'CartService', 'ProductService', 'ModalService', '_', 'BannerService', 'CustomerService', 'TrackingService', 'PageService', 'OptimizelyService', function($log, $document, $rootScope, $timeout, CartService, ProductService, ModalService, _, BannerService, CustomerService, TrackingService, PageService, OptimizelyService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/angular/app/buybar/buybar.html',
    scope: {
      product: "=product",
      quicklook: "&"
    },
    link: function(scope, element, attrs, controller) {
      scope._ = _
      scope.selectedAttributes = {}
      scope.attributesList = []
      scope.selectedLabel = (scope.product.id == 4407) ? "Choose amount" : "Choose size"
      scope.options = {
        isOpen: false
      }
      scope.question = {
        email: ""
      }
      var addToCartDefault = "Add to Cart"
      scope.addToCartError = "Please Choose a Size"
      scope.addToCartText = addToCartDefault
      CustomerService.getData().then(function(data) {
        if (scope.question.email == "") {
          scope.question.email = data.email
        }
      })
      scope.$watch('product.id', function(val) {
        if (val !== undefined) {
          scope.product.originalPrices = scope.product.prices
          scope.attributeCount = (scope.product.attributes == false) ? 0 : Object.keys(scope.product.attributes).length
          switch (scope.product.state) {
            case 'crowdfunding':
              scope.addToCartText = 'Fund It'
              break
            case 'preorder':
              scope.addToCartText = 'Pre-order'
              break
            default:
              scope.addToCartText = 'Add to Cart'
          }
          var selectedRemains = []
          scope.attributesList = []
          angular.forEach(scope.product.attributes, function(attribute, aKey) {
            angular.forEach(attribute, function(option, oKey) {
              scope.attributesList.push(option.label)
              option.available = scope.isAttributeAvailable(option)
              option.preorder = scope.isAttributePreorder(option)
              if (typeof scope.selectedAttributes[option.label] != "undefined" && scope.selectedAttributes[option.label].value == option.value && option.available) {
                option.selected = true
                selectedRemains.push(option.label)
              } else {
                option.selected = false
              }
            })
          })
          if (selectedRemains.length != scope.attributeCount) {
            scope.selectedLabel = (scope.product.id == 4407) ? "Choose amount" : "Choose size"
            scope.selectedAttributes = {}
            scope.enableButton = (scope.product.attributes == false) ? true : false
          } else {
            angular.forEach(scope.selectedAttributes, function(value, index) {
              if (selectedRemains.indexOf(index) == -1) {
                delete scope.selectedAttributes[index]
              }
            })
            if (Object.keys(scope.selectedAttributes).length == scope.attributeCount) {
              scope.enableButton = true
            }
            scope.updateSelectedAttributes()
          }
          scope.attributesList = _.uniq(scope.attributesList, true)
          scope.updateAttributes()
          scope.updatePreorderData()
        }
      })
      scope.addToCart = function(item) {
        if ($rootScope.isMobile) {
          $rootScope.mobileBuybar = false
        }
        scope.addToCartText = (scope.product.state == 'crowdfunding') ? 'Fund it' : 'Add to Cart'
        if (scope.enableButton) {
          item.selectedAttributes = scope.selectedAttributes
          item.preorder = scope.product.preorder
          item.crowdfunding = scope.product.crowdfundingActivated
          CartService.addProduct(angular.copy(item)).then(function(response) {}, function(error) {
            BannerService.showError(error)
          })
          scope.quicklook()
          ProductService.showSidebar = false
          if (!$rootScope.isMobile) {
            scope.showAddToCartModal(angular.copy(item))
          } else {
            CartService.showCart = true
          }
        } else {
          var labels = _.pull(scope.attributesList, Object.keys(scope.selectedAttributes).toString())
          scope.addToCartError = "Select a " + labels.join(" & ")
          scope.addToCartText = scope.addToCartError
          scope.showOptions()
        }
      }
      scope.showAddToCartModal = function(item) {
        ModalService.showModal({
          templateUrl: "/angular/app/modal/add-to-cart/add-to-cart-modal.html",
          controller: "AddToCartModalController",
          inputs: {
            item: item
          }
        }).then(function(modal) {
          modal.close.then(function(result) {})
        })
      }
      scope.updateAttributes = function() {
        angular.forEach(scope.product.attributes, function(attribute, aKey) {
          angular.forEach(attribute, function(option, oKey) {
            option.available = scope.isAttributeAvailable(option)
            option.preorder = scope.isAttributePreorder(option)
          })
        })
      }
      scope.updateSelectedAttributes = function() {
        angular.forEach(scope.product.attributes, function(attribute, aKey) {
          angular.forEach(attribute, function(option, oKey) {
            if (option.selected) {
              scope.selectedAttributes[option.label] = option
            }
          })
        })
        scope.selectedLabel = _.map(scope.selectedAttributes, function(att) {
          return att.label + ": " + att.value
        }).join(", ")
        CustomerService.selectedAttributes = scope.selectedAttributes
      }
      scope.selectAttribute = function(index, attribute) {
        scope.addToCartText = (scope.product.state == 'crowdfunding') ? 'Fund it' : 'Add to Cart'
        $log.debug("[BUYBAR]", scope.product.attributes[index])
        angular.forEach(scope.product.attributes[index], function(option, oKey) {
          if (option.value == attribute.value) {
            option.selected = true
          } else {
            option.selected = false
          }
        })
        scope.updateSelectedAttributes()
        scope.updateAttributes()
        scope.updatePreorderData()
        scope.enableButton = (Object.keys(scope.selectedAttributes).length == Object.keys(scope.product.attributes).length)
        scope.options.isOpen = !scope.enableButton
      }
      scope.isAttributeAvailable = function(attribute) {
        var availableConditions = _.reduce(scope.selectedAttributes, function(memo, value) {
          var add = {}
          add[value.label] = value.value
          return _.extend(memo, add)
        }, {})
        availableConditions['in_stock'] = true
        availableConditions[attribute.label] = attribute.value
        var products = _.where(scope.product.simpleProducts, availableConditions).length
        return (products > 0)
      }
      scope.isAttributePreorder = function(attribute) {
        if (Object.keys(scope.selectedAttributes).length == 0 && scope.attributeCount > 1)
          return false
        var availableConditions = _.reduce(scope.selectedAttributes, function(memo, value) {
          var add = {}
          if (attribute.label != value.label)
            add[value.label] = value.value
          return _.extend(memo, add)
        }, {})
        availableConditions[attribute.label] = attribute.value
        var simpleProduct = _.where(scope.product.simpleProducts, availableConditions)[0] || {}
        return simpleProduct.preorder
      }
      scope.showPreOrderModal = function(item) {
        ModalService.showModal({
          templateUrl: "/angular/app/modal/pre-order/pre-order-modal.html",
          controller: "PreOrderModalController",
        }).then(function(modal) {
          modal.close.then(function(result) {})
        })
      }
      scope.updatePreorderData = function() {
        if (Object.keys(scope.selectedAttributes).length == 0)
          return
        var availableConditions = _.reduce(scope.selectedAttributes, function(memo, value) {
          var add = {}
          add[value.label] = value.value
          return _.extend(memo, add)
        }, {})
        var simpleProduct = _.where(scope.product.simpleProducts, availableConditions)[0]
        if (simpleProduct.preorder) {
          scope.product.prices = simpleProduct.prices
        } else {
          scope.product.prices = scope.product.originalPrices
        }
        scope.product.preorderSelected = simpleProduct.preorder
      }
      scope.isAttributeSelected = function(attribute) {
        if (Object.keys(scope.selectedAttributes).length > 0 && typeof scope.selectedAttributes[attribute.label] !== "undefined")
          return scope.selectedAttributes[attribute.label].value == attribute.value
        return false
      }
      scope.showOutOfStockModal = function(attribute) {
        var attributes = []
        if (attribute) {
          var attributes = [attribute.label + ":" + attribute.value]
          angular.forEach(scope.selectedAttributes, function(selAttr, key) {
            if (selAttr.label != attribute.label) {
              attributes.push(selAttr.label + ":" + selAttr.value)
            }
          })
        }
        ModalService.showModal({
          templateUrl: "/angular/app/modal/product/out-of-stock-modal.html",
          controller: "OutOfStockModalController",
          inputs: {
            product: scope.product,
            attributes: attributes.sort().join()
          }
        }).then(function(modal) {
          modal.close.then(function(result) {})
        })
      }
      scope.showOptions = function() {
        scope.options.isOpen = !scope.options.isOpen
      }
    }
  }
}]).filter('toArray', function() {
  return function(obj, addKey) {
    if (!angular.isObject(obj)) return obj
    if (addKey === false) {
      return Object.keys(obj).map(function(key) {
        return obj[key]
      })
    } else {
      return Object.keys(obj).map(function(key) {
        var value = obj[key]
        return angular.isObject(value) ? Object.defineProperty(value, '$key', {
          enumerable: false,
          value: key
        }) : {
          $key: key,
          $value: value
        }
      })
    }
  }
})
BetabrandApp.directive('outOfStockForm', ['ProductService', 'TrackingService', function(ProductService, TrackingService) {
  return {
    restrict: 'E',
    templateUrl: '/angular/app/buybar/out-of-stock-form.html',
    replace: true,
    scope: {
      ngModel: '=',
      product: '=',
      attributes: '=?'
    },
    link: function(scope, $document) {
      scope.data = {
        email: ''
      }
      scope.restockSubmitted = false
      scope.submitQuestion = function() {
        scope.data.productId = scope.product.id
        scope.data.comment = scope.attributes
        ProductService.submitFeedback('restock', scope.data).then(function() {
          TrackingService.trackEvent('Subscribe to OOS', {
            'Attributes': scope.attributes
          })
          scope.restockSubmitted = true
        })
      }
    }
  }
}])
BetabrandApp.controller('CartController', ['$scope', '$window', '$location', 'CartService', '$document', 'BannerService', '$timeout', 'TrackingService', 'hotkeys', '$rootScope', 'CustomerService', function($scope, $window, $location, CartService, $document, BannerService, $timeout, TrackingService, hotkeys, $rootScope, CustomerService) {
  var self = this
  self.initialized = false
  $scope.cart = CartService
  $scope.discountCode = null
  $scope.discountMessage = null
  $scope.initialized = false
  $scope.customerService = CustomerService
  hotkeys.bindTo($scope).add({
    combo: 'esc',
    description: 'Close Cart',
    callback: function() {
      $scope.closeCart()
    }
  })
  $scope.navigateOrCloseCart = function(url) {
    if (url == $location.absUrl()) {
      CartService.showCart = false
    } else {
      var parser = document.createElement("a")
      parser.href = url
      $location.path(parser.pathname)
    }
  }
  $scope.removeProduct = function(item, index) {
    BannerService.hideError()
    CartService.removeProduct(item, index).then(function(response) {}, function(error) {
      BannerService.showError(error)
    })
  }
  $scope.updateTotal = function(item) {
    BannerService.hideError()
    CartService.updateTotal(item).then(function(response) {}, function(error) {
      BannerService.showError(error)
      $scope.cart.getCartData()
    })
  }
  $scope.toggleCart = function() {
    CartService.showCart = !CartService.showCart
    if ($rootScope.isMobile) {
      $rootScope.mobileBuybar = false
    }
  }
  $scope.closeCart = function() {
    CartService.showCart = false
  }
  $scope.openCheckout = function() {
    CartService.fireCartFlames.activated = true
    CartService.fireCartChug.activated = false
    CartService.fireCartDrive.activated = true
    $timeout(function() {
      CartService.fireCartFlames.activated = false
      CartService.fireCartDrive.activated = false
    }, 4000);
    CartService.showCart = false
    if ($rootScope.isMobile) {
      $rootScope.mobileBuybar = false
    }
    TrackingService.trackEvent("Click Checkout")
    $timeout(function() {
      $location.url('/cart/checkout')
    }, 260);
  }
  $scope.applyCoupon = function(code) {
    CartService.applyCoupon(code).then(function(data) {
      $scope.discountSuccessMessage = "Successfully applied coupon!"
      $timeout(function() {
        $scope.discountSuccessMessage = false
      }, 4000);
    }, function(data) {
      $scope.discountErrorMessage = data.messages.error[0].message
      $timeout(function() {
        $scope.discountErrorMessage = false
      }, 10000);
    })
  }
  $scope.removeCoupon = function() {
    CartService.removeCoupon().then(function(response) {}, function(error) {
      BannerService.showError(error)
    })
  }
  $scope.paypalCheckout = function() {
    TrackingService.trackEvent('Page Interaction', {
      'Type': 'Paypal Express Checkout Link'
    })
    $window.location.href = '/betapaypal/index/initiate/'
  }
  $scope.$watch('cart.showCart', function(newVal, oldVal) {
    if (newVal == true) {
      $scope.cart.showDiscount = false
      $scope.messages.hideBanner()
      $timeout(function() {
        hotkeys.bindTo($scope).add({
          combo: 'esc',
          description: 'Close Cart',
          callback: function() {
            $scope.closeCart()
          }
        })
      }, 610);
      TrackingService.trackEvent("View Cart")
    }
  })
  $scope.$on('loggedIn', function(response) {
    $scope.cart.getCartData()
  });
  $scope.$on('loggedOut', function(response) {
    $scope.cart.getCartData()
  });
  $scope.$on('checkoutSuccess', function(response) {
    $scope.cart.getCartData()
  });
  $rootScope.$on('viewLoaded', function(event, current) {
    if (!self.initialized) {
      $scope.cart.getCartData().then(function() {
        $scope.initialized = true
      })
      self.initialized = true;
    }
  })
  var search = $location.search()
  if (search.open_cart != undefined) {
    $timeout(function() {
      CartService.showCart = true;
    })
  }
}])
BetabrandApp.factory('CartService', ['TrackingService', '_', '$http', '$q', '$log', '$timeout', function(TrackingService, _, $http, $q, $log, $timeout) {
  function CartService() {
    var self = this
    self.products = []
    self.discount = 0
    self.total = 0
    self.subTotal = 0
    self.quantity = 0
    self.totals = []
    self.data = {}
    self.outOfStockItems = []
    self.mostRecentPromise = $q.defer()
    self.showDiscount = false
    self.hasCrowdfundingItems = false
    self.showCart = false
    self.fireCartFlames = {
      activated: false
    }
    self.fireCartChug = {
      activated: false
    }
    self.fireCartDrive = {
      activated: false
    }
    self.addProductIllusion = function(product) {
      if (product == undefined)
        return
      var exists = -1
      if (self.data.items) {
        exists = _.findIndex(self.data.items, function(prod) {
          var selectedOptions = _.reduce(product.selectedAttributes, function(memo, value) {
            var add = {};
            add[value.label] = value.value;
            return _.extend(memo, add)
          }, {})
          if (prod.options) {
            return prod.productId == product.id && JSON.stringify(selectedOptions).toLowerCase() == JSON.stringify(prod.options).toLowerCase()
          } else {
            return prod.productId == product.id
          }
        })
      }
      if (exists !== -1) {
        self.data.items[exists].qty++
      } else {
        var cartItem = {
          illusion: true,
          image: product.thumbnail,
          price: product.prices.final,
          qty: 1,
          name: product.name,
          url: product.canonicalUrl,
          options: _.reduce(product.selectedAttributes, function(memo, value) {
            var add = {};
            add[value.label] = value.value;
            return _.extend(memo, add)
          }, {})
        }
        self.data.items ? self.data.items.push(cartItem) : self.data.items = [cartItem]
      }
    }
    self.addProduct = function(product) {
      var deferred = $q.defer()
      self.mostRecentPromise = deferred
      if (product == undefined)
        return deferred.reject("No Product")
      self.fireCartFlames.activated = true
      self.fireCartChug.activated = false
      $timeout(function() {
        self.fireCartFlames.activated = false
      }, 2500);
      TrackingService.trackEvent('Add To Cart')
      var addToCartData = {
        "product": product.id,
        "attributes": []
      }
      angular.forEach(product.selectedAttributes, function(obj, key) {
        var attribute = {
          id: obj.id,
          value: obj.value_id
        }
        addToCartData.attributes.push(attribute)
      })
      var dataBackup = {}
      dataBackup = _.merge(dataBackup, self.data)
      self.addProductIllusion(product)
      var request = $http({
        method: "post",
        url: "/api/rest/cart/",
        data: addToCartData
      }).success(function(response) {
        if (deferred == self.mostRecentPromise) {
          self.updateCart(response)
        }
        TrackingService.track('addedToCart', self.data)
        deferred.resolve(response)
      }).error(function(error) {
        self.data = dataBackup
        deferred.reject(error)
      })
      return deferred.promise
    }
    self.removeProduct = function(item, index) {
      self.fireCartChug.activated = true
      $timeout(function() {
        self.fireCartChug.activated = false
      }, 1000);
      var deferred = $q.defer()
      self.mostRecentPromise = deferred
      TrackingService.trackEvent('Remove Product From Cart', {
        'Quantity': (item || {}).qty
      })
      self.data.items.splice(index, 1)
      var request = $http({
        method: "delete",
        url: "/api/rest/cart/remove/" + item.cartItemId,
        data: ""
      }).success(function(response) {
        if (deferred == self.mostRecentPromise) {
          self.getCartData()
        }
        TrackingService.track('removedFromCart', response)
        deferred.resolve(response)
      }).error(function(error) {
        deferred.reject(error)
      })
      return deferred.promise
    }
    self.applyCoupon = function(code) {
      var deferred = $q.defer()
      if (code) {
        self.mostRecentPromise = deferred
        var request = $http({
          method: "post",
          data: {
            code: code
          },
          url: "/api/rest/coupon/"
        }).success(function(response) {
          if (deferred == self.mostRecentPromise) {
            self.getCartData()
          }
          deferred.resolve(response)
        }).error(function(response) {
          $log.debug("[cart] Coupon not applied", response)
          if (deferred == self.mostRecentPromise) {
            self.getCartData()
          }
          deferred.reject(response)
        })
        TrackingService.trackEvent('Used Coupon Code')
      }
      return deferred.promise
    }
    self.removeCoupon = function() {
      var deferred = $q.defer()
      self.mostRecentPromise = deferred
      var request = $http({
        method: "delete",
        url: "/api/rest/coupon/delete"
      }).success(function(response) {
        if (deferred == self.mostRecentPromise) {
          self.getCartData()
        }
        deferred.resolve(response)
      }).error(function(error) {
        deferred.reject(error)
      })
      return deferred.promise
    }
    self.clearCart = function() {}
    self.getTotal = function() {
      return self.data.totals ? self.data.totals.grand_total.value : 0
    }
    self.getSubTotal = function() {
      return self.data.totals ? self.data.totals.subtotal.value : 0
    }
    self.getQuantity = function() {
      var totalQuantity = 0
      angular.forEach(self.data.items, function(obj, key) {
        totalQuantity += obj.qty
      })
      return totalQuantity
    }
    self.updateTotal = function(item) {
      self.fireCartChug.activated = true
      $timeout(function() {
        self.fireCartChug.activated = false
      }, 1000);
      var deferred = $q.defer()
      self.mostRecentPromise = deferred
      var updateData = {
        id: item.cartItemId,
        qty: item.qty
      }
      var request = $http({
        method: "put",
        url: "/api/rest/cart/update/",
        data: updateData
      }).success(function(response) {
        if (deferred == self.mostRecentPromise) {
          TrackingService.track('updateCartData', self.data)
          self.getCartData()
        }
        deferred.resolve(response)
      }).error(function(error) {
        deferred.reject(error)
      })
      return deferred.promise
    }
    self.getCartData = function() {
      var deferred = $q.defer()
      this.mostRecentPromise = deferred
      var request = $http({
        method: "get",
        url: "/api/rest/cart/get/"
      }).success(function(response) {
        if (deferred == self.mostRecentPromise) {
          self.updateCart(response)
          TrackingService.track('updateCartData', self.data)
        }
        deferred.resolve(response)
      }).error(function(error) {
        deferred.reject(error)
      })
      return deferred.promise
    }
    self.updateCart = function(cartData) {
      if (typeof cartData !== "object")
        return
      self.hasCrowdfundingItems = _.findWhere(cartData.items, {
        crowdfunding: 'crowdfunding'
      }) !== undefined ? true : false
      self.outOfStockItems = _.union(self.outOfStockItems, _.where(cartData.items, {
        salable: false
      }))
      _.remove(cartData.items, {
        salable: false
      })
      self.data = cartData
      self.calculatingTotals = false
    }, self.hasPreOrderItems = function() {
      if (typeof self.data.items == "undefined")
        return false
      for (var i = 0; i < self.data.items.length; i++) {
        if (self.data.items[i].preorder) {
          return true
        }
      }
      return false
    }
  }
  return new CartService()
}])
BetabrandApp.controller('CategoryController', ['$scope', '$filter', '$q', 'CategoryService', 'ProductService', 'CartService', 'TrackingService', 'LookupService', '_', '$window', '$timeout', '$location', 'PageService', '$route', 'OptimizelyService', function CategoryController($scope, $filter, $q, CategoryService, ProductService, CartService, TrackingService, LookupService, _, $window, $timeout, $location, PageService, $route, OptimizelyService) {
  $scope.cart = CartService
  $scope.templateUrl = LookupService.templateUrl
  $scope._ = _
  $scope.collectionLogo = false
  $scope.crosssells = []
  $scope.filterSorter = {
    selectedFilter: {
      gender: "!!",
      classification: "!!",
      subClassification: "!!",
      color: "!!"
    },
    selectedFilterLabels: {
      gender: "!!",
      classification: "!!",
      subClassification: "!!",
      color: "!!"
    },
    selectedSorter: "position",
    sortReverse: true
  }
  var category = {}
  $scope.configurator = {
    travelProducts: [],
    styles: {}
  }
  var trackingData = null
  var trackingDeferred = $q.defer()
  TrackingService.setTrackingPromise(trackingDeferred.promise)

  function _buildTrackingData(data) {
    var source = ''
    if (data) {
      if (data['isThinkTank'])
        source = "Think Tank "
      if (data['isCollection'])
        source += "Collection"
      else
        source += "Category"
    } else
      source = "Category"
    trackingData = {
      'Source': source + ' Page',
      'Shop Section': data.shopSection,
      'Shop Category': data.key
    }
    trackingDeferred.resolve(trackingData)
  }
  $scope.doFilter = function() {
    $scope.data.filteredProducts = $filter('filterFields')($scope.data.products, {
      gender: $scope.filterSorter.selectedFilter.gender,
      color: $scope.filterSorter.selectedFilter.color,
      classification: $scope.filterSorter.selectedFilter.classification,
      subClassification: $scope.filterSorter.selectedFilter.subClassification
    });
    $scope.data.filteredProducts = _.sortBy($scope.data.filteredProducts, function(item) {
      if ($scope.filterSorter.selectedSorter == "hot") {
        return -1 * item.position
      } else if ($scope.filterSorter.selectedSorter == "new") {
        return -1 * item.votingStartDate
      } else if ($scope.filterSorter.selectedSorter == "prices.final" && $scope.filterSorter.sortReverse) {
        return -1 * item.prices.final
      } else if ($scope.filterSorter.selectedSorter == "prices.final") {
        return item.prices.final
      } else if ($scope.filterSorter.selectedSorter == "thinktankCounts.crowdfunding.percent_to_goal" && $scope.filterSorter.sortReverse) {
        return item.thinktankCounts.crowdfunding.activated == "0" ? 99999 - item.thinktankCounts.crowdfunding.percent_to_goal : -1 * item.thinktankCounts.crowdfunding.percent_to_goal
      } else if ($scope.filterSorter.selectedSorter == "thinktankCounts.crowdfunding.percent_to_goal") {
        return item.thinktankCounts.crowdfunding.percent_to_goal
      } else if ($scope.filterSorter.selectedSorter == "thinktankCounts.voting.count" && $scope.filterSorter.sortReverse) {
        return -1 * item.thinktankCounts.voting.count
      } else if ($scope.filterSorter.selectedSorter == "thinktankCounts.voting.count") {
        return item.thinktankCounts.voting.count
      } else if ($scope.filterSorter.selectedSorter == "commentsCount.count" && $scope.filterSorter.sortReverse) {
        return -1 * parseInt(item.commentsCount.count)
      } else if ($scope.filterSorter.selectedSorter == "commentsCount.count") {
        return parseInt(item.commentsCount.count)
      }
    });
    $timeout(function() {
      angular.element($window).triggerHandler('scroll');
    }, 0);
  }
  var category_id = $route.current.categoryId || LookupService.id
  CategoryService.getCategory(category_id).then(function(data) {
    category = data
    $scope.collectionLogo = (data.logo !== "") ? true : false
    _buildTrackingData(data)
    if (category.children) {
      for (var i = 0; i < category.children.length; i++) {
        if (category.children[i].includeInMenu) {
          $scope.data = data
          $scope.data.children = _.where(data.children, {
            includeInMenu: true
          })
          afterCategoryLoad()
          return;
        }
        if (category.children[i].isCrosssell) {
          ProductService.getProductsForCategoryId(category.children[i].id).then(function(catData) {
            var crosssells = angular.isArray(catData) ? catData : Object.keys(catData).map(function(k) {
              return catData[k]
            })
            angular.forEach(crosssells, function(cross) {
              cross.url = cross.canonicalUrl
              $scope.crosssells.push(cross)
            })
          })
        }
      }
    }
    ProductService.getProductsForCategoryId(category_id).then(function(data) {
      category.products = angular.isArray(data) ? data : Object.keys(data).map(function(k) {
        return data[k]
      })
      for (var i = 0; i < category.products.length; i++) {
        if (category.products[i].thinktankCounts) {
          if (category.products[i].thinktankCounts.state == 'voting') {
            category.isVotingCategory = true
          } else {
            category.isVotingCategory = false
          }
        } else {
          category.products[i].thinktankCounts = {
            crowdfunding: {
              activated: 0,
              count: 0,
              days_remaining: 0,
              end_date: "1970/01/01 00:00:00",
              min: null,
              tiers: []
            },
            state: "voting",
            voting: {
              activated: 0,
              count: 0,
              min: 0,
              start_date: "1970/01/01 00:00:00"
            }
          }
        }
        if (category.products[i].commentsCount == undefined) {
          category.products[i].commentsCount = {
            count: 0
          }
        }
      }
      OptimizelyService.handle("categoryPageLoaded", category)
      $scope.data = category
      $scope.categoryData = category
      $scope.data.filters.gender = _.values($scope.data.filters.gender)
      $scope.data.filters.colors = _.values($scope.data.filters.colors)
      $scope.$watch('filterSorter', $scope.doFilter, true)
      $scope.page.setTitle(category.title)
      afterCategoryLoad()
      if ($scope.data.id == 88)
        $scope.setUpDPYP()
    })
  }, function() {
    $location.url('/404')
  })
  $scope.setUpDPYP = function() {
    var styles = {
      'boot-cut': 0,
      'straight-leg': 1,
      'leggings': 2,
      'cropped-leg': 3,
    }
    var travelProductIds = ['10845', '11000', '10948', '10847', '8714', '11256']
    _.each($scope.data.products, function(product, i) {
      if (_.contains(travelProductIds, product.id)) {
        $scope.configurator.travelProducts.push(product)
      }
    })
    var filteredProducts = $scope.data.products
    _.remove(filteredProducts, function(product) {
      return _.contains(travelProductIds, product.id)
    })
    var subClassifications = _.compact(_.unique(_.pluck(filteredProducts, 'subClassification')))
    _.each(subClassifications, function(key, i) {
      var products = _.where(filteredProducts, {
        'subClassification': key
      })
      $scope.configurator.styles[key] = {
        'products': products,
        'label': key,
        'position': styles[key[0]],
        'url': products[0].url,
        'image': '/media/configurator/dpyp/category-images/' + key[0] + '.jpg',
        'hoveredStyle': products.length + ' Styles'
      }
    })
  }

  function afterCategoryLoad() {
    $scope.$emit('viewLoaded')
    TrackingService.track('updateCategoryData', category)
  }
  PageService.setBodyClass('category__page')
  PageService.setMicrodataItemType('CollectionPage')
}]).filter('removeCollectionPrefix', function() {
  return function(value) {
    return (!value) ? '' : value.replace("Men's ", "").replace("Women's ", "")
  }
}).filter('filterFields', function($filter) {
  return function(list, filterFields) {
    var show = true;
    angular.forEach(filterFields, function(filterItem, fieldName) {
      if (filterItem && filterItem != "!!") {
        show = false;
      }
    })
    if (show) {
      return list;
    } else {
      return $filter("filter")(list, function(listItem) {
        var show = true;
        angular.forEach(filterFields, function(filterItem, fieldName) {
          if (filterItem && filterItem != "!!") {
            if (angular.isArray(listItem[fieldName])) {
              if (listItem[fieldName].indexOf(filterItem) == -1) {
                show = false;
              }
            } else {
              if (listItem[fieldName] != filterItem) {
                show = false;
              }
            }
          }
        })
        return show
      })
    }
  }
}).filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  }
}])
BetabrandApp.factory('CategoryService', ['$http', '$q', function($http, $q) {
  function CategoryService() {
    var self = this
    var id = null
    self.getCategory = function(id) {
      this.id = id
      var deferred = $q.defer()
      $http.get('/api/rest/categories/' + id).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
  }
  return new CategoryService()
}])
BetabrandApp.directive('filterSorter', ['_', 'TrackingService', '$location', '$rootScope', '$log', function(_, TrackingService, $location, $rootScope, $log) {
  return {
    scope: {
      data: "=",
      filterSorters: "="
    },
    restrict: 'E',
    templateUrl: '/angular/app/category/filter-sorter.html',
    replace: true,
    link: function(scope, iElm, iAttrs, controller) {
      scope._ = _
      scope.filterLabel = 'all'
      scope.sorterLabel = 'Hot'
      scope.showFilters = false
      scope.showSorters = false
      scope.sortLabels = {
        '-hot': 'Hot',
        'new': 'New',
        '-prices.final': 'Price (High to Low)',
        'prices.final': 'Price (Low to High)',
        '-thinktankCounts.crowdfunding.percent_to_goal': 'Percent to Goal (High to Low)',
        'thinktankCounts.crowdfunding.percent_to_goal': 'Percent to Goal (Low to High)',
        '-thinktankCounts.voting.count': 'Votes (High to Low)',
        'thinktankCounts.voting.count': 'Votes (Low to High)',
        '-commentsCount.count': 'Comments (High to Low)',
        'commentsCount.count': 'Comments (Low to High)'
      }
      scope.noFilters = function() {
        return _.every(_.values(scope.filterSorters.selectedFilter), function(v) {
          return v == '!!';
        })
      }
      scope.changeFilter = function(type, filter, label) {
        scope.showFilters = false
        scope.filterLabel = label
        if (scope.filterSorters.selectedFilter[type] == filter) {
          scope.clearFilter(type)
        } else {
          $location.search(type, filter)
          scope.filterSorters.selectedFilter[type] = filter
          scope.filterSorters.selectedFilterLabels[type] = label
          TrackingService.trackEvent("Shop Page Interaction", {
            "Interaction Type": "Filter",
            "Control Name": type,
            "Control Selection": label
          })
        }
      }
      scope.changeSorter = function(sorter, label, reverse) {
        scope.showSorters = false
        scope.filterSorters.selectedSorter = sorter
        scope.sorterLabel = label
        scope.filterSorters.sortReverse = reverse
        var paramValue = reverse ? "-" + sorter : sorter
        $location.search("sort", paramValue)
        TrackingService.trackEvent("Shop Page Interaction", {
          "Interaction Type": "Sorter",
          "Control Name": sorter,
          "Control Selection": label
        })
      }
      scope.clearFilter = function(key) {
        scope.filterSorters.selectedFilter[key] = "!!"
        scope.filterSorters.selectedFilterLabels[key] = "!!"
        $location.search(key, null)
      }
      scope.clearAllFilters = function() {
        angular.forEach(scope.filterSorters.selectedFilter, function(value, key) {
          scope.filterSorters.selectedFilter[key] = "!!"
          scope.filterSorters.selectedFilterLabels[key] = "!!"
          $location.search(key, null)
        })
        scope.filterLabel = 'all'
      }
      scope.handleFilterClick = function() {
        scope.showFilters = !scope.showFilters
        scope.showSorters = false
      }
      scope.handleSorterClick = function() {
        scope.showSorters = !scope.showSorters
        scope.showFilters = false
      }
      scope.initializeFilters = function() {
        var search = $location.search()
        angular.forEach(scope.filterSorters.selectedFilter, function(value, key) {
          if (search[key] && search[key] !== value) {
            label = search[key]
            if (label == "men")
              label = "men's"
            if (label == "women")
              label = "women's"
            scope.changeFilter(key, search[key], label)
          }
        })
        if (search.sort) {
          var reverse = false
          var sorter = search.sort
          var label = scope.sortLabels[sorter]
          if (sorter.indexOf("-") === 0) {
            reverse = true
            sorter = sorter.substr(1)
          }
          scope.changeSorter(sorter, label, reverse)
        }
      }
      scope.initializeFilters()
      $rootScope.$on('$locationChangeStart', function() {
        scope.initializeFilters()
        $log.debug("Initializing category filters on route change")
      })
    }
  }
}])
BetabrandApp.controller('CheckoutController', ['$scope', '$kookies', 'BannerService', 'CheckoutService', 'CartService', 'LoggingService', 'TrackingService', '$document', '$sce', '$q', '$log', '_', 'CustomerService', '$timeout', '$window', 'ModalService', '$location', 'PageService', 'hotkeys', function CheckoutController($scope, $kookies, BannerService, CheckoutService, CartService, LoggingService, TrackingService, $document, $sce, $q, $log, _, CustomerService, $timeout, $window, ModalService, $location, PageService, hotkeys) {
  $scope.cart = CartService
  $scope.checkoutService = CheckoutService
  $scope.customerService = CustomerService
  $scope.shippingAddressIsSaved = false
  $scope.addShippingAddress = false
  $scope.addBillingAddress = false
  $scope.addCreditCard = false
  $scope.shippingFormMode = "default"
  $scope.billingFormMode = "default"
  $scope.recompilePaymentMethods = false
  $scope.shippingValid = false
  $scope.billingValid = false
  $scope.shippingMethodValid = false
  $scope.paymentValid = false
  $scope.allValid = false
  $scope.options = {
    saveAsDefault: true
  }
  $scope.swipeString = ""
  $scope.currentStep = 0
  $scope.showshippingErrors = false
  $scope.showbillingErrors = false
  $scope.trackingService = TrackingService
  hotkeys.del('/')
  var trackingDeferred = $q.defer()
  TrackingService.setTrackingPromise(trackingDeferred.promise)
  var trackingData = {
    shippingInfo: {
      defer: $q.defer(),
      lastVal: false
    },
    billingInfo: {
      defer: $q.defer(),
      lastVal: false
    },
    shippingMethod: {
      defer: $q.defer(),
      lastVal: false
    },
    paymentMethod: {
      lastVal: false
    }
  }

  function _initTracking(data) {
    trackingDeferred.resolve({
      'Source': 'Checkout Page'
    })
  }
  $scope.trackSelectShippingInfo = function() {
    var shipping = CheckoutService.data.shipping
    var def = (shipping.id && trackingData.shippingInfo.lastVal === false)
    trackingDeferred.promise.then(function() {
      TrackingService.trackEvent("Select Shipping Info", {
        'Default Shipping Info': def
      })
      trackingData.shippingInfo.lastVal = shipping.id ? shipping.id : null
      trackingData.shippingInfo.defer.resolve()
    })
  }
  $scope.trackSelectBillingInfo = function() {
    var billing = CheckoutService.data.billing
    var shippingIsSameAsBilling = !!CheckoutService.shippingIsSameAsBilling
    var def = (billing.id && trackingData.billingInfo.lastVal === false)
    trackingData.shippingInfo.defer.promise.then(function() {
      TrackingService.trackEvent("Select Billing Info", {
        'Billing Same as Shipping': shippingIsSameAsBilling,
        'Default Billing Info': def
      })
      trackingData.billingInfo.lastVal = billing.id ? billing.id : null
      trackingData.billingInfo.defer.resolve()
    })
  }
  $scope.trackSelectShippingMethod = function() {
    var shippingMethod = CheckoutService.data.shipping_method.selected
    if (trackingData.shippingMethod.lastVal != shippingMethod) {
      var def = (trackingData.shippingMethod.lastVal === false)
      trackingData.billingInfo.defer.promise.then(function() {
        TrackingService.trackEvent("Select Shipping Method", {
          'Shipping Method': shippingMethod,
          'Default Shipping Method': def
        })
        trackingData.shippingMethod.defer.resolve()
      })
      trackingData.shippingMethod.lastVal = shippingMethod
    }
  }
  $scope.trackSelectPaymentMethod = function() {
    var paymentMethod = CheckoutService.data.payment.selected.method
    if (trackingData.paymentMethod.lastVal != paymentMethod) {
      var def = (trackingData.paymentMethod.lastVal === false)
      trackingData.shippingMethod.defer.promise.then(function() {
        TrackingService.trackEvent("Select Payment Method", {
          'Payment Method': paymentMethod,
          'Default Payment Method': def
        })
      })
      trackingData.paymentMethod.lastVal = paymentMethod
    }
  }
  $scope.initializeCheckout = function() {
    $scope.checkoutService.initialize().then(function(data) {
      $scope.shippingAddressIsSaved = false
      $scope.addShippingAddress = false
      $scope.addBillingAddress = false
      $scope.addCreditCard = false
      $scope.shippingFormMode = "default"
      $scope.billingFormMode = "default"
      if (!data.saved_addresses || data.saved_addresses.length == 0) {
        $scope.addShippingAddress = true
        $scope.addBillingAddress = true
      }
      if (data.shipping.id && data.billing.id && data.shipping.id != data.billing.id) {
        CheckoutService.shippingIsSameAsBilling = false
      }
      if (data.saved_addresses && data.shipping.id) {
        $scope.shippingAddressIsSaved = true
        $scope.trackSelectShippingInfo()
        if (CheckoutService.shippingIsSameAsBilling == true) {
          $scope.trackSelectBillingInfo()
        }
      }
      if (data.saved_addresses && data.billing.id && CheckoutService.shippingIsSameAsBilling != true) {
        $scope.trackSelectBillingInfo()
      }
      if (!data.shipping.id && CheckoutService.addressHasRequiredData(data.shipping)) {
        $scope.shippingFormMode = "preview"
        $scope.shippingAddressIsSaved = true
        $scope.addShippingAddress = true
        $scope.trackSelectShippingInfo()
        if (CheckoutService.shippingIsSameAsBilling == true) {
          $scope.trackSelectBillingInfo()
        }
      }
      if (!data.billing.id && CheckoutService.addressHasRequiredData(data.billing)) {
        $scope.billingFormMode = "preview"
        $scope.addBillingAddress = true
        $scope.trackSelectBillingInfo()
      }
      if (window.location.pathname.match(/paypal\/?$/)) {
        $scope.shippingFormMode = "preview"
        $scope.addShippingAddress = true
        $scope.options.saveAsDefault = false
      }
      if ($scope.shippingAddressIsSaved) {
        $scope.trackSelectShippingMethod()
      }
      if ($scope.isPOS) {
        $scope.shippingFormMode = "edit"
        $scope.addShippingAddress = true
        $scope.options.saveAsDefault = false
      }
      CustomerService.getData().then(function(data) {
        if (!CheckoutService.data.shipping.id && !CheckoutService.data.shipping.name && data.firstname) {
          CheckoutService.data.shipping.name = data.firstname + ' ' + data.lastname
        }
        if (!CheckoutService.data.shipping.id && !CheckoutService.data.shipping.email && data.email) {
          CheckoutService.data.shipping.email = data.email
        }
      })
      $scope.$emit('viewLoaded')
      PageService.setBodyClass('in__checkout')
      PageService.setMicrodataItemType('CheckoutPage')
      angular.element(document.querySelector('body')).removeClass('cart__open mobile__menu-open mobile-buybar--open')
      $log.debug("Checkout State", data)
      $scope.validateCheckout()
      $scope.setupValidationWatchers()
      _initTracking(data)
    }, function(error) {
      $log.debug(error)
      $scope.messages.showError(error)
    })
  }
  $scope.initializeCheckout()
  $scope.getUtmz = function() {
    var parsedUtm = {},
      utmz = $kookies.get('__utmz')
    parsedUtm.bbCampaignFirst = $kookies.get('betabrand-campaign-first')
    parsedUtm.bbCampaignSession = $kookies.get('betabrand-campaign-session')
    parsedUtm.bbCampaignLast = $kookies.get('betabrand-campaign-last')
    if (!utmz) {
      return parsedUtm
    }
    var source = utmz.match(/utmcsr=([^|]+)/)
    if (source && source[1]) {
      parsedUtm.source = source[1]
    }
    var campaign = utmz.match(/utmccn=([^|]+)/)
    if (campaign && campaign[1]) {
      parsedUtm.campaign = campaign[1]
    }
    var medium = utmz.match(/utmcmd=([^|]+)/)
    if (medium && medium[1]) {
      parsedUtm.medium = medium[1]
    }
    var term = utmz.match(/utmctr=([^|]+)/)
    if (term && term[1]) {
      parsedUtm.term = term[1]
    }
    return parsedUtm
  }
  $scope.submitShippingAddress = function() {
    $scope.messages.hideBanner()
    if ($scope.addShippingAddress) {
      delete CheckoutService.data.shipping.id
    }
    var checkoutPromise = CheckoutService.submit({
      shippingAddress: true
    })
    checkoutPromise.then(function(data) {
      $scope.shippingFormMode = "preview"
      $scope.shippingAddressIsSaved = true
      $log.debug("submitShippingAddress", data)
      $scope.trackSelectShippingInfo()
      if (CheckoutService.shippingIsSameAsBilling) {
        $scope.trackSelectBillingInfo()
      }
    }, function(error) {
      $scope.shippingFormMode = "default"
      $scope.addShippingAddress = true
      $scope.shippingAddressIsSaved = false
    })
    return checkoutPromise
  }
  $scope.submitBillingAddress = function() {
    $scope.messages.hideBanner()
    if ($scope.shippingFormMode == "default" || $scope.shippingFormMode == "edit")
      $scope.submitShippingAddress()
    if ($scope.addBillingAddress) {
      delete CheckoutService.data.billing.id
    }
    var checkoutPromise = CheckoutService.submit({
      billingAddress: true
    })
    checkoutPromise.then(function(data) {
      $scope.shippingAddressIsSaved = true
      $log.debug("submitShippingAddress", data)
    }, function(error) {
      $scope.billingFormMode = "default"
      $scope.shippingAddressIsSaved = false
      $scope.addBillingAddress = true
    })
    $scope.validateCheckout()
    return checkoutPromise
  }
  $scope.submitShippingBillingStep = function() {
    var hasErrors = false
    $scope.clearCheckoutErrors()
    if (!$scope.shippingValid) {
      $scope.shippingFormMode = 'edit'
      $scope.showshippingErrors = true
      hasErrors = true
    }
    if (!$scope.billingValid) {
      $scope.showbillingErrors = true
      $scope.billingFormMode = 'edit'
      hasErrors = true
    }
    if (hasErrors) {
      return
    }
    var sections = CheckoutService.shippingIsSameAsBilling ? {
      "shippingAddress": 1
    } : {
      "shippingAddress": 1,
      "billingAddress": 1
    }
    CheckoutService.submit(sections, {}).then(function(data) {
      $log.debug("address submit success", data)
      $scope.shippingFormMode = "preview"
      $scope.billingFormMode = "preview"
      $scope.shippingAddressIsSaved = true
      $scope.trackSelectShippingInfo()
      $scope.trackSelectBillingInfo()
      $scope.trackSelectShippingMethod()
    }, function(data) {
      $log.debug("address submit error", data)
      $scope.shippingFormMode = "edit"
      $scope.billingFormMode = "edit"
      window.scrollTo(0, 0)
    })
  }
  $scope.submitShippingMethod = function() {
    $scope.messages.hideBanner()
    var checkoutPromise
    checkoutPromise = CheckoutService.submit({
      shippingMethod: true
    })
    checkoutPromise.then(function(data) {
      $scope.shippingAddressIsSaved = true
      $log.debug("submitShippingMethod", data)
      $scope.selectedShippingMethodTitle = data.shipping_method.selectedTitle
      $scope.trackSelectShippingMethod()
    }),
      function(error) {}
    $scope.validateCheckout()
    return checkoutPromise
  }
  $scope.toggleAddAddress = function(type) {
    $scope.shippingAddressIsSaved = false
    if (type == "billing") {
      if (angular.element(document.querySelector('.billing__address')).length) {
        $document.scrollTo(angular.element(document.querySelector('.billing__address')), 50, 400)
      }
      $scope.addBillingAddress = !$scope.addBillingAddress
      if ($scope.addBillingAddress) {
        delete CheckoutService.data.billing.id
        $scope.shippingFormMode = "edit"
        CheckoutService.clearAddress(type)
      }
      $scope.validateBilling()
    } else if (type == "shipping") {
      if (angular.element(document.querySelector('.shipping-select__container')).length) {
        $document.scrollTo(angular.element(document.querySelector('.shipping-select__container')), 50, 400)
      };
      $scope.addShippingAddress = !$scope.addShippingAddress
      if ($scope.addShippingAddress) {
        delete CheckoutService.data.shipping.id
        CheckoutService.clearAddress(type)
        if (CheckoutService.shippingIsSameAsBilling) {
          delete CheckoutService.data.billing.id
        }
        $scope.shippingFormMode = "edit"
      }
      $scope.validateCheckout()
    }
  }
  $scope.submitPaymentMethod = function(options) {
    $scope.messages.hideBanner()
    var shippingMethodData = {}
    if (options && options.shippingMethod) {
      shippingMethodData = {
        shipping_method: CheckoutService.data.shipping_method.selected
      }
    }
    CheckoutService.submitPaymentMethod(shippingMethodData).then(function(data) {
      $scope.shippingAddressIsSaved = true
      $log.debug("submitPaymentMethod", data)
    })
  }
  $scope.clearCheckoutErrors = function() {
    $scope.showbillingErrors = false
    $scope.showshippingErrors = false
    $scope.showShippingMethodErrors = false
    $scope.showPaymentErrors = false
  }
  $scope.handleInvalidOrder = function() {
    var sections = []
    if (!$scope.billingValid && CheckoutService.shippingIsSameAsBilling == false) {
      $scope.showbillingErrors = true
      $scope.addBillingAddress = true
      $scope.billingFormMode = 'edit'
      $scope.shippingAddressIsSaved = false
      sections.push("billing address")
    }
    if (!$scope.shippingValid) {
      $scope.showshippingErrors = true
      $scope.addShippingAddress = true
      $scope.shippingAddressIsSaved = false
      $scope.shippingFormMode = 'edit'
      sections.push("shipping address")
    }
    if (!$scope.shippingMethodValid) {
      $scope.showShippingMethodErrors = true
      sections.push("shipping method")
    }
    if (!$scope.paymentValid) {
      $scope.showPaymentErrors = true
      sections.push("payment method")
    }
    if (sections.length > 0) {}
    var checkoutData = angular.copy(CheckoutService.data)
    if (checkoutData.payment.selected.cc_number) {
      checkoutData.payment.selected.cc_number = "XXXX-XXXX-XXXX-XXXX"
    }
    var loggingData = {
      userAgent: navigator.userAgent,
      customer: CustomerService.data,
      state: checkoutData,
      validation: {
        shipping: $scope.shippingValid,
        billing: $scope.billingValid,
        shippingMethod: $scope.shippingMethodValid,
        payment: $scope.paymentValid
      },
      options: {
        shippingSaved: $scope.shippingAddressIsSaved,
        addShipping: $scope.addShippingAddress,
        addBilling: $scope.addBillingAddress,
        addCreditCard: $scope.addCreditCard,
        shippingFormMode: $scope.shippingFormMode,
        billingFormMode: $scope.billingFormMode,
        shippingSameAsBilling: CheckoutService.shippingIsSameAsBilling
      },
      optimizely: angular.optimizely
    }
    if (typeof FS != "undefined") {
      loggingData.fullStoryUrl = FS.getCurrentSessionURL()
    } else {
      loggingData.fullStoryUrl = "Unavailable"
    }
    LoggingService.serverSideLog(loggingData, "checkout")
  }
  $scope.placeOrder = function(sections, options) {
    $scope.showshippingErrors = false
    $scope.showbillingErrors = false
    $scope.showShippingMethodErrors = false
    $scope.showPaymentErrors = false
    if (!$scope.allValid && !window.location.pathname.match(/paypal\/?$/)) {
      $scope.handleInvalidOrder()
      return
    }
    $scope.trackSelectPaymentMethod()
    $scope.loadingSpinner = true
    $scope.messages.hideBanner()
    sections = sections || {}
    options = options || {}
    _.extend(options, {
      place: true,
      utm: $scope.getUtmz()
    })
    CheckoutService.submit(sections, options).then(function(data) {
      $log.debug(data)
    }, function(error) {
      var errorMessage = ""
      $scope.loadingSpinner = false
      if (error.messages && error.messages.error && error.messages.error[0]) {
        errorMessage = error.messages.error[0].message
      }
      if (errorMessage.match(/shipping address/i)) {
        $scope.shippingFormMode = "default"
        $scope.addShippingAddress = true
        $scope.shippingAddressIsSaved = false
        $scope.showshippingErrors = true
      }
      if (errorMessage.match(/billing address/i)) {
        $scope.billingFormMode = "default"
        $scope.addBillingAddress = true
        $scope.shippingAddressIsSaved = false
        $scope.showbillingErrors = true
      }
    })
  }
  $scope.deleteSavedCard = function(cardId) {
    CheckoutService.deleteSavedCard(cardId).then(function(data) {
      $log.debug("deleted saved credit card", data)
      if ((!data.cards || data.cards.length == 0) && CheckoutService.data.payment.selected) {
        $scope.addCreditCard = true
        CheckoutService.data.payment.selected = {
          method: CheckoutService.data.payment.selected.method
        }
      }
      CheckoutService.getCheckoutState()
      $scope.validateCheckout()
    })
  }
  $scope.toggleSavedCards = function() {
    $scope.addCreditCard = !$scope.addCreditCard
    var method = CheckoutService.data.payment.selected.method
    CheckoutService.data.payment.selected = {
      method: method
    }
    $scope.validateCheckout()
  }
  $scope.closeCheckout = function() {
    $scope.shippingAddressIsSaved = false
    CheckoutService.reset()
    window.scrollTo(0, 0)
    $scope.messages.hideBanner()
  }
  $scope.applyCoupon = function(code) {
    CartService.applyCoupon(code).then(function(data) {
      CheckoutService.getCheckoutState()
      $scope.discountSuccessMessage = "Successfully applied coupon!"
      $timeout(function() {
        $scope.discountSuccessMessage = false
      }, 4000);
    }, function(data) {
      CheckoutService.getCheckoutState()
      $scope.discountErrorMessage = data.messages.error[0].message
      $timeout(function() {
        $scope.discountErrorMessage = false
      }, 10000);
    })
  }
  $scope.removeCoupon = function() {
    CartService.removeCoupon().then(function(response) {
      CheckoutService.getCheckoutState()
    }, function(error) {
      BannerService.showError(error)
      CheckoutService.getCheckoutState()
    })
  }
  $scope.removeProduct = function(item, index) {
    BannerService.hideError()
    CartService.removeProduct(item, index).then(function(response) {
      CheckoutService.getCheckoutState()
    }, function(error) {
      CheckoutService.getCheckoutState()
      BannerService.showError(error)
    })
  }
  $scope.updateTotal = function(item) {
    BannerService.hideError()
    CartService.updateTotal(item).then(function(response) {
      CheckoutService.getCheckoutState()
    }, function(error) {
      BannerService.showError(error)
      CheckoutService.getCheckoutState()
      CartService.getCartData()
    })
  }
  $scope.viewStoreMap = function() {
    $scope.showStoreMap = !$scope.showStoreMap
  }
  $scope.$on('loggedIn', function(response) {
    $scope.initializeCheckout()
  })
  $scope.$on('loggedOut', function(response) {
    $scope.initializeCheckout()
  })
  $scope.updateAllValid = function() {
    if ($scope.paymentValid && $scope.shippingValid && $scope.billingValid && $scope.shippingMethodValid) {
      $scope.allValid = true
    } else {
      $scope.allValid = false
    }
  }
  $scope.validateCheckout = function() {
    $scope.validateShipping()
    $scope.validateBilling()
    $scope.validateShippingMethod()
    $scope.validatePayment()
  }
  $scope.setupValidationWatchers = function() {
    $scope.$watch(function() {
      return CheckoutService.data ? CheckoutService.data.shipping : false
    }, $scope.validateShipping, true)
    $scope.$watch(function() {
      return CheckoutService.data ? CheckoutService.data.billing : false
    }, $scope.validateBilling, true)
    $scope.$watch(function() {
      return CheckoutService.data && CheckoutService.data.shipping_method ? CheckoutService.data.shipping_method.selected : false
    }, $scope.validateShippingMethod, true)
    $scope.$watch(function() {
      return CheckoutService.data && CheckoutService.data.payment ? CheckoutService.data.payment.selected : false
    }, $scope.validatePayment, true)
  }
  $scope.validatePayment = _.debounce(function() {
    if (!CheckoutService.data.payment) {
      $scope.paymentValid = false
      $scope.updateAllValid()
      return
    }
    $timeout(function() {
      $log.debug('validating payment')
      var paymentMethod = CheckoutService.data.payment && CheckoutService.data.payment.selected ? CheckoutService.data.payment.selected.method : false
      if (paymentMethod) {
        var paymentFormScope = angular.element(document.getElementById('payment-' + paymentMethod)).scope()
        if (paymentFormScope) {
          $scope.paymentValid = paymentFormScope[paymentMethod].$valid
        }
      }
      $scope.updateAllValid()
    })
  }, 50)
  $scope.validateShippingMethod = _.debounce(function() {
    if (!CheckoutService.data.shipping_method) {
      $scope.shippingMethodValid = false
      $scope.updateAllValid()
      return
    }
    $timeout(function() {
      $log.debug('validating shipping method')
      $scope.shippingMethodValid = CheckoutService.data.shipping_method.selected ? true : false
      $scope.updateAllValid()
    })
  }, 50)
  $scope.validateShipping = _.debounce(function() {
    if (!CheckoutService.data.shipping) {
      $scope.shippingValid = false
      if (CheckoutService.shippingIsSameAsBilling) {
        $scope.billingValid = false
      }
      $scope.updateAllValid()
      return
    }
    $timeout(function() {
      $log.debug('validating shipping address')
      $scope.shippingValid = $scope.isShippingValid()
      if (CheckoutService.shippingIsSameAsBilling) {
        $scope.billingValid = $scope.shippingValid
      }
      $scope.updateAllValid()
    })
  }, 50)
  $scope.validateBilling = _.debounce(function() {
    if (!CheckoutService.data.billing) {
      $scope.billingValid = false
      $scope.updateAllValid()
      return
    }
    $timeout(function() {
      $log.debug('validating billing address')
      if (CheckoutService.shippingIsSameAsBilling) {
        $scope.billingValid = $scope.isShippingValid()
      } else {
        if (!$scope.addBillingAddress && CheckoutService.data.billing.id) {
          $scope.billingValid = true
        } else if (!$scope.addBillingAddress && CheckoutService.data.saved_addresses) {
          $scope.billingValid = false
        } else {
          var billingAddressForm = angular.element(document.getElementById('address-billing')).scope()
          if (billingAddressForm) {
            $scope.billingValid = billingAddressForm.billing.$valid
          }
        }
      }
      $scope.updateAllValid()
    })
  }, 50)
  $scope.isShippingValid = function() {
    if (!$scope.addShippingAddress && CheckoutService.data.shipping.id) {
      return true
    } else if (!$scope.addShippingAddress && CheckoutService.data.saved_addresses) {
      return false
    }
    var shippingAddressForm = angular.element(document.getElementById('address-shipping')).scope()
    if (shippingAddressForm) {
      return shippingAddressForm.shipping.$valid
    }
    return false
  }
  $scope.swipeHandler = _.debounce(function() {
    $scope.swiping = false
    $scope.parseSwipe()
    $scope.swipeString = ""
    $scope.$digest()
  }, 300)
  $scope.swiperListener = function() {
    $document.bind('keypress', function(event) {
      if (event.target == document.body) {
        event.preventDefault()
        $scope.swiping = true
        $scope.swipeString += String.fromCharCode(event.which)
        $scope.swipeHandler()
      }
    })
  }
  $scope.parseSwipe = function() {
    var processed_swipe = $scope.swipeString.split(';')[0].replace(/%B/g, '').replace(/\?/g, '').split('^')
    if (processed_swipe.length != 3) {
      processed_swipe = $scope.swipeString.split(';')[0].replace(/%B/g, '').replace(/\?/g, '').split('&')
    }
    if (processed_swipe.length != 3) {
      return
    }
    var lastname = String(processed_swipe[1].split('/')[0]).trim()
    var firstname = String(processed_swipe[1].split('/')[1].split(' ')[0]).trim()
    var cc_number = String(processed_swipe[0].trim())
    var exp_year = '20' + processed_swipe[2].charAt(0) + processed_swipe[2].charAt(1)
    var exp_month = processed_swipe[2].charAt(2) + processed_swipe[2].charAt(3)
    if (exp_month.indexOf('0') === 0) {
      exp_month = exp_month.split('')[1]
    }
    if (!$scope.isExpired(exp_month, exp_year)) {
      CheckoutService.data.payment.selected.cc_number = cc_number
      CheckoutService.data.payment.selected.cc_exp_year = exp_year
      CheckoutService.data.payment.selected.cc_exp_month = exp_month
      CheckoutService.data.payment.selected.method = "cryozonic_stripe"
      CheckoutService.data.shipping.name = firstname + " " + lastname
      CheckoutService.data.billing.name = firstname + " " + lastname
      $scope.shippingFormMode = "edit"
    } else {
      alert('The card is expired!')
    }
  }
  $scope.isExpired = function(month, year) {
    var date = new Date(),
      current_month = date.getMonth() + 1,
      current_year = date.getFullYear(),
      is_expired = false
    if (year < current_year) {
      is_expired = true
    } else if (year === current_year && month < current_month) {
      is_expired = true
    }
    return is_expired
  }
  $scope.swiperListener()
}]).filter('zeroToFree', function() {
  return function(input) {
    return (input == '$0.00') ? 'Free' : input;
  }
});
BetabrandApp.factory('CheckoutService', ['TrackingService', '$rootScope', '$http', '$q', '_', 'BannerService', '$location', '$window', 'ConfigService', 'CartService', '$log', function CheckoutService(TrackingService, $rootScope, $http, $q, _, BannerService, $location, $window, ConfigService, CartService, $log) {
  return {
    shippingIsSameAsBilling: true,
    saveCreditCard: true,
    usePaymentFallbackMethod: false,
    joinNewsletter: true,
    mostRecentPromise: $q.defer,
    data: {},
    successData: {},
    initialize: function() {
      var self = this
      var promise = null
      promise = self.submit({}, {
        initialize: true
      })
      promise.then(function(response) {
        $log.debug("[Checkout] Initialize successful", response)
      }, function(error) {
        $log.debug("[Checkout] Initialize failed", error)
      })
      return promise
    },
    addressHasRequiredData: function(address) {
      if (address.name && address["street-address"] && address["postal-code"] && address.country && address.region && address.locality)
        return true
      else
        return false
    },
    clearAddress: function(type) {
      var emptyAddress = {
        "name": "",
        "email": "",
        "tel": "",
        "company": "",
        "street-address": "",
        "street-address2": "",
        "postal-code": "",
        "locality": "",
        "country": "",
        "region": "",
        "region_id": "",
        "save_in_address_book": ""
      }
      if (type === "shipping") {
        this.data.shipping = emptyAddress
      }
      if (type === "billing") {
        this.data.billing = emptyAddress
      }
    },
    getCheckoutState: function() {
      var deferred = $q.defer()
      this.mostRecentPromise = deferred
      var self = this
      var request = $http({
        method: "GET",
        url: "/api/rest/sealthedeal/status"
      }).success(function(data) {
        self.setCheckoutState(data, deferred)
        deferred.resolve(data)
      }).error(function(data) {
        self.handleError(data)
        deferred.reject(data)
      })
      return deferred.promise
    },
    setCheckoutState: function(data, promise) {
      var self = this
      if (data.summary) {
        $rootScope.$broadcast('checkoutSuccess')
        if (data.summary.analytics) {
          TrackingService.track('checkoutSuccess', data.summary)
        }
        self.reset()
        if (data.redirectUrl) {
          $rootScope.$broadcast('viewLoading', "Redirecting to payment service to complete your order.")
          $window.location.href = data.redirectUrl
        } else {
          $location.url("/cart/checkout/success/" + data.orderIds + "/" + data.orderHashes)
        }
      } else if (!promise || promise == self.mostRecentPromise) {
        var paymentBackup = {}
        if (self.data.payment) {
          _.merge(paymentBackup, self.data.payment.selected)
        }
        if (data.saved_addresses)
          data.saved_addresses = _.values(data.saved_addresses)
        self.data = data
        if (self.data.payment) {
          self.data.payment.selected = _.extend(paymentBackup, self.data.payment.selected)
        }
        self.handleMessage(data)
      }
    },
    submit: function(type, options) {
      var deferred = $q.defer()
      this.mostRecentPromise = deferred
      var self = this
      var postData = {}
      var valid = true
      type = type || {}
      options = options || {}
      if (type.shippingAddress) {
        _.extend(postData, this.getShippingAddressData())
      }
      if (type.billingAddress && !this.shippingIsSameAsBilling) {
        _.extend(postData, this.getBillingAddressData())
      }
      if (type.shippingMethod) {
        _.extend(postData, this.getShippingMethodData())
      }
      if (type.payment) {
        _.extend(postData, this.getPaymentData())
      }
      _.extend(postData, options)
      if (postData.place && self.joinNewsletter == true) {
        _.extend(postData, {
          newsletter: true
        })
      }
      if (postData.place && !this.validate()) {
        deferred.reject()
      } else {
        var f = ""
        if ("Fingerprint" in window) {
          f = new Fingerprint().get()
        }
        _.extend(postData, {
          f: f
        })
        $log.debug("[Checkout] Submitting data", postData)
        var request = $http({
          method: "POST",
          url: "/api/rest/sealthedeal/",
          data: postData
        }).success(function(data) {
          var billing = self.getBillingAddressData()
          if (Object.keys(billing).length > 0) {
            TrackingService.track('identifyCustomer', {
              'displayName': billing.billing_address_name,
              'email': billing.billing_address_email
            })
          }
          CartService.getCartData()
          self.setCheckoutState(data, deferred)
          deferred.resolve(data)
        }).error(function(data, status) {
          self.handleError(data)
          self.getCheckoutState()
          CartService.getCartData()
          deferred.reject(data)
        })
      }
      return deferred.promise
    },
    validate: function() {
      return true
    },
    getShippingAddressData: function() {
      var self = this
      var shippingBilling = {}
      angular.forEach(self.data.shipping, function(value, key) {
        if (key == "region_id" && self.data.shipping.hasSubRegions)
          key = "region"
        shippingBilling["shipping_address_" + key] = value
        if (self.shippingIsSameAsBilling) {
          shippingBilling["billing_address_" + key] = value
        }
      })
      return shippingBilling
    },
    getBillingAddressData: function() {
      var self = this
      var billingAddress = {}
      angular.forEach(self.data.billing, function(value, key) {
        if (key == "region_id" && self.data.billing.hasSubRegions)
          key = "region"
        billingAddress["billing_address_" + key] = value
      })
      return billingAddress
    },
    getShippingMethodData: function() {
      var self = this
      return {
        shipping_method: self.data.shipping_method.selected
      }
    },
    getPaymentData: function() {
      var self = this
      var paymentData = {}
      angular.forEach(self.data.payment.selected, function(value, key) {
        paymentData["payment_" + key] = value
        if (key == "cc_number") {
          paymentData["payment_cc_type"] = self.getCardType(value)
        }
      })
      if (self.usePaymentFallbackMethod && self.data.payment.selected.fallbackMethod) {
        paymentData["payment_method"] = self.data.payment.selected.fallbackMethod
      }
      return paymentData
    },
    submitShippingAddress: function() {
      var deferred = $q.defer()
      var self = this
      var request = $http({
        method: "POST",
        url: "/api/rest/sealthedeal/",
        data: self.getShippingAddressData()
      }).success(function(data) {
        self.setCheckoutState(data)
        deferred.resolve(data)
      }).error(function(data) {
        self.handleError(data)
        deferred.reject(data)
      })
      return deferred.promise
    },
    submitBillingAddress: function() {
      var deferred = $q.defer()
      var self = this
      var request = $http({
        method: "POST",
        url: "/api/rest/sealthedeal/",
        data: self.getBillingAddressData()
      }).success(function(data) {
        self.setCheckoutState(data)
        deferred.resolve(data)
      }).error(function(data) {
        self.handleError(data)
        deferred.reject(data)
      })
      return deferred.promise
    },
    submitShippingMethod: function(options) {
      var self = this
      var deferred = $q.defer()
      this.mostRecentPromise = deferred
      var request = $http({
        method: "POST",
        url: "/api/rest/sealthedeal/",
        data: self.getShippingMethodData()
      }).success(function(data) {
        CartService.getCartData()
        self.setCheckoutState(data, deferred)
        deferred.resolve(data)
      }).error(function(data) {
        self.handleError(data)
        deferred.reject(data)
      })
      return deferred.promise
    },
    submitPaymentMethod: function(options) {
      var deferred = $q.defer()
      this.mostRecentPromise = deferred
      var self = this
      var request = $http({
        method: "POST",
        url: "/api/rest/sealthedeal/",
        data: self.getPaymentData()
      }).success(function(data) {
        self.setCheckoutState(data, deferred)
        deferred.resolve(data)
      }).error(function(data) {
        self.handleError(data)
        deferred.reject(data)
      })
      return deferred.promise
    },
    getCardType: function(number) {
      var self = this
      var cardType = false
      var cardTypes = {
        'VI': {
          card_name: 'Visa',
          re: /^4[0-9]{12}(?:[0-9]{3})?$/,
          id: 'visa'
        },
        'MC': {
          card_name: 'Master Card',
          re: /^5[1-5][0-9]{14}$/,
          id: 'mastercard'
        },
        'AE': {
          card_name: 'American Express',
          re: /^3[47][0-9]{13}$/,
          id: 'amex'
        },
        'DI': {
          card_name: 'Discover',
          re: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
          id: 'discover'
        }
      }
      angular.forEach(cardTypes, function(card, key) {
        if (number.match(card.re)) {
          cardType = key
        }
      })
      return cardType
    },
    deleteSavedCard: function(cardId) {
      var deferred = $q.defer()
      var self = this
      this.mostRecentPromise = deferred
      var request = $http({
        method: "DELETE",
        url: "/api/rest/savedcreditcards/delete/" + cardId,
      }).success(function(data) {
        self.getSavedCards().then(function(data) {
          deferred.resolve(data)
        }, function(data) {
          deferred.reject(data)
        })
      }).error(function(data) {
        self.handleError("Could not delete saved card")
        deferred.reject(data)
      })
      return deferred.promise
    },
    getSavedCards: function() {
      var deferred = $q.defer()
      var self = this
      this.mostRecentPromise = deferred
      var request = $http({
        method: "GET",
        url: "/api/rest/savedcreditcards/get",
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    getCheckoutSuccess: function(orders, hashes) {
      var deferred = $q.defer()
      var self = this
      var request = $http({
        method: "GET",
        url: "/api/rest/sealthedeal/success/" + orders + "/" + hashes
      }).success(function(data) {
        self.successData = data
        if (self.successData.orders) {
          self.successData.orderString = _.pluck(self.successData.orders, 'id').join()
        }
        deferred.resolve(data)
      }).error(function(data) {
        self.handleError(data)
        deferred.reject(data)
      })
      return deferred.promise
    },
    reset: function() {
      this.data = {}
      this.successData = {}
    },
    handleMessage: function(data) {
      if (data.message) {
        BannerService.showAlert(data.message)
      }
    },
    handleError: function(data) {
      BannerService.showError(data)
    }
  }
}])
BetabrandApp.controller('CheckoutSuccessController', ['$scope', 'CheckoutService', 'CartService', 'TrackingService', '$document', '$sce', '$q', '$log', '_', 'CustomerService', '$routeParams', 'ModalService', '$rootScope', 'PageService', function CheckoutController($scope, CheckoutService, CartService, TrackingService, $document, $sce, $q, $log, _, CustomerService, $routeParams, ModalService, $rootScope, PageService) {
  $scope.cart = CartService
  $scope.checkoutService = CheckoutService
  $scope.customerService = CustomerService
  $scope.orders = $routeParams.orders
  $scope._ = _
  $log.debug($routeParams)
  var trackingDeferred = $q.defer()
  TrackingService.setTrackingPromise(trackingDeferred.promise)

  function _initTracking(data) {
    trackingDeferred.resolve({
      'Source': 'Order Success Page'
    })
  }
  CheckoutService.getCheckoutSuccess($routeParams.orders, $routeParams.hashes).then(function(response) {
    $scope.$emit('viewLoaded')
    PageService.setBodyClass('home')
    PageService.setMicrodataItemType('CheckoutPage')
    _initTracking(response)
  }, function(error) {
    $scope.$emit('viewLoaded')
  })
  $scope.showReferralModal = function() {
    $rootScope.$broadcast('toggleModal')
    var productId = CheckoutService.successData.items ? _.first(CheckoutService.successData.items).id : ""
    ModalService.showModal({
      templateUrl: "/angular/app/modal/referrals/referral-modal.html",
      controller: "ReferralModalController",
      inputs: {
        productId: productId
      }
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
}])
BetabrandApp.directive('shippingMethod', ['CartService', function(CartService) {
  return {
    restrict: 'E',
    templateUrl: '/angular/app/checkout/shipping-method.html',
    replace: true,
    link: function($scope) {
      $scope.cart = CartService
    }
  }
}]);
BetabrandApp.controller('CmsController', ['$scope', 'CmsService', 'CustomerService', 'CartService', 'TrackingService', 'LookupService', '_', 'PageService', '$sce', function CmsController($scope, CmsService, CustomerService, CartService, TrackingService, LookupService, _, PageService, $sce) {
  $scope.templateUrl = LookupService.templateUrl
  $scope.pageId = LookupService.id
  $scope.customer = CustomerService
  CmsService.getCmsPage(LookupService.id).then(function(data) {
    $scope.data = data
    $scope.$emit('viewLoaded')
    PageService.setBodyClass(data.urlKey)
    PageService.setTitle(data.title)
    var microdataItemType;
    switch (data.urlKey) {
      case 'about':
        microdataItemType = 'AboutPage'
        break
      case 'contact':
        microdataItemType = 'ContactPage'
        break
      case 'shipping':
      case 'returns':
      case 'group-discounts':
      case 'gift-certificates':
      case 'bitcoin':
        microdataItemType = 'QAPage'
        break
    }
    PageService.setMicrodataItemType(microdataItemType)
  })
}])
BetabrandApp.factory('CmsService', ['$http', '$q', '$location', function CmsService($http, $q, $location) {
  return {
    getCmsPage: function(id) {
      var deferred = $q.defer()
      $http.get('/api/rest/cms/page/' + id).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
  }
}])
BetabrandApp.directive('colorselector', ['ProductService', '$rootScope', '$document', function(ProductService, $rootScope, $document) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/angular/app/colorselector/colorselector.html',
    scope: {
      product: "="
    },
    transclude: true,
    link: function(scope) {
      var colorProducts = {}
      scope.$watch('product.id', function(newVal, oldVal) {
        angular.forEach(scope.product.colorProducts, function(obj, id) {
          ProductService.getProduct(id).then(function(data) {
            colorProducts[id] = data
          })
        })
        scope.changeColor = function(id) {
          $document.scrollTo(angular.element(document.querySelector('body')), 0, 500).then(function() {
            scope.product = colorProducts[id]
          })
        }
      })
    }
  }
}]).filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function(a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if (reverse) filtered.reverse();
    return filtered;
  };
});
BetabrandApp.directive('comment', ["CommentsThreadService", "_", "$compile", "RecursionHelper", "$log", "CustomerService", "$location", "$anchorScroll", "$document", "$timeout", "$rootScope", function(CommentsThreadService, _, $compile, RecursionHelper, $log, CustomerService, $location, $anchorScroll, $document, $timeout, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/angular/app/comments/comment.html',
    replace: true,
    scope: {
      "comment": "=",
      "threadId": "=",
      "customer": "=",
      "thread": "=",
      "disableReply": "=",
      "replies": "=",
      "votes": "=",
      "highlights": "=",
    },
    compile: function(element) {
      return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn) {
        scope.reply = {}
        scope.directLink = false
        scope.CommentsThreadService = CommentsThreadService
        var search = $location.search()
        if (search.comment == scope.comment.id) {
          $location.search('comment', null)
          $timeout(function() {
            $document.scrollTo(iElement, 200, 400)
          }, 1000)
          scope.comment.directLink = true
        }
        var _submitReply = function(parentId) {
          var newReply = {
            threadId: scope.threadId,
            parent: parentId,
            body: scope.reply.body
          }
          var bodyBackup = scope.reply.body
          scope.reply.body = ""
          CommentsThreadService.create(newReply).then(function(response) {
            scope.replies.push(response)
          }, function(error) {
            scope.reply.body = bodyBackup
          })
        }
        scope.toggleReply = function(comment) {
          comment.showReplyForm = true
          CommentsThreadService.currentCommentIdBeingReplied = comment.id
          $timeout(function() {
            $document.scrollTo(angular.element(document.getElementById('reply-form-' + comment.id)), 200, 400).then(function() {
              if (!$rootScope.isMobile) {
                $timeout(function() {
                  angular.element(document.querySelector('.new-reply__input'))[0].focus()
                })
              }
            })
          })
        }
        scope.submitReply = function(parentId) {
          if (!CustomerService.data.loggedIn) {
            CustomerService.showLoginModal({
              "action": "comment"
            }).then(function() {
              _submitReply(parentId)
            })
          } else {
            _submitReply(parentId)
            scope.comment.showReplyForm = false
          }
        }
        scope.submitEdit = function(comment) {
          comment.body = comment.newbody
          comment.edit = false
          CommentsThreadService.edit(comment).then(function(response) {}, function(error) {
            scope.reply.body = bodyBackup
            comment.edit = true
          })
        }
        scope.toggleEdit = function(comment) {
          comment.edit = !comment.edit
          if (comment.edit) {
            comment.newbody = comment.body
            $timeout(function() {
              $document.scrollTo(angular.element(document.getElementById('edit-input-' + scope.comment.id)), 250, 400).then(function() {
                if (!$rootScope.isMobile) {
                  $timeout(function() {
                    angular.element(document.querySelector('.edit__input'))[0].focus()
                  })
                }
              })
            })
          }
        }
        scope.delete = function(comment) {
          console.log('Comment', comment);
          var deleteConfirmText = "Your comment will be deleted forever.";
          if ((typeof comment.user.id === null) || (comment.user.id != scope.customer.id)) {
            console.log('Deleting this comment');
            deleteConfirmText = "You are about to delete someone else's comment."
          }
          CommentsThreadService.delete(comment.id).then(function(response) {
            comment.body = "[DELETED]"
            comment.deleted = true
          }, function(error) {
            $log.debug("failed deleting comment. TODO: implement me.")
          })
        }
        scope.edit = function(comment) {
          CommentsThreadService.edit(comment).then(function(response) {
            var commentDOM = angular.element(angular.element(document.querySelector("#comment-" + commentId))[0])
            commentDOM.remove()
          }, function(error) {
            $log.debug("failed editing comment. TODO: implement me.")
          })
        }
        var _upvote = function(commentId, which) {
          CommentsThreadService.vote(commentId, which).then(function(response) {
            scope.votes.data = response
            var change = which == "down" ? -1 : 1;
            scope.comment.score += change;
          }, function(error) {
            $log.debug(error)
          })
        }
        scope.upvote = function(commentId, which) {
          if (!CustomerService.data.loggedIn) {
            CustomerService.showLoginModal({
              "action": "comment"
            }).then(function() {
              _upvote(commentId, which)
            })
          } else {
            _upvote(commentId, which)
          }
        }
      })
    }
  }
}])
BetabrandApp.directive('commentsThread', ["CommentsThreadService", "_", "CustomerService", "$log", "$timeout", "$document", "$rootScope", function(CommentsThreadService, _, CustomerService, $log, $timeout, $document, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/angular/app/comments/commentsThread.html',
    replace: true,
    scope: {
      "customer": "=",
      "threadId": "=",
      "highlights": "=",
      "defaultOrder": "="
    },
    link: function(scope, elm, attrs) {
      scope.comment = {
        body: ""
      }
      scope.reply = {}
      scope.votes = {
        data: []
      }
      scope.orderField = scope.defaultOrder ? scope.defaultOrder : "-date"
      scope.commentLimit = $rootScope.isMobile ? 8 : 20
      scope.commentCount = scope.commentLimit
      scope.isSubmitting = false
      CommentsThreadService.getThread(scope.threadId).then(function(response) {
        scope.thread = {
          "data": response,
          "currentCommentBeingReplied": false
        }
        $log.debug("success", response)
      }, function(err) {
        $log.debug("error", err)
      })
      CommentsThreadService.getVotes(scope.threadId).then(function(response) {
        scope.votes.data = response
      }, function(error) {
        $log.debug(error)
      })
      var _submitComment = function() {
        var newComment = {
          threadId: scope.threadId,
          body: scope.comment.body
        }
        scope.isSubmitting = true
        var bodyBackup = scope.comment.body
        scope.comment.body = ""
        CommentsThreadService.create(newComment).then(function(response) {
          scope.isSubmitting = false
          scope.thread.data.unshift(response)
          $timeout(function() {
            $document.scrollTo(angular.element(document.getElementById('comment-' + response.id)), 200, 400)
          }, 200)
        }, function(error) {
          scope.isSubmitting = false
          scope.comment.body = bodyBackup
        })
      }
      scope.submitComment = function() {
        if (!CustomerService.data.loggedIn) {
          CustomerService.showLoginModal({
            "action": "comment"
          }).then(function() {
            _submitComment()
          })
        } else {
          _submitComment()
        }
      }
      scope.order = function(field) {
        scope.orderField = field
      }
      scope.loadMore = function() {
        scope.commentCount += scope.commentLimit
      }
    }
  }
}]).filter('timeAgo', function() {
  return function(time) {
    var oldTime = new Date(time)
    var currentTime = new Date()
    var time = (currentTime - oldTime) / 1000
    var unit = "second"
    if (time >= 60) {
      unit = "minute"
      time = time / 60
      if (time >= 60) {
        unit = "hour"
        time = time / 60
        if (time >= 24) {
          unit = "day"
          time = time / 24
          if (time >= 7) {
            unit = "week"
            time = time / 7
            if (time >= 4) {
              unit = "month"
              time = time / 4
              if (time >= 12) {
                unit = "year"
                time = time / 12
              }
            }
          }
        }
      }
    }
    if (unit == "second" && time < 30)
      return "just now"
    time = Math.floor(time);
    if (time > 1) {
      unit = unit + "s"
    }
    return time + " " + unit + " ago"
  }
})
BetabrandApp.factory('CommentsThreadService', ['$http', '$q', '$log', 'TrackingService', function CommentsService($http, $q, $log, TrackingService) {
  var _doInlineMedia = function(comment) {
    if (!('body' in comment))
      return
    comment.body = comment.body.replace(/(<([^>]+)>)/ig, "")
    var hasUrls = comment.body.match(/http(s)?:\/\/[^\s]+/g) || []
    if (hasUrls.length) {
      angular.forEach(hasUrls, function(url) {
        var replacement = false
        var type = url.substr(url.length - 3, 3)
        var proxyUrl = "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&url=" + url
        switch (type) {
          case "gif":
            replacement = "<img class='gif' src='" + proxyUrl + "'>"
            break;
          case "jpg":
          case "png":
          case "jpeg":
            replacement = "<img class='" + type + "' src='" + proxyUrl + "'>"
            break;
        }
        if (!replacement)
          replacement = "<a href='" + url + "'>" + url + "</a>"
        if (replacement) {
          comment.body = comment.body.replace(url, replacement)
        }
      })
    }
    if ('replies' in comment) {
      _prepareData(comment.replies)
    }
  }
  var _prepareData = function(data) {
    if (typeof data != "object" || data == null)
      return
    if ('body' in data) {
      _doInlineMedia(data)
    } else {
      angular.forEach(data, function(comment) {
        _doInlineMedia(comment)
      })
    }
  }
  return {
    getComment: function(id) {
      var self = this
      var deferred = $q.defer()
      var request = $http({
        method: "GET",
        url: "/api/rest/comments/get/" + id
      }).success(function(data) {
        _prepareData(data)
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    getThread: function(threadId) {
      var self = this
      var deferred = $q.defer()
      var request = $http({
        method: "GET",
        url: "/api/rest/comments/thread/" + threadId
      }).success(function(data) {
        _prepareData(data)
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    create: function(comment) {
      $log.debug("creating comment", comment)
      var self = this
      var deferred = $q.defer()
      var request = $http({
        method: "POST",
        url: "/api/rest/comments/create/",
        data: comment
      }).success(function(data) {
        _prepareData(data)
        deferred.resolve(data)
        TrackingService.trackEvent('Participate', {
          'Participation Type': 'Comment',
          'Comment Depth': (comment && comment.parent > 0) ? 'Reply' : 'Top Level'
        })
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    delete: function(commentId) {
      $log.debug("Deleting comment", commentId)
      var self = this
      var deferred = $q.defer()
      var request = $http({
        method: "DELETE",
        url: "/api/rest/comments/delete/" + commentId
      }).success(function(data) {
        _prepareData(data)
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    vote: function(commentId, type) {
      $log.debug("voting on comment")
      var deferred = $q.defer()
      var request = $http({
        method: "POST",
        url: "/api/rest/comments/votes/create",
        data: {
          "commentId": commentId,
          "type": type
        }
      }).success(function(data) {
        _prepareData(data)
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    edit: function(comment) {
      $log.debug("editing comment", comment)
      var deferred = $q.defer()
      var request = $http({
        method: "PUT",
        url: "/api/rest/comments/update/" + comment.id,
        data: comment
      }).success(function(data) {
        _prepareData(data)
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    getVotes: function(threadId) {
      $log.debug("getting user votes")
      var deferred = $q.defer()
      var request = $http({
        method: "GET",
        url: "/api/rest/comments/votes/thread/" + threadId
      }).success(function(data) {
        _prepareData(data)
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    currentCommentIdBeingReplied: false
  }
}])
BetabrandApp.factory('ConfigService', ['$http', '$q', '$location', function($http, $q, $location) {
  function ConfigService() {
    var self = this
    self.getConfig = function(fields) {
      var deferred = $q.defer()
      var self = this
      $http.get('/api/rest/config?fields[]=' + fields.join("&fields[]=")).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
  }
  return new ConfigService();
}])
BetabrandApp.factory('CustomerService', ['$http', '$rootScope', '$facebook', '$log', '$q', '$kookies', 'TrackingService', '$location', 'BannerService', 'ModalService', '$upload', function($http, $rootScope, $facebook, $log, $q, $kookies, TrackingService, $location, BannerService, ModalService, $upload) {
  function CustomerService() {
    var self = this
    var dataDeferred = null
    var INIT = -1
    var lastLoginId = INIT
    self.initialized = false
    self.data = {}
    self.customerId = false
    self.facebookConnected = false
    self.newUser = true
    self.selectedAttributes = {}
    self.joinNewsletter = true

    function _updateData(newData) {
      self.data = newData
      self.customerId = newData.id
      TrackingService.track('updateCustomerData', self.data)
    }

    function _create(method, data) {
      var deferred = $q.defer()
      data = data || {};
      data.method = method
      if (self.joinNewsletter == true) {
        data.newsletter = true
      } else {
        data.newsletter = false
      }
      $http({
        method: "post",
        url: "/api/rest/auth/create/",
        data: data
      }).success(function(response) {
        self.getData(true).then(function(response) {
          TrackingService.track('createCustomer', method, response)
          deferred.resolve(response)
        })
      }).error(function(response) {
        deferred.reject(response)
        $log.error('create failed')
      })
      return deferred.promise
    }

    function _login(method, data) {
      var deferred = $q.defer()
      data = data || {};
      data.method = method
      if (method == "facebook" && self.joinNewsletter) {
        data.newsletter = true
      } else {
        delete data.newsletter
      }
      $http({
        method: "post",
        url: "/api/rest/auth/login/",
        data: data
      }).success(function(response) {
        self.getData(true).then(function(response) {
          TrackingService.track('loginCustomer', method, self.data)
          $kookies.remove('fbLogout', {
            path: '/'
          })
          deferred.resolve(response)
        })
      }).error(function(response) {
        deferred.reject(response)
        $log.error('login failed')
      })
      return deferred.promise
    }

    function _facebookLogout() {
      var deferred = $q.defer()
      $facebook.logout(function(response) {
        $log.debug(response)
        self.facebookConnected = false
        deferred.resolve(response)
      })
      return deferred.promise
    }

    function _getFacebookLoginStatus() {
      $facebook.getLoginStatus().then(function(response) {
        if (response.status == "connected") {
          self.facebookConnected = true
          $log.debug('facebook connected')
        }
      }, function(response) {
        self.facebookConnected = false
        $log.error('Facebook getLoginStatus error', response)
      });
    }
    self.getData = function(forceRefresh) {
      if (forceRefresh || !dataDeferred) {
        var deferred = $q.defer()
        dataDeferred = deferred
        $http({
          url: '/api/rest/auth/status',
          method: "get"
        }).success(function(response) {
          if (response.loggedIn) {
            var id = response.id
            $http.get('/api/rest/customers/' + id).success(function(response) {
              _updateData(response)
              if (lastLoginId != response.id && lastLoginId != INIT) {
                $rootScope.$broadcast('loggedIn')
              }
              lastLoginId = response.id
              deferred.resolve(response)
            }).error(function(response) {
              $log.error('CustomerService.getData fail:', response)
              deferred.reject(response)
            })
          } else {
            _updateData(response)
            if (lastLoginId && lastLoginId != INIT) {
              $rootScope.$broadcast('loggedOut')
            }
            lastLoginId = null
            deferred.resolve(response)
          }
        }).error(function(response) {
          $log.error('CustomerService.getAuthStatus fail:', response)
          deferred.reject(response)
        })
      }
      return dataDeferred.promise
    }
    self.emailCreateAccount = function(createAccountData) {
      return _create('email', createAccountData)
    }
    self.facebookLogin = function(loginData) {
      var deferred = $q.defer()
      loginData = loginData || {}
      if (!self.facebookConnected) {
        $facebook.login({
          'scope': 'email,user_birthday,user_likes,user_interests,user_location'
        }).then(function(response) {
          $log.debug(response)
          if (response.status == 'connected') {
            self.facebookConnected = true
            _login('facebook', loginData).then(function(data) {
              deferred.resolve(data)
            }, function(data) {
              deferred.reject(data)
            })
          } else {
            $log.error('facebook login failed')
            deferred.reject(response)
          }
        })
      } else {
        _login('facebook', loginData).then(function(data) {
          deferred.resolve(data)
        }, function(data) {
          deferred.reject(data)
        })
      }
      return deferred.promise
    }
    self.emailLogin = function(loginData) {
      return _login('email', loginData)
    }
    self.logout = function() {
      var deferred = $q.defer()
      $http({
        method: "delete",
        url: "/api/rest/auth/logout/"
      }).success(function(response) {
        self.getData(true).then(function(response) {
          deferred.resolve(response)
          var path = $location.path()
          if (path.indexOf('account') > -1) {
            $location.path('/')
          }
        }, function(error) {
          self.data = null
          deferred.reject(error)
        })
      }).error(function(response) {
        self.data = null
        $log.error("error: logout", response)
        deferred.reject(response)
      })
      $kookies.set('fbLogout', 1, {
        expires: 365,
        path: '/'
      })
      return deferred.promise
    }
    self.showLoginModal = function(inputs) {
      inputs = angular.extend({
        source: "account",
        action: "login",
        hasAccount: true,
        product: {}
      }, inputs)
      $rootScope.$broadcast('toggleModal')
      var deferred = $q.defer()
      ModalService.showModal({
        templateUrl: "/angular/app/modal/login/login-modal.html",
        controller: "LoginModalController",
        inputs: inputs
      }).then(function(modal) {
        modal.close.then(function(result) {
          deferred.resolve(result);
        })
      })
      return deferred.promise
    }
    self.getReferrals = function() {
      var deferred = $q.defer()
      $http.get('/angular/json/account-referrals.json').success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.getReferralsCf = function() {
      var deferred = $q.defer()
      $http.get('/angular/json/account-referrals-cf.json').success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.getAddresses = function(customerId) {
      var deferred = $q.defer()
      if (!customerId)
        return deferred.resolve([]);
      $http.get('/api/rest/customers/' + customerId + '/addresses').success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.updateAccount = function(id, data) {
      var deferred = $q.defer()
      $http({
        url: '/api/rest/customers/' + id,
        data: data,
        method: 'put'
      }).success(function(data) {
        self.getData().then(function(response) {
          deferred.resolve(response)
        })
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.updateAddress = function(id, data) {
      var deferred = $q.defer()
      $http({
        url: '/api/rest/customers/addresses/' + id,
        data: data,
        method: 'put'
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.addAddress = function(customerId, data) {
      var deferred = $q.defer()
      $http({
        url: '/api/rest/customers/' + customerId + '/addresses/',
        data: data,
        method: 'post'
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.deleteAddress = function(id) {
      var deferred = $q.defer()
      $http({
        url: '/api/rest/customers/addresses/' + id,
        method: 'delete'
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.resetPassword = function(email) {
      var deferred = $q.defer()
      var data = {
        "email": email
      }
      $http({
        url: '/api/rest/password/reset/',
        data: data,
        method: 'post'
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.updatePassword = function(password, confirmation, email, id, token, firstname, lastname) {
      var deferred = $q.defer()
      var data = {
        "password": password,
        "confirmation": confirmation,
        "id": id,
        "token": token
      }
      if (firstname)
        data.firstname = firstname
      if (lastname)
        data.lastname = lastname
      $http({
        url: '/api/rest/password/reset/' + id,
        data: data,
        method: 'put'
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    $rootScope.$on('checkoutSuccess', function() {
      self.getData(true)
    });
    self.updateVotedProducts = function(id) {
      dataDeferred.promise.then(function() {
        if (id && self.data.votedProducts) {
          self.data.votedProducts[id] = 1
        }
      })
    }
    $rootScope.$on('viewLoaded', function(event, current) {
      if (!self.initialized) {
        self.getData(true).then(function() {
          _getFacebookLoginStatus()
        })
        self.initialized = true;
      }
    })
    self.uploadImage = function(image) {
      var deferred = $q.defer()
      if (!image)
        return deferred.resolve({})
      $upload.upload({
        url: "/all/index/upload/",
        fields: {
          'title': self.data.firstname + " " + self.data.lastname,
        },
        file: image
      }).progress(function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name)
      }).success(function(data, status, headers, config) {
        $log.debug('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data))
        deferred.resolve(data)
      }).error(function(data) {
        deferred.resolve(data)
      })
      return deferred.promise
    }
    self.getData(true).then(function() {
      _getFacebookLoginStatus()
    })
  }
  return new CustomerService()
}])
BetabrandApp.directive('anchorScroll', ['$document', '$location', '$rootScope', '$timeout', function($document, $location, $rootScope, $timeout) {
  return {
    link: function(scope, elm) {
      var watch = scope.$watch(function() {
        if (elm[0].clientHeight > 0) {
          if (elm.attr("id") === $location.hash()) {
            $timeout(function() {
              $document.scrollTo(elm, 140, 400)
            }, 1000);
          }
          watch()
        }
      })
      $timeout(function() {
        watch()
      }, 10000);
      scope.cleanUp = function() {
        watch()
      }
      scope.$on('$destroy', scope.cleanUp)
    }
  }
}])
BetabrandApp.directive('categoryScrolled', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      scope.revealCount = 14;
      var raw = elem[0].children[3].children
      var checkBounds = function(evt) {
        var rectObject = raw[scope.revealCount - 12]
        if (typeof rectObject === "undefined") {
          rectObject = raw[raw.length - 1].getBoundingClientRect()
        } else {
          rectObject = rectObject.getBoundingClientRect()
        }
        if (($window.innerHeight > rectObject.bottom + 100) && (scope.revealCount <= raw.length)) {
          scope.revealCount = scope.revealCount + 12;
          scope.$eval(attrs.scrolled);
        }
      }
      angular.element($window).bind('scroll load', checkBounds)
      scope.$on('$destroy', function() {
        angular.element($window).unbind('scroll load')
      })
    }
  };
}]);
BetabrandApp.directive('compile', function($compile, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      $timeout(function() {
        $compile(elem.contents())(scope)
      })
    }
  }
});
BetabrandApp.directive('trackFocus', function($timeout, $parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind("blur", function(e) {
        $timeout(function() {
          var data = angular.element(e.target).data();
          if (data.$ngModelController)
            data.$ngModelController.hasFocus = false
        }, 0);
      });
      element.bind("focus", function(e) {
        $timeout(function() {
          var data = angular.element(e.target).data();
          if (data.$ngModelController)
            data.$ngModelController.hasFocus = true
        }, 0);
      })
    }
  }
});
BetabrandApp.directive('ngHref', ['TrackingService', function(TrackingService) {
  return {
    scope: {
      trackEvent: '@',
      trackData: '='
    },
    restrict: 'A',
    priority: 100,
    link: function(scope, elem, attrs) {
      if (scope.trackEvent) {
        elem.on("click", function() {
          var trackData = angular.isFunction(scope.trackData) ? scope.trackData() : scope.trackData
          TrackingService.trackEvent(scope.trackEvent, trackData)
        })
      }
    }
  }
}]);
BetabrandApp.directive('offClick', ['$document', '$timeout', function($document, $timeout) {
  function targetInFilter(target, filter) {
    if (!target || !filter) return false;
    var elms = angular.element(document.querySelectorAll(filter));
    var elmsLen = elms.length;
    for (var i = 0; i < elmsLen; ++i)
      if (elms[i].contains(target)) return true;
    return false;
  }
  return {
    restrict: 'A',
    scope: {
      offClick: '&',
      offClickIf: '&'
    },
    link: function(scope, elm, attr) {
      if (attr.offClickIf) {
        scope.$watch(scope.offClickIf, function(newVal, oldVal) {
          if (newVal && !oldVal) {
            $timeout(function() {
              $document.on('click', handler);
            });
          } else if (!newVal) {
            $document.off('click', handler);
          }
        });
      } else {
        $document.on('click', handler);
      }
      scope.$on('$destroy', function() {
        $document.off('click', handler);
      });
      elm.on('$destroy', function() {
        $document.off('click', handler);
      });

      function handler(event) {
        if (event.pageX == 0 && event.pageY == 0) return;
        var target = event.target || event.srcElement;
        if (!(elm[0].contains(target) || targetInFilter(target, attr.offClickFilter))) {
          scope.$apply(scope.offClick());
        }
      }
    }
  };
}]);
BetabrandApp.directive('recompile', function($compile, $parse) {
  return {
    scope: true,
    compile: function(el) {
      var template = getElementAsHtml(el)
      return function link(scope, $el, attrs) {
        var stopWatching = scope.$parent.$watch(attrs.recompile, function(_new, _old) {
          if (!_new || _new === _old) {
            return
          }
          var newEl = $compile(template)(scope.$parent)
          $el.replaceWith(newEl)
          stopWatching()
          scope.$destroy()
        })
      }
    }
  }

  function getElementAsHtml(el) {
    return angular.element('<recompile></recompile>').append(el.clone()).html()
  }
})
BetabrandApp.directive('scrollPosition', ['$window', function($window) {
  return {
    scope: {
      scroll: '=scrollPosition'
    },
    link: function(scope, element, attrs) {
      var windowEl = angular.element($window)
      var handler = function() {
        scope.scroll = windowEl.scrollTop
      }
      windowEl.on('scroll', scope.$apply.bind(scope, handler))
      handler()
    }
  }
}])
BetabrandApp.directive('sizingChart', function() {
  return {
    restrict: 'E',
    templateUrl: '/angular/app/directives/sizing-chart.html',
    replace: true,
    scope: {
      unit: "@"
    },
    link: function(scope, elm, attrs) {
      scope.title = attrs.title
      scope.rowLabels = attrs.rowLabels.split('|')
      scope.columnLabels = attrs.columnLabels.split('|')
      scope.rows = []
      scope.count = parseInt(attrs.size)
      String.prototype.toCamelCase = function() {
        return this.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
          if (p2) return p2.toUpperCase();
          return p1.toLowerCase();
        });
      };
      for (var i = 0; i < scope.rowLabels.length; i++) {
        var val = scope.rowLabels[i].toLowerCase() + 'Values'
        val = val.toCamelCase()
        var vals = attrs[val].split('|')
        scope.count = (vals.length > scope.count) ? vals.length : scope.count
        scope.rows.push({
          label: scope.rowLabels[i],
          values: vals
        })
      }
    }
  }
}).filter('measurement', function() {
  return function(value, unit) {
    if (unit !== 'cm') {
      return value + '"'
    }
    if (value.search('-') > -1) {
      var parts = value.split('-')
      for (var i = 0; i < parts.length; i++) {
        parts[i] = Math.floor(parts[i] * 2.54)
      }
      return parts.join('-') + 'cm'
    } else {
      return Math.floor(value * 2.54) + 'cm'
    }
  }
})
BetabrandApp.directive('submitIdea', ['ModalService', function(ModalService) {
  return {
    template: '<a class="submit-idea Submit" href="/submission/">{{linkText}}</a>',
    replace: true,
    link: function(scope, elm, attrs) {
      scope.linkText = attrs.linkText ? attrs.linkText : 'Submit a Design'
      scope.showIdeaModal = function($event) {
        $event.preventDefault();
        ModalService.showModal({
          templateUrl: "/angular/app/modal/submit-idea/idea-modal.html",
          controller: "IdeaModalController"
        }).then(function(modal) {
          modal.close.then(function(result) {})
        })
      }
    }
  };
}]);
BetabrandApp.directive('bbVideo', ['$q', 'TrackingService', function($q, TrackingService) {
  var init = false
  var youTubeIframeAPIReady = $q.defer()

  function initYTListener() {
    init = true
    window.onYouTubeIframeAPIReady = function() {
      youTubeIframeAPIReady.resolve()
    }
    var j = document.createElement("script"),
      f = document.getElementsByTagName("script")[0]
    j.src = "//www.youtube.com/iframe_api"
    j.async = true
    f.parentNode.insertBefore(j, f)
  }
  return {
    restrict: 'E',
    replace: true,
    scope: {
      name: '@',
      description: '@',
      url: '@',
      play: '='
    },
    template: '<div class="video-wrapper" itemscope itemtype="https://schema.org/VideoObject"><meta itemprop="name" content="{{name}}"/><meta itemprop="url" content="{{url}}"/><meta itemprop="description" content="{{description}}"/><iframe ng-src="{{fixedURL}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function(scope, elem, attrs) {
      scope.fixedURL = fixUrl(scope.url)
      if (!init)
        initYTListener()
      youTubeIframeAPIReady.promise.then(function() {
        if (scope.play)
          scope.player.playVideo()
        var iFrame = elem.find('iframe')
        if (iFrame && iFrame.length) {
          scope.player = new YT.Player(iFrame[0], {
            events: {
              onStateChange: onPlayerStateChange,
              onError: onPlayerError
            }
          })
        }
      })

      function onPlayerStateChange(e) {
        if (e["data"] == YT.PlayerState.PLAYING)
          setTimeout(onPlayerPercent, 1000, e["target"])
        var video_data = e.target["getVideoData"](),
          value = video_data.video_id + ':' + video_data.title
        if (e["data"] == YT.PlayerState.PLAYING && scope.play == false) {
          TrackingService.trackEvent('Play Video', {
            'category': 'Video',
            'label': 'YouTube',
            'value': value
          })
          if (!scope.play) {
            scope.play = true
            scope.$digest()
          }
        }
        if (e["data"] == YT.PlayerState.PAUSED) {
          TrackingService.trackEvent('Pause Video', {
            'category': 'Video',
            'label': 'YouTube',
            'value': value
          })
          if (scope.play) {
            scope.play = false
            scope.$digest()
          }
        }
      }

      function onPlayerError(e) {
        TrackingService.trackEvent('Video Error', {
          'category': 'Video',
          'label': 'YouTube',
          'value': e["target"]["src"] + "-" + e["data"]
        })
      }

      function onPlayerPercent(e) {
        if (e["getPlayerState"]() == YT.PlayerState.PLAYING) {
          var t = e["getDuration"]() - e["getCurrentTime"]() <= 1.5 ? 1 : (Math.floor(e["getCurrentTime"]() / e["getDuration"]() * 4) / 4).toFixed(2)
          if (!e["lastP"] || t > e["lastP"]) {
            var video_data = e["getVideoData"](),
              label = video_data.video_id + ':' + video_data.title
            e["lastP"] = t
            TrackingService.trackEvent('Percent Video Played', {
              'category': 'Video',
              'label': label,
              'value': t * 100 + "%"
            })
          }
          e["lastP"] != 1 && setTimeout(onPlayerPercent, 1000, e)
        }
      }

      function fixUrl(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
        var match = url.match(regExp)
        if (!match) {
          if (url && url.length == 11) {
            url = '//www.youtube.com/embed/' + videoId + '?rel=0&amp;showinfo=0&amp;enablejsapi=1'
          }
        } else {
          if (url.indexOf('enablejsapi=') === -1)
            url += (url.indexOf('?') === -1 ? '?' : '&') + 'enablejsapi=1'
          if (url.indexOf('rel=') === -1)
            url += (url.indexOf('?') === -1 ? '?' : '&') + 'rel=0'
          if (url.indexOf('showinfo=') === -1)
            url += (url.indexOf('?') === -1 ? '?' : '&') + 'showinfo=0'
        }
        return url
      }
      scope.$watch('play', function(newValue) {
        if (scope.player) {
          if (newValue)
            scope.player.playVideo()
          else
          if (typeof scope.player.pauseVideo == 'function') {
            scope.player.pauseVideo()
          }
        }
      })
    }
  }
}]).filter('videoDefaultImage', function($sce) {
  return function(videoUrl) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    var match = videoUrl.match(regExp)
    if (match && match[7].length == 11) {
      var videoId = match[7]
      videoUrl = '//img.youtube.com/vi/' + videoId + '/default.jpg'
    }
    return $sce.trustAsResourceUrl(videoUrl)
  }
})
BetabrandApp.directive("whenScrolled", function($window) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var raw = elem[0]
      var checkBounds = function(evt) {
        var rectObject = raw.getBoundingClientRect()
        if ($window.innerHeight > rectObject.bottom + 100) {
          scope.loading = true
          scope.$apply(attrs.whenScrolled)
        }
      }
      angular.element($window).bind('scroll load', checkBounds)
      scope.$on('$destroy', function() {
        angular.element($window).unbind('scroll load')
      })
    }
  }
})
BetabrandApp.directive('xfbml', ['$facebook', function($facebook) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      attributes.$observe('href', function() {
        $facebook.parse(element.parent()[0])
      })
    }
  }
}]);
BetabrandApp.controller('DivvyController', ['$scope', '$timeout', function($scope, $timeout) {
  $timeout(function() {
    $scope.$emit('viewLoaded')
  }, 1000);
}])
BetabrandApp.controller('FooterController', ['$scope', '$rootScope', 'CartService', 'TrackingService', 'NewsletterService', 'FooterService', function FooterController($scope, $rootScope, CartService, TrackingService, NewsletterService, FooterService) {
  $scope.footerNewsletterForm = {}
  $scope.data = {
    hours: null
  }
  var self = this
  self.initialized = false;
  $rootScope.$on('viewLoaded', function(event, current) {
    if (!self.initialized) {
      FooterService.getStoreHours().then(function(data) {
        $scope.data.hours = data
      })
    }
  })
  $scope.submitEmail = function(email) {
    var data = {
      email: email,
      source: 'Footer Signups',
      incentivized: false,
    }
    NewsletterService.signup(data).then(function(response) {
      $scope.successMessage = 'Thank you for signing up!'
    }, function(error) {
      $scope.errorMessage = error.messages.error[0].message
      $timeout(function() {
        $scope.errorMessage = false
      }, 4000);
    })
  }
}])
BetabrandApp.factory('FooterService', ['$http', '$q', '$location', function($http, $q, $location) {
  function FooterService() {
    var self = this
    self.getStoreHours = function() {
      var deferred = $q.defer()
      var self = this
      $http.get('/api/rest/cms/block/identifier/store_hours').success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
  }
  return new FooterService()
}]);
BetabrandApp.directive('addressForm', ["$http", "_", "CustomerService", "AddressFormService", function($http, _, CustomerService, AddressFormService) {
  return {
    scope: {
      model: "=modelName",
      formName: "@",
      mode: "=mode",
      loggedIn: "=",
      submitMethod: "&",
      deleteMethod: "&",
      shippingAddressIsSaved: "=?",
      cancelMethod: "&?",
      accountAddress: "@?",
      showErrors: "=?",
      useForBilling: "="
    },
    restrict: 'E',
    templateUrl: '/angular/app/forms/address-form.html',
    link: function(scope, iElm, iAttrs, controller) {
      scope.regions = {}
      scope.subRegions = false
      scope.modelBackup = {}
      if (!scope.mode) {
        scope.mode = "default"
      } else {
        scope.initialState = scope.mode
      }
      scope.submit = function() {
        if (scope[scope.formName].$valid) {
          scope.submitMethod()
          scope.mode = "preview"
          scope[scope.formName].$submitted = false
        }
      }
      scope.edit = function() {
        scope.modelBackup = {}
        scope.shippingAddressIsSaved = false
        _.extend(scope.modelBackup, scope.model)
        scope.updateSubregions()
        scope.mode = "edit"
      }
      scope.delete = function() {
        if (typeof scope.deleteMethod == "function")
          scope.deleteMethod()
        scope.model.hide = true
      }
      scope.cancel = function($event) {
        scope.model = {}
        _.extend(scope.model, scope.modelBackup);
        scope.mode = "preview"
        scope.shippingAddressIsSaved = true
        scope.cancelMethod()
        $event.preventDefault()
      }
      scope.updateSubregions = function() {
        if (!scope.model)
          return
        var country
        if (scope.model && scope.model.country) {
          country = _.find(scope.regions, {
            country_id: scope.model.country
          })
        }
        if (country && country.regions.length > 0) {
          scope.subRegions = country.regions
          scope.model.hasSubRegions = true
        } else {
          scope.subRegions = false
          scope.model.hasSubRegions = false
        }
      }
      scope.updateRegion = function(regionId) {
        if (scope.subRegions[regionId - 1]) {
          scope.model.region = scope.subRegions[regionId - 1].name
        } else {
          scope.model.region = null
        }
      }
      scope.checkPostalCode = function() {
        if (scope.model.country !== "US")
          return
        AddressFormService.getGeocode(scope.model['postal-code']).then(function(data) {
          if (data.locality)
            scope.model['locality'] = data.locality
          if (data.state) {
            var region = _.where(scope.subRegions, {
              "name": data.state
            })[0]
            region.selected = true
            scope.model.region_id = region.region_id
          }
        });
      }
      $http({
        method: "GET",
        url: "/api/rest/sealthedeal/regions/list/"
      }).success(function(data) {
        scope.regions = data.regions
        scope.updateSubregions()
      }).error(function(data) {})
      scope.$watch('model', function(model) {
        if (model !== undefined && scope.model && !scope.model.country) {
          scope.model.country = "US"
        }
        scope.updateSubregions()
      })
    }
  }
}])
BetabrandApp.factory('AddressFormService', ['$http', '$q', '_', function AddressFormService($http, $q, _) {
  return {
    getGeocode: function(postalCode) {
      var deferred = $q.defer()
      var self = this
      var request = $http({
        method: "GET",
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + postalCode
      }).success(function(data) {
        var retData = {}
        angular.forEach(data.results, function(result, index) {
          var country = _.where(result.address_components, {
            "types": ["country", "political"]
          })[0].long_name
          if (country == "United States") {
            retData.state = _.where(result.address_components, {
              "types": ["administrative_area_level_1", "political"]
            })[0].long_name
            retData.locality = _.where(result.address_components, {
              "types": ["locality", "political"]
            })[0].long_name
          }
        })
        deferred.resolve(retData)
      })
      return deferred.promise
    }
  }
}])
BetabrandApp.directive('checkoutAddressForm', ["$http", "_", "AddressFormService", function($http, _, AddressFormService) {
  return {
    scope: {
      model: "=modelName",
      formName: "@",
      mode: "=mode",
      showErrors: "=?",
      shippingAddressIsSaved: "=shippingAddressIsSaved"
    },
    restrict: 'E',
    templateUrl: '/angular/app/forms/checkout-address-form.html',
    link: function(scope, iElm, iAttrs, controller) {
      scope.regions = {}
      scope.subRegions = false
      scope.modelBackup = {}
      if (!scope.mode) {
        scope.mode = "default"
      } else {
        scope.initialState = scope.mode
      }
      scope.edit = function() {
        scope.mode = "edit"
        scope.shippingAddressIsSaved = false
      }
      scope.updateSubregions = function() {
        if (!scope.model)
          return
        var country
        if (scope.model && scope.model.country) {
          country = _.find(scope.regions, {
            country_id: scope.model.country
          })
        }
        if (country && country.regions.length > 0) {
          scope.subRegions = country.regions
          scope.model.hasSubRegions = true
        } else {
          scope.subRegions = false
          scope.model.hasSubRegions = false
        }
      }
      scope.updateRegion = function(regionId) {
        if (scope.subRegions[regionId - 1]) {
          scope.model.region = scope.subRegions[regionId - 1].name
        } else {
          scope.model.region = null
        }
      }
      scope.checkPostalCode = function() {
        if (scope.model.country !== "US")
          return
        AddressFormService.getGeocode(scope.model['postal-code']).then(function(data) {
          if (data.locality)
            scope.model['locality'] = data.locality
          if (data.state) {
            var region = _.where(scope.subRegions, {
              "name": data.state
            })[0]
            region.selected = true
            scope.model.region_id = region.region_id
          }
        });
      }
      $http({
        method: "GET",
        url: "/api/rest/sealthedeal/regions/list/"
      }).success(function(data) {
        scope.regions = data.regions
        scope.updateSubregions()
      }).error(function(data) {})
      scope.$watch('model', function(model) {
        if (model !== undefined && scope.model && !scope.model.country) {
          scope.model.country = "US"
        }
        scope.updateSubregions()
      })
    }
  }
}])
BetabrandApp.directive('gallery', ['$window', 'hotkeys', '_', 'ImageService', '$timeout', function($window, hotkeys, _, ImageService, $timeout) {
  return {
    restrict: 'E',
    scope: {
      media: '=media'
    },
    replace: true,
    templateUrl: "/angular/app/gallery/gallery.html",
    link: function(scope, elm, attrs) {
      scope.gallery = elm[0]
      scope.galleryWidth = scope.gallery.clientWidth
      angular.element($window).bind('resize', function() {
        scope.galleryWidth = scope.gallery.clientWidth
        scope.calcThumbnails()
      })
      angular.element(document).ready(function() {
        scope.galleryWidth = scope.gallery.clientWidth
        scope.calcThumbnails()
        scope.loadMedia()
      });
      scope.currentIndex = 0
      scope.lastSlide = false
      scope.thumbnailPos = 0
      scope.myTransform = ""
      scope.formatThumbnails = ImageService.lazyFormatSrc
      scope.$watch('media[0].url', function(newVal, oldVal) {
        scope.currentIndex = 0
        if (oldVal !== newVal) {
          scope.loadMedia()
        }
      })
      scope.loadMedia = function() {
        var gm = _.filter(angular.copy(scope.media), function(media) {
          return media.type == 'image' || media.videoType == 'gallery'
        })
        scope.galleryMedia = gm
        scope.formatImages = ImageService.lazyFormatSrc
        scope.calcThumbnails()
        $timeout(function() {
          scope.checkThumbnailPos()
        });
      }
      scope.calcThumbnails = function() {
        scope.myThumbnailWidth = (scope.galleryWidth / 10.79411764705) + 'px'
        scope.myThumbnailHeight = ((scope.galleryWidth / 10.79411764705) * 0.5852) + 'px'
      }
      scope.moveThumbnails = function(amount) {
        scope.myTransform = '-' + (amount) + 'px'
      }
      scope.checkThumbnailPos = function() {
        var galleryLeftPos = scope.gallery.getBoundingClientRect().left
        var activeThumbnail = angular.element(document.querySelector('.index-' + scope.currentIndex))[0]
        var activeThumbnailRightPos = activeThumbnail.getBoundingClientRect().right
        var activeThumbnailLeftPos = activeThumbnail.getBoundingClientRect().left
        var lastThumbnail = angular.element(document.querySelector('.index-' + (scope.galleryMedia.length - 1)))[0]
        var lastThumbnailRightPos = lastThumbnail.getBoundingClientRect().right
        var firstThumbnail = angular.element(document.querySelector('.index-0'))[0]
        var firstThumbnailLeftPos = firstThumbnail.getBoundingClientRect().left
        if (activeThumbnailRightPos > (scope.gallery.clientWidth + galleryLeftPos)) {
          if ((lastThumbnailRightPos - activeThumbnailLeftPos) < scope.gallery.clientWidth) {
            scope.thumbnailPos = scope.thumbnailPos + ((lastThumbnailRightPos - scope.gallery.clientWidth) - galleryLeftPos)
            scope.moveThumbnails(scope.thumbnailPos)
          } else {
            scope.thumbnailPos = scope.thumbnailPos + scope.gallery.clientWidth
            scope.moveThumbnails(scope.thumbnailPos)
          }
        } else if (activeThumbnailLeftPos < galleryLeftPos) {
          if ((activeThumbnailRightPos - firstThumbnailLeftPos) < scope.gallery.clientWidth) {
            scope.thumbnailPos = 0
            scope.moveThumbnails(scope.thumbnailPos)
          } else {
            scope.thumbnailPos = scope.thumbnailPos - scope.gallery.clientWidth
            scope.moveThumbnails(scope.thumbnailPos)
          }
        }
      }
      scope.syncPhoto = function(index) {
        pauseVideo()
        scope.currentIndex = index
        scope.checkThumbnailPos()
      }
      scope.nextPhoto = function() {
        if (scope.currentIndex != scope.galleryMedia.length - 1) {
          pauseVideo()
          scope.currentIndex++
          scope.checkThumbnailPos()
        }
      }
      scope.prevPhoto = function() {
        if (scope.currentIndex != 0) {
          pauseVideo()
          scope.currentIndex--
          scope.checkThumbnailPos()
        }
      }

      function pauseVideo() {
        var current = scope.galleryMedia[scope.currentIndex]
        if (current && current.type == 'video') {
          current.play = false
        }
      }
      hotkeys.bindTo(scope).add({
        combo: 'right',
        description: 'Next Photo',
        callback: function() {
          scope.nextPhoto()
        }
      }).add({
        combo: 'left',
        description: 'Prev Photo',
        callback: function() {
          scope.prevPhoto()
        }
      })
      scope.$on("$destroy", function() {
        angular.element($window).unbind('resize')
      })
    }
  }
}])
BetabrandApp.directive('fireCart', ['CartService', '$rootScope', '$interval', '$timeout', function(CartService, $rootScope, $interval, $timeout) {
  return {
    restrict: 'E',
    templateUrl: '/angular/app/header/fire-cart.html',
    replace: true,
    scope: {},
    link: function(scope, $document) {
      scope.cart = CartService
      scope.fireCartFlames = CartService.fireCartFlames
      scope.fireCartChug = CartService.fireCartChug
      scope.fireCartDrive = CartService.fireCartDrive
      scope.doChug = function() {
        if (scope.fireCartFlames.activated || !scope.cart || !scope.cart.data || !scope.cart.data.items || scope.cart.data.items.length == 0) {
          $timeout(scope.doChug, 5000)
          return
        }
        scope.fireCartChug.activated = true
        $timeout(function() {
          scope.fireCartChug.activated = false
          var seconds = Math.random() * 5
          $timeout(scope.doChug, Math.floor((10 + seconds) * 1000))
        }, 5000);
      }
    }
  }
}])
BetabrandApp.controller('HeaderController', ['$scope', '$location', '$window', '$document', '$rootScope', '$sce', '$timeout', 'CartService', 'TrackingService', 'CustomerService', 'HeaderService', 'ProductService', 'SearchService', '_', 'ModalService', 'ConfigService', function HeaderController($scope, $location, $window, $document, $rootScope, $sce, $timeout, CartService, TrackingService, CustomerService, HeaderService, ProductService, SearchService, _, ModalService, ConfigService) {
  var self = this
  self.initialized = false
  $scope.cart = CartService
  $scope.customer = CustomerService
  $scope.header = HeaderService
  $scope.data = {}
  $rootScope.$on('viewLoaded', function(event, current) {
    if (!self.initialized) {
      HeaderService.getMenus().then(function(data) {
        var menus = []
        angular.forEach(data.menus[0], function(index, key) {
          menus[key] = index
          menus[key].label = index.name.toLowerCase().replace("'", '')
        })
        $scope.data.menus = menus
        $scope.data.thinkTankContests = data.thinkTankContests ? data.thinkTankContests[0] : null
        $timeout(function() {
          $scope.setUpMenus()
          HeaderService.menus = $scope.data.menus
        });
        if (data.categoryProducts) {
          $scope.data.mens = data.categoryProducts[0].mens
          $scope.data.womens = data.categoryProducts[0].womens
          $scope.data.collections = data.categoryProducts[0].collections
          $scope.data.thinktank = data.categoryProducts[0].thinktank
          $scope.data.crowdfunding = data.categoryProducts[0].crowdfunding
        }
      })
      ConfigService.getConfig(["homepage"]).then(function(data) {
        $scope.homepage = data.config.homepage
      })
      self.initialized = true;
    }
  })
  $scope.toggleCart = function() {
    CartService.showCart = !CartService.showCart
  }
  $scope.toggleMobileMenu = function() {
    HeaderService.showMobileMenu = !HeaderService.showMobileMenu
  }
  $scope.toggleSearch = function() {
    SearchService.showSearch = !SearchService.showSearch
  }
  $scope.mouseEnterMenu = function(index) {
    $scope.toggleMenu(index, true)
  }
  $scope.mouseLeaveMenu = function(index) {
    $scope.toggleMenu(index, false)
  }
  $scope.closeMenus = function() {
    var allMenus = document.getElementById('header').getElementsByClassName('header-nav-item');
    var openElements = document.getElementById('header').getElementsByClassName('open');
    if (openElements.length > 0) {
      openElements[0].focus();
      _.each(allMenus, function(menuItem) {
        menuItem.classList.remove('open');
      });
    }
  }
  $scope.checkFocus = function(direction) {
    var focusedElement = document.activeElement,
      parentCategory = focusedElement.closest('.header-nav-item'),
      allMenus = document.getElementById('header').getElementsByClassName('header-nav-item'),
      categoryMenu = parentCategory.querySelectorAll('a,button'),
      filteredMenu = [];
    _.each(categoryMenu, function(menuItem) {
      if ((menuItem.tabIndex !== -1) && (!menuItem.classList.contains('product__link')) && (!menuItem.classList.contains('vote-btn'))) {
        filteredMenu.push(menuItem)
      };
    });
    var closeMenus = function() {
      _.each(allMenus, function(menuItem) {
        menuItem.classList.remove('open');
      });
    };
    closeMenus();
    parentCategory.classList.add('open');
    if (direction === 'forward') {
      if (document.activeElement === filteredMenu[filteredMenu.length - 1]) {
        closeMenus();
      };
    } else {
      if (document.activeElement === filteredMenu[0]) {
        closeMenus();
        $timeout(function() {
          var matchingIndex;
          _.each(allMenus, function(menuItem, i) {
            if (parentCategory === menuItem) {
              matchingIndex = i;
            }
          });
          if (matchingIndex > 0) {
            allMenus[matchingIndex - 1].classList.add('open');
          };
        });
      };
    };
  }
  $scope.toggleMenu = _.debounce(function(index, open) {
    $scope.setUpMenus()
    $scope.data.menus[index].open = open
    $scope.$digest()
  }, 200)
  $scope.setUpMenus = function() {
    angular.forEach($scope.data.menus, function(menu, key) {
      menu.open = false
    })
  }
  $rootScope.$on('$locationChangeStart', $scope.setUpMenus)
  $scope.showBenefitsModal = function() {
    ModalService.showModal({
      templateUrl: "/angular/app/modal/account-benefits/benefits-modal.html",
      controller: "BenefitsModalController",
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
}])
BetabrandApp.factory('HeaderService', ['$http', '$q', '$location', function($http, $q, $location) {
  function HeaderService() {
    var self = this
    self.getMenus = function(id) {
      var deferred = $q.defer()
      var self = this
      $http.get('/api/rest/header/').success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.getPromoBar = function() {
      var deferred = $q.defer()
      var self = this
      $http.get('/api/rest/cms/block/identifier/specials').success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
  }
  return new HeaderService()
}]);
BetabrandApp.controller('MobileNavController', ['$scope', 'CartService', 'TrackingService', 'CustomerService', 'SearchService', 'HeaderService', function MobileNavController($scope, CartService, TrackingService, CustomerService, SearchService, HeaderService) {
  $scope.cart = CartService
  $scope.customer = CustomerService
  $scope.HeaderService = HeaderService
  $scope.menuItemToggle = function(item) {
    angular.forEach(HeaderService.menus, function(menu) {
      if (menu.name == item) {
        menu.open = !menu.open
      } else {
        menu.open = false
      }
    })
  }
  $scope.toggleCart = function() {
    CartService.showCart = !CartService.showCart
  }
  $scope.toggleMobileMenu = function() {
    HeaderService.showMobileMenu = !HeaderService.showMobileMenu
  }
  $scope.toggleSearch = function() {
    HeaderService.showMobileMenu = false
    SearchService.showSearch = !SearchService.showSearch
  }
}])
BetabrandApp.controller('HomepageController', ['$scope', '$filter', '$q', 'CategoryService', 'ProductService', 'CartService', 'TrackingService', 'LookupService', '_', '$window', '$timeout', '$location', 'PageService', '$route', 'OptimizelyService', 'ModelCitizenService', '$rootScope', 'HomepageService', function HomepageController($scope, $filter, $q, CategoryService, ProductService, CartService, TrackingService, LookupService, _, $window, $timeout, $location, PageService, $route, OptimizelyService, ModelCitizenService, $rootScope, HomepageService) {
  var body = document.body
  $scope.cart = CartService
  $scope.templateUrl = LookupService.templateUrl
  $scope._ = _
  $scope.collectionLogo = false
  $scope.crosssells = []
  $scope.carouselCount = 1
  $scope.showCarousel = false
  $scope.filterSorter = {
    selectedFilter: {
      gender: "!!",
      classification: "!!",
      subClassification: "!!",
      color: "!!"
    },
    selectedFilterLabels: {
      gender: "!!",
      classification: "!!",
      subClassification: "!!",
      color: "!!"
    },
    selectedSorter: "position",
    sortReverse: true
  }
  var category = {}
  $scope.classifications = {}
  var trackingDeferred = $q.defer()
  TrackingService.setTrackingPromise(trackingDeferred.promise)
  $scope.linkMap = {
    "pants": {
      mens: "/mens/pants.html",
      womens: "/womens/pants.html"
    },
    "sweaters": {
      mens: "/mens/sweaters.html",
      womens: "/womens/sweaters.html"
    },
    "jackets": {
      mens: "/mens/jackets.html",
      womens: "/womens/outerwear.html"
    },
    "skirts": {
      womens: "/womens/skirts.html"
    },
    "blazers": {
      mens: "/mens/jackets.html",
      womens: "/womens/outerwear.html"
    },
    "dresses": {
      womens: "/womens/dresses.html"
    },
    "shirts": {
      mens: "/mens/shirts.html",
      womens: "/womens/tops.html"
    },
    "shoes": {
      mens: "/mens/shoes.html",
      womens: "/womens/more.html?classification=shoes"
    },
    "jeans": {
      mens: "/mens/pants.html?classification=jeans",
      womens: "/womens/pants.html?classification=jeans"
    },
    "accessories": {
      mens: "/mens/more.html",
      womens: "/womens/more.html"
    },
    "hoodies": {
      mens: "/mens/hoodies.html",
      womens: "/womens/tops.html"
    }
  }
  var category_id = $route.current.categoryId || LookupService.id
  CategoryService.getCategory(category_id).then(function(data) {
    category = data
    $scope.collectionLogo = (data.logo !== "") ? true : false
    trackingDeferred.resolve({
      "Source": "Homepage"
    })
    ProductService.getProductsForCategoryId(category_id).then(function(data) {
      _.remove(data, function(product) {
        return !product.isSalable
      })
      category.products = angular.isArray(data) ? data : Object.keys(data).map(function(k) {
        return data[k]
      })
      if ($rootScope.isDesktop) {
        $scope.showCarousel = true
        var classifications = _.compact(_.unique(_.flatten(_.pluck(data, 'classification'))))
        _.each(classifications, function(key, i) {
          var products = _.where(data, {
            'classification': [key]
          })
          $scope.classifications[key] = {
            'products': products,
            'filteredProducts': [],
            'dots': function() {
              return _.fill(Array(Math.ceil(this.filteredProducts.length / $scope.carouselCount)), '1')
            },
            'label': key.replace(/-/g, ' '),
            'key': key.replace(/%/g, ''),
            'index': 0,
            'transformAmount': 0,
            'setIndex': function(index) {
              this.index = index
              this.transform()
            },
            'calcIndex': function(direction) {
              if (direction == 'right') {
                this.index--
              } else {
                this.index++
              }
              this.transform()
            },
            'transform': function() {
              var elm = angular.element(document.querySelector('.homepage-products-scroll-area-' + this.key.replace('$', '')))[0]
              var amount = 0
              if (elm) {
                var scrollWidth = elm.clientWidth * this.index
                var margin = scrollWidth * .03125
                amount = (scrollWidth + margin)
              }
              this.transformAmount = amount
            }
          }
        })
      }
      OptimizelyService.handle("categoryPageLoaded", category)
      $scope.data = category
      $scope.categoryData = category
      $scope.data.filters.gender = _.values($scope.data.filters.gender)
      $scope.data.filters.colors = _.values($scope.data.filters.colors)
      $scope.$watch('filterSorter', $scope.doFilter, true)
      $scope.page.setTitle(category.title.replace('Favorite Products | ', ''))
      afterCategoryLoad()
      return HomepageService.getHomepage()
    }).then(function(data) {
      $scope.homepage = data.config.homepage
      $scope.$emit('viewLoaded')
    })
  })

  function afterCategoryLoad() {
    TrackingService.track('updateCategoryData', category)
    $timeout(function() {
      angular.element($window).on('resize', $scope.onResize)
      $scope.onResize()
    })
    $scope.$on("$destroy", function() {
      angular.element($window).unbind('resize')
    })
  }
  $scope.doFilter = function() {
    $timeout(function() {
      if ($scope.showCarousel) {
        _.each($scope.classifications, function(classification, i) {
          classification.filteredProducts = $filter('filterFields')(classification.products, {
            gender: $scope.filterSorter.selectedFilter.gender,
            color: $scope.filterSorter.selectedFilter.color,
            classification: $scope.filterSorter.selectedFilter.classification,
            subClassification: $scope.filterSorter.selectedFilter.subClassification
          });
          classification.filteredProducts = _.sortBy(classification.filteredProducts, function(item) {
            if ($scope.filterSorter.selectedSorter == "prices.final" && $scope.filterSorter.sortReverse) {
              return -1 * item.prices.final
            } else if ($scope.filterSorter.selectedSorter == "prices.final") {
              return item.prices.final
            } else if ($scope.filterSorter.selectedSorter == "thinktankCounts.voting.count" && $scope.filterSorter.sortReverse) {
              return -1 * item.thinktankCounts.voting.count
            } else if ($scope.filterSorter.selectedSorter == "thinktankCounts.voting.count") {
              return item.thinktankCounts.voting.count
            } else {
              return -1 * item.position
            }
          })
          $timeout(function() {
            angular.element($window).triggerHandler('scroll');
            classification.setIndex(0)
          }, 0)
        })
      } else {
        $scope.data.filteredProducts = $filter('filterFields')($scope.data.products, {
          gender: $scope.filterSorter.selectedFilter.gender,
          color: $scope.filterSorter.selectedFilter.color,
          classification: $scope.filterSorter.selectedFilter.classification,
          subClassification: $scope.filterSorter.selectedFilter.subClassification
        });
        $scope.data.filteredProducts = _.sortBy($scope.data.filteredProducts, function(item) {
          if ($scope.filterSorter.selectedSorter == "prices.final" && $scope.filterSorter.sortReverse) {
            return -1 * item.prices.final
          } else if ($scope.filterSorter.selectedSorter == "prices.final") {
            return item.prices.final
          } else if ($scope.filterSorter.selectedSorter == "thinktankCounts.voting.count" && $scope.filterSorter.sortReverse) {
            return -1 * item.thinktankCounts.voting.count
          } else if ($scope.filterSorter.selectedSorter == "thinktankCounts.voting.count") {
            return item.thinktankCounts.voting.count
          } else {
            return -1 * item.position
          }
        });
        $timeout(function() {
          angular.element($window).triggerHandler('scroll')
        }, 0)
      }
    }, 0)
  }
  $scope.onResize = function() {
    var currentHomepageValue = $scope.showCarousel
    if (body.clientWidth < 768) {
      $scope.carouselCount = 1
      $scope.showCarousel = false
    } else if (body.clientWidth > 767 && body.clientWidth < 1200) {
      $scope.carouselCount = 2
      $scope.showCarousel = false
    } else {
      $scope.carouselCount = 3
      $scope.showCarousel = true
    }
    if (currentHomepageValue !== $scope.showCarousel) {
      $scope.doFilter()
    }
  }
  ModelCitizenService.getHijack().then(function(data) {
    $scope.modelCitizenHijack = data
    var trackingData = {}
    if (data.type == "model")
      trackingData.type = "ModelCitizen"
    else
      trackingData.type = "B-Glasses"
    TrackingService.trackEvent('View MC Upload', trackingData)
  })
  PageService.setBodyClass('home')
  PageService.setMicrodataItemType('CollectionPage')
}])
BetabrandApp.directive('gridItem', [function() {
  return {
    scope: {
      label: "@gridLabel",
      color: "@gridColor",
      url: "@gridUrl",
      image: "@gridImage",
    },
    restrict: 'A',
    templateUrl: '/angular/app/homepage/grid-item.html',
    link: function(scope, iElm, iAttrs, controller) {}
  }
}])
BetabrandApp.factory('HomepageService', ['ConfigService', '$q', function HomepageService(ConfigService, $q) {
  return {
    getHomepage: function() {
      return ConfigService.getConfig(["homepage"])
    }
  }
}])
BetabrandApp.directive('myEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.myEnter);
        });
        event.preventDefault();
      }
    });
  };
});
BetabrandApp.directive('myEscape', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 27) {
        scope.$apply(function() {
          scope.$eval(attrs.myEscape);
        });
        event.preventDefault();
      }
    });
  };
});
BetabrandApp.directive('myTab', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.shiftKey && (event.which === 9)) {
        scope.$apply(function() {
          scope.$eval(attrs.myShiftTab);
        });
      } else if (event.which === 9) {
        scope.$apply(function() {
          scope.$eval(attrs.myTab);
        });
      }
      return true;
    });
  };
});
BetabrandApp.factory('MarketingModalsService', ['$timeout', '$log', '$location', '$q', '$http', 'CartService', function MarketingModalsService($timeout, $log, $location, $q, $http, CartService) {
  return {
    hasPromoMessage: false,
    getPromoMessage: function() {
      var params = $location.search()
      var deferred = $q.defer()
      var self = this
      if (params.utm_term && !params.r) {
        $http.get('/api/rest/cms/block/identifier/' + params.utm_term).success(function(data) {
          self.hasPromoMessage = true
          deferred.resolve(data)
          CartService.applyCoupon(params.utm_term).then(function(response) {
            $log.debug('successfully applied promo coupon')
          }, function(response) {
            $log.debug('failed to apply promo coupon')
          })
        }).error(function(data) {
          deferred.reject(data)
        })
      } else {
        deferred.reject({})
      }
      return deferred.promise
    }
  }
}])
BetabrandApp.controller('BenefitsModalController', ['$scope', '$timeout', 'close', '$document', '$rootScope', 'TrackingService', 'hotkeys', function BenefitsModalController($scope, $timeout, close, $document, $rootScope, TrackingService, hotkeys) {
  $scope.display = true
  $scope.closing = false
  hotkeys.bindTo($scope).add({
    combo: 'esc',
    description: 'Close Referrals Modal',
    callback: function() {
      $scope.close()
    }
  })
  $scope.close = function() {
    $rootScope.$broadcast('toggleModal')
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
    }, 610)
  }
  TrackingService.trackEvent("View Account Benefits Modal")
}])
BetabrandApp.controller('AddToCartModalController', ['$scope', 'close', '$document', '$timeout', 'CartService', 'BannerService', 'item', '_', 'hotkeys', 'TrackingService', '$rootScope', '$location', 'CustomerService', function($scope, close, $document, $timeout, CartService, BannerService, item, _, hotkeys, TrackingService, $rootScope, $location, CustomerService) {
  $scope.display = true
  $scope.closing = false
  $scope.cart = CartService
  $scope.data = {
    thumbnail: item.media[0].url,
    prices: item.prices,
    qty: 1,
    name: item.name,
    url: item.canonicalUrl,
    shippingDate: item.shippingDate,
    options: _.reduce(item.selectedAttributes, function(memo, value) {
      var add = {};
      add[value.label] = value.value;
      return _.extend(memo, add)
    }, {}),
    preorder: item.preorder,
    crowdfunding: item.crowdfunding
  }
  $scope.customerService = CustomerService
  hotkeys.bindTo($scope).add({
    combo: 'esc',
    description: 'Close Modal',
    callback: function() {
      $scope.close()
    }
  })
  $scope.$on('closeModals', function() {
    $scope.close()
  })
  $scope.close = function() {
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
    }, 610)
  }
  $scope.updateTotal = function(item) {
    BannerService.hideError()
    CartService.updateTotal(item).then(function(response) {}, function(error) {
      BannerService.showError(error)
      $scope.cart.getCartData()
    })
  }
  $scope.openCheckout = function() {
    CartService.fireCartFlames.activated = true
    CartService.fireCartChug.activated = false
    CartService.fireCartDrive.activated = true
    $timeout(function() {
      CartService.fireCartFlames.activated = false
      CartService.fireCartDrive.activated = false
    }, 4000);
    CartService.showCart = false
    $scope.close()
    if ($rootScope.isMobile) {
      $rootScope.mobileBuybar = false
    }
    TrackingService.trackEvent("Click Checkout")
    $timeout(function() {
      $location.url('/cart/checkout')
    }, 260);
  }
}])
BetabrandApp.controller('HowItWorksModalController', ['$scope', '$timeout', 'close', '$document', function HowItWorksModalController($scope, $timeout, close, $document) {
  $scope.display = true
  $scope.closing = false
  $scope.showHowItWorksForm = true
  $scope.close = function() {
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
    }, 610)
  }
  $document.bind('keydown', function(event) {
    if (event.which === 27) {
      $scope.close()
      $scope.$apply()
      $document.unbind('keydown')
    }
  })
  $scope.$on("$destroy", function() {
    $document.unbind('keydown')
  })
}])
BetabrandApp.controller('LoginModalController', ['$scope', 'TrackingService', '$rootScope', '$timeout', 'action', 'product', 'close', '$document', '$http', 'CustomerService', 'BannerService', '$location', 'hotkeys', '$log', '$kookies', function LoginModalController($scope, TrackingService, $rootScope, $timeout, action, product, close, $document, $http, CustomerService, BannerService, $location, hotkeys, $log, $kookies) {
  $scope.action = action
  $scope.product = product
  $scope.display = true
  $scope.closing = false
  $scope.showSignIn = false
  $scope.createAccountData = {}
  $scope.loginData = {};
  $scope.loadingSpinner = false
  $scope.customerService = CustomerService
  $scope.trackingService = TrackingService
  $scope.signupWithEmail = false
  if ($kookies.get("user_signin")) {
    $scope.showSignIn = true
  }
  $scope.switchSignupMethod = function() {
    $scope.signupWithEmail = !$scope.signupWithEmail
  }
  $scope.forms = {}
  hotkeys.bindTo($scope).add({
    combo: 'esc',
    description: 'Close Login Modal',
    callback: function() {
      $scope.close()
    }
  })
  $scope.loadingSpinnerSignup = false
  $scope.emailCreateAccount = function() {
    $scope.loadingSpinnerSignup = true
    if (!$scope.forms.signupForm.$error.required) {
      $scope.createAccountData.source = $scope.action ? $scope.action : null
      $scope.createAccountData.product = $scope.product ? $scope.product : null
      $scope.createAccountData.url = window.location.href
      CustomerService.emailCreateAccount($scope.createAccountData).then(function(response) {}, function(error) {
        $scope.loadingSpinnerSignup = false
        $scope.errorSignupMsg = error.messages.error[0].message
        $log.debug(error)
      })
    }
  }
  $scope.facebookLogin = function() {
    $scope.loadingSpinnerFb = true
    BannerService.hideError()
    var loginData = {
      "source": $scope.action,
      "product": $scope.product,
      url: window.location.href
    }
    CustomerService.facebookLogin(loginData).then(function(response) {
      $scope.loadingSpinnerFb = false
    })
  }
  $scope.loadingSpinnerSignIn = false
  $scope.emailLogin = function() {
    if (!$scope.forms.loginForm.$error.required) {
      $scope.loadingSpinnerSignIn = true
      $scope.loginData.source = $scope.action ? $scope.action : null
      $scope.loginData.product = $scope.product ? $scope.product : null
      CustomerService.emailLogin($scope.loginData).then(function(response) {}, function(error) {
        $scope.loadingSpinnerSignIn = false
        $scope.errorMsg = error.messages.error[0].message
      })
    }
  }
  $scope.forgotPassword = function() {
    $scope.close()
    $location.path('/account/forgotpassword')
  }
  $scope.close = function() {
    $rootScope.$broadcast('toggleModal')
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close(CustomerService.data.loggedIn)
    }, 610)
  }
  $scope.$on('loggedIn', function() {
    $scope.close()
  })
  $scope.toggleSignIn = function(event) {
    $scope.showSignIn = !$scope.showSignIn
  }
}])
BetabrandApp.controller('NewsletterModalController', ['$scope', 'close', '$document', '$timeout', 'NewsletterService', 'CustomerService', 'CartService', 'TrackingService', 'PopupsService', '$log', function($scope, close, $document, $timeout, NewsletterService, CustomerService, CartService, TrackingService, PopupsService, $log) {
  $scope.display = true
  $scope.closing = false
  $scope.successView = false
  PopupsService.getPopupForUrl(window.location.href).then(function(response) {
    $log.debug("[PopupsService] Popup located!")
    $scope.customModal = response.data
  }, function() {
    $log.debug("[PopupsService] No popup located")
  })
  $scope.close = function() {
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
      window.scrollTo(0, 0)
    }, 610)
  }
  $scope.discountCode = ''
  $scope.copyResponseText = 'Click code to copy'
  $scope.codeCopied = function() {
    $scope.copyResponseText = 'Code copied!'
  }
  $document.bind('keydown', function(event) {
    if (event.which === 27) {
      $scope.close()
      $scope.$apply()
      $document.unbind('keydown')
    }
  })
  $scope.successView = false
  $scope.loadingSpinner = false
  $scope.loadingSpinnerFb = false
  $scope.submitEmail = function(email) {
    $scope.loadingSpinner = true
    var data = {
      email: email,
      source: 'Popup Signups',
      incentivized: true,
      url: window.location.href
    }
    NewsletterService.signup(data).then(function(response) {
      $scope.discountCode = response.code
      $scope.successView = true
      CartService.applyCoupon($scope.discountCode)
      $scope.loadingSpinner = false
    }, function(error) {
      $scope.loadingSpinner = false
      $scope.errorMessage = error.messages.error[0].message
    })
  }
  $scope.submitFacebook = function() {
    $scope.loadingSpinnerFb = true
    var loginData = {
      "source": 'Popup Signups',
      'url': window.location.href,
      'incentive': true
    }
    CustomerService.facebookLogin(loginData).then(function(data) {
      var trackingData = {
        "Signup Source": "Popup Signups",
        "Signup Method": "Facebook"
      }
      TrackingService.trackEvent("Newsletter Signup", trackingData)
      $scope.loadingSpinnerFb = false
      if (data.signupCoupon) {
        $scope.discountCode = data.signupCoupon
        $scope.successView = true
        CartService.applyCoupon($scope.discountCode)
      } else {
        $scope.errorMessage = "Sorry, this offer is only eligible for new customers"
      }
    }, function(error) {
      $scope.loadingSpinnerFb = false
      $scope.errorMessage = error.messages.error[0].message
    })
  }
}])
BetabrandApp.controller('PreOrderModalController', ['$scope', '$timeout', 'close', '$document', 'ModalService', function PreOrderController($scope, $timeout, close, $document, ModalService) {
  $scope.display = true
  $scope.closing = false
  $scope.showHowItWorksForm = true
  $scope.close = function() {
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
    }, 610)
  }
  $scope.questionsForm = false
  $scope.showQuestionsForm = function() {
    $scope.questionsForm = !$scope.questionsForm
  }
  $document.bind('keydown', function(event) {
    if (event.which === 27) {
      $scope.close()
      $scope.$apply()
      $document.unbind('keydown')
    }
  })
  $scope.$on("$destroy", function() {
    $document.unbind('keydown')
  })
}])
BetabrandApp.controller('OutOfStockModalController', ['$scope', 'close', '$document', '$timeout', 'product', 'attributes', 'hotkeys', function($scope, close, $document, $timeout, product, attributes, hotkeys) {
  $scope.display = true
  $scope.closing = false
  $scope.product = product
  $scope.attributes = attributes
  hotkeys.bindTo($scope).add({
    combo: 'esc',
    description: 'Close Out of Stock Modal',
    callback: function() {
      $scope.close()
    }
  })
  $scope.close = function() {
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
    }, 610)
  }
}])
BetabrandApp.controller('QuestionsModalController', ['$scope', 'close', '$document', '$timeout', 'ProductService', 'product', 'TrackingService', 'hotkeys', 'CustomerService', function($scope, close, $document, $timeout, ProductService, product, TrackingService, hotkeys, CustomerService) {
  $scope.display = true
  $scope.closing = false
  $scope.product = product
  hotkeys.bindTo($scope).add({
    combo: 'esc',
    description: 'Close Questions Modal',
    callback: function() {
      $scope.close()
    }
  })
  $scope.close = function() {
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
    }, 610)
  }
}])
BetabrandApp.controller('QuickLookModalController', ['$scope', 'product', 'category', 'useCanonical', 'close', 'ProductService', 'CartService', 'LookupService', '_', '$timeout', '$document', '$rootScope', '$window', 'hotkeys', 'TrackingService', 'ImageService', function QuickLookModalController($scope, product, category, useCanonical, close, ProductService, CartService, LookupService, _, $timeout, $document, $rootScope, $window, hotkeys, TrackingService, ImageService) {
  $scope.cart = CartService
  $scope._ = _
  $scope.closing = false
  $scope.data = product
  $scope.currentImage = product.thumbnail
  $scope.useCanonical = useCanonical
  $scope.display = true
  $scope.isQuickLookLoaded = false
  ProductService.getProduct(product.id).then(function(data) {
    $scope.data = data
    _.remove($scope.data.media, {
      type: 'video'
    })
    $scope.isQuickLookLoaded = true
    updateMedia()
  })
  hotkeys.bindTo($scope).add({
    combo: 'esc',
    description: 'Close Quick Look',
    callback: function() {
      $scope.close()
    }
  }).add({
    combo: 'right',
    description: 'Next Quick Look',
    callback: function() {
      $scope.getNextProduct()
    }
  }).add({
    combo: 'left',
    description: 'Previous Quick Look',
    callback: function() {
      $scope.getPreviousProduct()
    }
  })
  $scope.changeGalleryImage = function(url, index) {
    $scope.currentImage = url
    $scope.currentIndex = index
  }
  $scope.getNextProduct = function() {
    $scope.isQuickLookLoaded = false
    var index = _.findIndex(category, {
      "id": $scope.data.id
    })
    index++
    var next = (index <= (category.length - 1)) ? category[index] : category[0]
    ProductService.getProduct(next.id).then(function(data) {
      $scope.data = data
      $scope.isQuickLookLoaded = true
      updateMedia()
    })
  }
  $scope.getPreviousProduct = function() {
    $scope.isQuickLookLoaded = false
    var index = _.findIndex(category, {
      "id": $scope.data.id
    })
    index--
    var previous = (index >= 0) ? category[index] : category[category.length - 1]
    ProductService.getProduct(previous.id).then(function(data) {
      $scope.data = data
      $scope.isQuickLookLoaded = true
      updateMedia()
    })
  }
  $scope.close = function(result) {
    $scope.closing = true
    $scope.display = false
    $scope.isQuickLookLoaded = false
    close(result, 610);
  }
  $scope.formatImage = ImageService.lazyFormatSrc

  function trackProductQuickView(product) {
    TrackingService.trackEvent("Shop Page Interaction", {
      "Interaction Type": "Quick Look"
    })
    TrackingService.track('updateProductData', product)
    TrackingService.track('push', {
      event: 'productQuickView',
      'virtualPagePath': product.url
    })
  }

  function updateMedia() {
    $scope.currentImage = $scope.data.media[0].url
    trackProductQuickView($scope.data);
  }
  $rootScope.$watch('isMobile', function(newVal, oldVal) {
    if (newVal == true) {
      $scope.close()
    }
  })
  $scope.$watch('data.id', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      updateMedia()
    }
  })
}])
BetabrandApp.controller('ReferralModalController', ['$scope', '$timeout', 'productId', 'close', '$document', '$rootScope', 'TrackingService', 'hotkeys', function RefferalModalController($scope, $timeout, productId, close, $document, $rootScope, TrackingService, hotkeys) {
  $scope.display = true
  $scope.closing = false
  $scope.showReferralForm = true
  $scope.productId = productId
  hotkeys.bindTo($scope).add({
    combo: 'esc',
    description: 'Close Referrals Modal',
    callback: function() {
      $scope.close()
    }
  })
  $scope.close = function() {
    $rootScope.$broadcast('toggleModal')
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
    }, 610)
  }
  $scope.referralFormToggle = function(event) {
    $scope.showReferralForm = !$scope.showReferralForm
  }
  TrackingService.trackEvent("View Referral Modal")
}])
BetabrandApp.controller('ReviewModalController', ['$scope', '$timeout', 'close', '$document', function ReviewModalController($scope, $timeout, close, $document) {
  $scope.display = true
  $scope.closing = false
  $scope.showReviewForm = true
  $scope.close = function() {
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
    }, 610)
  }
  $scope.reviewFormToggle = function(event) {
    $scope.showReviewForm = !$scope.showReviewForm
  }
  $scope.master = {}
  $scope.update = function(review) {
    $scope.master = angular.copy(review)
  }
}])
BetabrandApp.controller('ModelCitizenController', ['$scope', '$q', '$templateCache', '$document', '$timeout', '$window', 'ModelCitizenService', 'CartService', 'TrackingService', 'ModalService', 'PageService', function($scope, $q, $templateCache, $document, $timeout, $window, ModelCitizenService, CartService, TrackingService, ModalService, PageService) {
  $scope.photoType = null
  $scope.wallContainer = angular.element(document.getElementsByClassName('walloffame__images'))
  $scope.currentPage = 0
  $scope.countPerPage = 24
  $scope.endReached = false
  $scope.loadingPhotos = false
  $scope.ModelCitizenService = ModelCitizenService
  $scope.images = []

  function getDocHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
  }

  function getClientHeight() {
    return Math.max(document.body.clientHeight, document.documentElement.clientHeight)
  }
  $scope.getNextPage = function() {
    $scope.loadingPhotos = true
    $scope.currentPage++
    ModelCitizenService.getWallOfFame($scope.currentPage, $scope.countPerPage).then(function(result) {
      if (result.length) {
        for (var i = 0; i < result.length; i++) {
          $scope.images.push(result[i])
        }
      } else {
        $scope.endReached = true
      }
      $scope.loadingPhotos = false
    })
  }
  $scope.showImageModal = function(data) {
    ModalService.showModal({
      templateUrl: "/angular/app/modelcitizen/modelcitizen-modal.html",
      controller: "ModelCitizenImageModalController",
      inputs: {
        image: data.image,
        images: $scope.images
      }
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
  $scope.showUploader = function(type) {
    $scope.photoType = type
    $document.scrollTo(angular.element(document.getElementById('scroll__target')), 108, 400).then(function() {
      ModelCitizenService.showUploader = true
    }, 150)
    var trackingData = {
      source: "MC WOF"
    }
    if (type == "product")
      trackingData.type = "ModelCitizen"
    else
      trackingData.type = "B-Glasses"
    TrackingService.trackEvent('View MC Upload', trackingData)
  }
  $scope.loadMore = function() {
    if (!$scope.loadingPhotos) {
      $scope.getNextPage()
    }
  }
  $scope.$watch('ModelCitizenService.showUploader', function(newVal, oldVal) {
    if (newVal == false) {
      $scope.photoType = null
      $timeout(function() {
        $document.scrollTo(angular.element(document.body), 0, 400)
      }, 150)
    }
  })
  var trackingDeferred = $q.defer()
  TrackingService.setTrackingPromise(trackingDeferred.promise)
  $scope.loadMore()
  $scope.$emit('viewLoaded')
  trackingDeferred.resolve({
    "Source": "Model Citizen"
  })
  PageService.setBodyClass('modelcitizen__page')
  PageService.setMicrodataItemType('CollectionPage')
}])
BetabrandApp.controller('ModelCitizenImageModalController', ['$scope', 'close', '$document', '$timeout', 'ProductService', 'TrackingService', '_', 'image', 'images', '$location', '$window', function($scope, close, $document, $timeout, ProductService, TrackingService, _, image, images, $location, $window) {
  $scope.display = true
  $scope.closing = false
  $scope.data = image
  $scope.getNextImage = function() {
    var index = _.findIndex(images, {
      "id": $scope.data.id
    })
    index++
    var next = (index <= (images.length - 1)) ? images[index] : images[0]
    $scope.data = next
  }
  $scope.getPreviousImage = function() {
    var index = _.findIndex(images, {
      "id": $scope.data.id
    })
    index--
    var previous = (index >= 0) ? images[index] : images[images.length - 1]
    $scope.data = previous
  }
  $scope.close = function() {
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
    }, 610)
  }
  $scope.goToProductPage = function() {
    if ($scope.data.product.url) {
      var originRe = new RegExp($window.location.origin)
      var url = $scope.data.product.url.replace(originRe, "")
      $location.url(url + '?m=' + $scope.data.id)
      $scope.close()
    }
  }
  $document.bind('keydown', function(event) {
    if (event.which === 27) {
      $scope.close()
      $document.unbind('keydown')
    } else if (event.which === 39) {
      $scope.getNextImage()
    } else if (event.which === 37) {
      $scope.getPreviousImage()
    }
    $scope.$apply()
  })
}])
BetabrandApp.factory('ModelCitizenService', ['$http', '$q', '$location', 'CartService', '_', function ModelCitizenService($http, $q, $location, CartService, _) {
  return {
    submitDefer: $q.defer(),
    showUploader: false,
    isUploading: false,
    joinNewsletter: true,
    getWallOfFame: function(currentPage, countPerPage) {
      var deferred = $q.defer()
      $http.get('/api/rest/modelcitizen/collection/1/?page=' + currentPage + '&pageSize=' + countPerPage).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    createImage: function(imageData) {
      var deferred = $q.defer()
      this.submitDefer = deferred
      if (this.joinNewsletter == true) {
        _.extend(imageData, {
          newsletter: true
        })
      }
      var request = $http({
        method: "post",
        url: "/api/rest/modelcitizen/create/",
        data: imageData
      }).success(function(data) {
        deferred.resolve(data)
        if (data.coupon) {
          CartService.applyCoupon(data.coupon)
        }
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    getModelCitizen: function(id) {
      var deferred = $q.defer()
      var request = $http({
        method: "get",
        url: "/api/rest/modelcitizen/get/" + id
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    },
    getHijack: function() {
      var deferred = $q.defer()
      var params = $location.search()
      if (params.m) {
        this.getModelCitizen(params.m).then(function(response) {
          deferred.resolve(response)
        })
      }
      return deferred.promise
    }
  }
}])
BetabrandApp.directive('modelCitizenUploader', ["$window", "TrackingService", "$http", '$rootScope', "$log", "ModelCitizenService", "BannerService", "$location", "CustomerService", "$timeout", function($window, TrackingService, $http, $rootScope, $log, ModelCitizenService, BannerService, $location, CustomerService, $timeout) {
  return {
    scope: {
      photoType: "=photoTypeObject",
    },
    restrict: 'E',
    templateUrl: '/angular/app/modelcitizen/modelcitizen-uploader.html',
    replace: true,
    link: function(scope, iElm, iAttrs, controller) {
      scope.ModelCitizenService = ModelCitizenService
      ModelCitizenService.submitDefer.resolve(true)
      scope.canvas = null
      scope.hasPhoto = false
      scope.trackingService = TrackingService
      fabric.Object.prototype.transparentCorners = false
      scope.initializeCanvas = function() {
        scope.caption = null
        scope.scaleAmount = .5
        scope.rotateAmount = 0
        scope.holder = document.getElementById('uploader__canvas')
        scope.canvas = new fabric.Canvas('fabric__canvas')
        scope.canvasImage = null
        scope.canvasGlasses = null
      }
      scope.initializeCanvasSize = function() {
        scope.canvasWidth = scope.holder.clientWidth
        scope.canvasHeight = scope.holder.clientHeight
        scope.canvas.setWidth(scope.holder.clientWidth)
        scope.canvas.setHeight(scope.holder.clientHeight)
        scope.canvasWidth = scope.holder.clientWidth
        scope.canvasHeight = scope.holder.clientHeight
        scope.canvas.setWidth(scope.canvasWidth)
        scope.canvas.setHeight(scope.canvasHeight)
        scope.canvas.selection = false
        if (scope.canvas.item(0) !== undefined) {
          scope.canvas.centerObject(scope.canvas.item(0))
        }
        scope.canvas.setBackgroundColor({
          source: '/angular/images/uploader-pattern.png',
          repeat: 'repeat'
        }, scope.canvas.renderAll.bind(scope.canvas))
        scope.scaleControlChange = function() {
          scope.canvasImage.scale(parseFloat(scope.scaleAmount)).setCoords()
          scope.canvas.renderAll()
        }
        scope.rotateControlChange = function() {
          scope.canvasGlasses.setAngle(parseInt(scope.rotateAmount, 10)).setCoords();
          scope.canvas.renderAll()
        }
        scope.holder.ondragover = function() {
          angular.element(scope.holder).addClass('hover')
          return false
        }
        scope.holder.ondrop = function(evt) {
          angular.element(scope.holder).addClass('has__image').removeClass('hover')
          evt.preventDefault()
          var file = evt.dataTransfer.files[0],
            reader = new FileReader(),
            options = {
              canvas: true
            }
          reader.onload = function(event) {
            loadImage.parseMetaData(file, function(data) {
              if (data.exif) {
                options.orientation = data.exif.get('Orientation')
              }
              loadImage(file, function(img) {
                scope.canvas.remove(scope.canvasImage)
                fabric.Image.fromURL(img.toDataURL(), function(oImg) {
                  oImg.lockUniScaling = true
                  oImg.centeredScaling = true
                  oImg.scaleToWidth(scope.canvas.width * 1)
                  scope.canvasImage = oImg.set()
                  scope.canvas.add(scope.canvasImage)
                  scope.canvasImage.set({
                    borderColor: 'gray',
                    cornerColor: 'black',
                    centeredScaling: true,
                    hasRotatingPoint: false,
                    originX: "center",
                    originY: "center"
                  })
                  scope.canvas.centerObject(scope.canvasImage)
                  if (scope.photoType == 'bglasses')
                    addGlasses()
                })
              }, options)
            })
          }
          scope.hasPhoto = true
          scope.$apply()
          reader.readAsDataURL(file)
          return false
        }
        scope.$watch(function(scope) {
          return (scope.photoType)
        }, function(newValue) {
          if (newValue == 'model')
            scope.canvas.remove(scope.canvasGlasses)
          if (newValue == 'bglasses' && scope.canvasGlasses !== null)
            addGlasses()
        })
      }

      function addGlasses() {
        fabric.loadSVGFromURL('/angular/images/modelcitizen/glasses.svg', function(objects, options) {
          scope.canvas.remove(scope.canvasGlasses)
          scope.canvasGlasses = fabric.util.groupSVGElements(objects, options)
          scope.canvas.add(scope.canvasGlasses.scale(0.5))
          scope.canvasGlasses.set({
            left: scope.canvas.width / 2,
            top: scope.canvas.height / 2,
            borderColor: 'gray',
            cornerColor: 'black',
            lockUniScaling: true,
            originX: "center",
            originY: "center",
            selection: true
          }).setCoords()
          scope.canvas.setActiveObject(scope.canvas.item(1));
          scope.canvas.renderAll()
        })
      }
      scope.saveImage = function(event) {
        if (scope.hasPhoto) {
          ModelCitizenService.isUploading = true
          scope.canvas.deactivateAll().renderAll()
          var image = scope.canvas.toDataURL({
            format: 'png',
            left: 0,
            top: 0,
            width: scope.canvasWidth,
            height: scope.canvasHeight,
            multiplier: ((940 / scope.canvasWidth) * 2)
          })
          BannerService.hideError()
          ModelCitizenService.createImage({
            image: image,
            email: scope.userEmail,
            comment: scope.caption,
            type: scope.photoType
          }).then(function(result) {
            if (result.retailUpload) {
              ModelCitizenService.showUploader = false
            } else {
              $location.path('/').search({
                m: result.id
              })
              BannerService.showSuccess("Congratulations on becoming our newest model citizen! Your discount will be automatically applied at checkout.")
            }
            ModelCitizenService.isUploading = false
          }, function(result) {
            BannerService.showError(result)
            ModelCitizenService.isUploading = false
          })
        } else {
          event.preventDefault()
        }
      }
      scope.close = function() {
        ModelCitizenService.showUploader = false
      }
      scope.clearImage = function() {
        angular.element(scope.holder).removeClass('has__image').css('background-image', 'url()')
        scope.hasPhoto = false
      }
      scope.uploadFile = function(files) {
        angular.element(scope.holder).addClass('has__image').removeClass('hover')
        var file = files[0],
          reader = new FileReader(),
          options = {
            canvas: true,
            maxWidth: 2000
          }
        reader.onload = function(event) {
          loadImage.parseMetaData(file, function(data) {
            if (data.exif) {
              options.orientation = data.exif.get('Orientation')
            }
            loadImage(file, function(img) {
              $timeout(function() {
                scope.canvas.remove(scope.canvasImage)
                fabric.Image.fromURL(img.toDataURL(), function(oImg) {
                  oImg.lockUniScaling = true
                  oImg.centeredScaling = true
                  oImg.scaleToWidth(scope.canvas.width * 1)
                  scope.canvasImage = oImg.set()
                  scope.canvas.add(scope.canvasImage)
                  scope.canvasImage.set({
                    borderColor: 'gray',
                    cornerColor: 'black',
                    centeredScaling: true,
                    hasRotatingPoint: false,
                    originX: "center",
                    originY: "center"
                  })
                  scope.canvas.centerObject(scope.canvasImage)
                  if (scope.photoType == 'bglasses')
                    addGlasses()
                })
              }, 0);
            }, options)
          })
        }
        scope.hasPhoto = true
        scope.$apply()
        reader.readAsDataURL(file)
      }
      scope.$watch("ModelCitizenService.showUploader", function(newVal, oldVal) {
        if (newVal == true) {
          scope.initializeCanvas()
          $timeout(function() {
            scope.initializeCanvasSize()
          }, 200);
          angular.element($window).bind('resize', function() {
            scope.initializeCanvasSize()
            return scope.$apply()
          })
        }
      })
      scope.$on("$destroy", function() {
        angular.element($window).unbind('resize')
        ModelCitizenService.showUploader = false
      })

      function _prepopulate() {
        CustomerService.getData().then(function(data) {
          if (data.email) {
            if (!scope.userEmail) {
              scope.userEmail = data.email
            }
          } else {
            if (scope.userEmail) {
              scope.userEmail = null
            }
          }
        })
      }
      _prepopulate()
      $rootScope.$on('loggedIn', _prepopulate);
      $rootScope.$on('loggedOut', _prepopulate);
    }
  }
}])
BetabrandApp.controller('NewsletterController', ['$scope', 'NewsletterService', function($scope, NewsletterService) {}])
BetabrandApp.factory('NewsletterService', ["$q", "$http", "TrackingService", function NewsletterService($q, $http, TrackingService) {
  return {
    signup: function(data) {
      var deferred = $q.defer()
      $http({
        method: "POST",
        url: "/api/rest/subscribe/",
        data: data
      }).success(function(response) {
        deferred.resolve(response)
        var trackingData = {
          "Signup Source": data.source,
          "Signup Method": (data.email.length > 0) ? "Email" : "Facebook",
          'Email': data.email
        }
        TrackingService.trackEvent("Newsletter Signup", trackingData)
      }).error(function(response) {
        deferred.reject(response)
      })
      return deferred.promise
    }
  }
}])
BetabrandApp.directive('optimizely', ['$http', '$templateCache', '$compile', '$log', 'OptimizelyService', function($http, $templateCache, $compile, $log, OptimizelyService) {
  return {
    restrict: 'A',
    link: function(scope, elm, iAttrs) {
      var test = iAttrs.optimizely
      if (typeof angular.optimizely[test] == "undefined" || !angular.optimizely[test].template) {
        $log.debug("[Optimizely] '" + test + "' is inactive")
        return false;
      }
      $log.debug("[Optimizely] '" + test + "' active")
      var tmpName = "/angular/app/optimizely/" + test + "/" + angular.optimizely[test].template + ".html"
      angular.element(elm).css('display', 'none')
      OptimizelyService.getTemplate(tmpName).then(function(tplContent) {
        var compiled = $compile(tplContent)(scope)
        elm.replaceWith(compiled)
      })
    }
  }
}])
BetabrandApp.factory('OptimizelyService', ["$q", "$http", "$log", '$templateCache', '$kookies', 'MarketingModalsService', 'BannerService', "_", function OptimizelyService($q, $http, $log, $templateCache, $kookies, MarketingModalsService, BannerService, _) {
  var variations = {}
  var ready = false
  var _optimizely = function() {
    return (window.optimizely && 'push' in window.optimizely) ? window.optimizely : []
  }
  var _setDefaults = function() {
    angular.optimizely.buybar = {
      id: "old",
      template: ""
    };
    angular.optimizely.cart = {
      id: "old",
      template: ""
    };
    angular.optimizely.checkout = {
      id: "old",
      template: ""
    };
    angular.optimizely.lightbox = {
      id: "old",
      template: ""
    };
    angular.optimizely.dpyp = {
      id: "original",
      template: ""
    }
  }
  return {
    activate: function(testId) {
      _setDefaults();
      if ($kookies.get("betabrand-filter-internal") == 1)
        return;
      if (testId)
        _optimizely().push(["activate"])
      else
        _optimizely().push(["activate", testId])
      this.setReady(true)
      $log.debug("[Optimizely] Activated optimizely")
    },
    setVariation: function(testName, value) {
      variations[testName] = value
    },
    variation: function(which) {
      return variations[which]
    },
    setReady: function(which) {
      if (ready == false && which == true)
        this.handle("initialLoad")
      ready = which
    },
    ready: function() {
      return ready
    },
    getTemplate: function(tmpName) {
      var deferred = $q.defer()
      $http.get(tmpName, {
        cache: $templateCache
      }).success(function(tplContent) {
        deferred.resolve(tplContent)
      }).error(function(response) {
        deferred.reject(response)
      })
      return deferred.promise
    },
    handle: function(event, data) {
      var yogaPageTest = angular.optimizely.yogaPageTest || {}
      switch (event) {
        case "categoryPageLoaded":
          if (yogaPageTest.id == "header-hidden") {
            data.image = "";
          }
          break;
        case "isConfigurator":
          return (angular.optimizely.dpyp && angular.optimizely.dpyp.id == "configurator")
          break;
      }
    }
  }
}])
BetabrandApp.factory('OrderService', ['$http', '$rootScope', '$log', '$q', 'TrackingService', function($http, $rootScope, $log, $q, TrackingService) {
  function OrderService() {
    var self = this
    self.getOrder = function(id) {
      var deferred = $q.defer()
      $http.get('/api/rest/orders/' + id).success(function(response) {
        deferred.resolve(response)
      }).error(function(response) {
        deferred.reject(response)
      })
      return deferred.promise
    }
    self.getAllOrders = function(id) {
      return $http.get('/api/rest/orders/')
    }
    self.getRMA = function(incrementId, email) {
      return $http.get('/api/rest/whiplash/rma/incrementId/' + incrementId + '/email/' + email)
    }
  }
  return new OrderService()
}])
BetabrandApp.controller('PageController', ['$scope', 'PageService', function PageController($scope, PageService) {
  $scope.page = PageService
}])
BetabrandApp.factory('PageService', ['ConfigService', function PageService(ConfigService) {
  var title = "Betabrand"
  var description = ''
  var canonical = window.location.href
  var image = ''
  var bodyClass = 'home'
  var microdataItemType = 'WebPage'
  return {
    title: function() {
      return title
    },
    description: function() {
      return description
    },
    canonical: function() {
      return canonical
    },
    image: function() {
      return image
    },
    bodyClass: function() {
      return bodyClass
    },
    microdataItemType: function() {
      return microdataItemType
    },
    setTitle: function(newTitle) {
      title = newTitle ? newTitle : 'Betabrand'
    },
    setDescription: function(newDescription) {
      description = newDescription
    },
    setCanonical: function(url) {
      canonical = url
    },
    setImage: function(url) {
      image = url
    },
    setBodyClass: function(newBodyClass) {
      bodyClass = newBodyClass ? newBodyClass : 'home'
    },
    setMicrodataItemType: function(newMicrodataItemType) {
      microdataItemType = newMicrodataItemType ? newMicrodataItemType : 'WebPage'
    }
  }
}])
BetabrandApp.controller('NotFoundController', ['$scope', 'ConfigService', function NotFoundController($scope, ConfigService) {
  ConfigService.getConfig(["homepage"]).then(function(response) {
    $scope.categoryId = response.config.homepage.popularCategoryId
    $scope.$emit("viewLoaded")
  })
}])
BetabrandApp.directive('crosssell', ['TrackingService', '_', function(TrackingService, _) {
  return {
    scope: {
      product: "=",
      source: "@"
    },
    restrict: 'E',
    template: '<a ng-href="{{product.url}}" in-view="isInView($inview, $inviewpart, $event)"><img ng-src="{{product.thumbnail}}"><h5 class="cart-crossells__name">{{product.name}}</h5></a>',
    link: function(scope, elem, attrs) {
      var tracked = false
      if (scope.product) {
        scope.isInView = function(inview, inviewpart, event) {
          if (!tracked) {
            TrackingService.trackEvent("View Cross Sell", _.merge({
              'Source': scope.source
            }, TrackingService.buildProductTrackingData(scope.product)))
            tracked = true
          }
        }
        elem.on("click", function() {
          var trackingData = TrackingService.buildProductTrackingData(scope.product)
          trackingData['Source'] = scope.source
          TrackingService.trackEvent("Click Cross Sell", trackingData)
        })
      }
    }
  }
}]);
BetabrandApp.directive('crowdfundingPage', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/angular/app/product/crowdfundingPage.html',
    link: function(scope, element, attrs, controller) {}
  }
}])
BetabrandApp.directive('productConfiguratorPage', ['_', '$q', '$location', '$rootScope', '$window', '$timeout', '$sce', '$route', '$document', 'ProductService', 'CartService', 'CategoryService', 'TrackingService', 'LookupService', 'ModalService', 'ModelCitizenService', 'PageService', 'CustomerService', 'OptimizelyService', 'BannerService', function(_, $q, $location, $rootScope, $window, $timeout, $sce, $route, $document, ProductService, CartService, CategoryService, TrackingService, LookupService, ModalService, ModelCitizenService, PageService, CustomerService, OptimizelyService, BannerService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/angular/app/product/dpyp/product-dpyp.html',
    link: function($scope, elm, attrs) {
      PageService.setBodyClass('product__page product__page-dpyp')
      PageService.setMicrodataItemType('ItemPage')
      $scope.cart = CartService
      $scope.templateUrl = LookupService.templateUrl
      $scope.showSidebar = false
      $scope.customer = CustomerService
      $scope._ = _
      $scope.unit = 'inches'
      $scope.enlarged = false
      $scope.configurator = {
        angle: 0,
        selectedColor: "",
        selectedStyle: "",
        selectedProduct: {},
        styles: {},
        products: [],
        selectedSimpleProduct: {},
        addToCartText: "Add to Cart"
      }
      var productId = $route.current.productId || LookupService.id
      ProductService.getProductsForCategoryId(88).then(function(category) {
        var removeIds = [10845, 8714, 11000, 10847, 10948, 11256, 12106, 12200, 12104]
        var styles = {
          'boot-cut': 0,
          'straight-leg': 1,
          'leggings': 2,
          'cropped-leg': 3,
        }
        var products = category
        _.remove(products, function(product) {
          return _.contains(removeIds, parseInt(product.id))
        })
        $scope.configurator.products = products
        $scope.configurator.routeProductId = productId.toString()
        var subClassifications = _.compact(_.unique(_.pluck($scope.configurator.products, 'subClassification')))
        _.each(subClassifications, function(key, i) {
          var products = _.where($scope.configurator.products, {
            'subClassification': key
          })
          $scope.configurator.styles[key] = {
            'colors': _.pluck(products, 'swatchLabel'),
            'products': products,
            'label': key,
            'position': styles[key[0]]
          }
        })
        if ($scope.configurator.routeProductId) {
          $scope.configurator.selectedStyle = $scope.configurator.styles[_.pluck(_.where($scope.configurator.products, {
            'id': $scope.configurator.routeProductId
          }), 'subClassification')]
          $scope.configurator.selectedColor = _.pluck(_.where($scope.configurator.products, {
            'id': $scope.configurator.routeProductId
          }), 'swatchLabel')[0]
        } else {
          $scope.configurator.selectedStyle = $scope.configurator.styles['boot-cut']
          $scope.configurator.selectedColor = $scope.configurator.selectedStyle.colors[0]
        }
        preloadImages('initial')
        $scope.loadProduct()
        $scope.configurator.selectedSimpleProduct = _.where($scope.configurator.selectedProduct.simpleProducts, {
          'Size': 'Medium'
        })[0]
        $scope.buildImageUrl()
        $scope.buildFitImageUrl()
        $scope.updateAddToCartText()
        preloadImages('style')
        var relatedProducts = _.without(products, _.findWhere(products, {
          id: $scope.configurator.selectedProduct.id
        }))
        $scope.configurator.relatedProducts = $scope.shuffleArray(relatedProducts)
        $scope.scrollToSection('configurator')
        $scope.$emit('viewLoaded')
        ModelCitizenService.getHijack().then(function(data) {
          if (data.image && $scope.configurator.selectedProduct.media.length) {
            var newMedia = {
              type: "image",
              url: data.image,
              label: data.caption
            }
            $scope.configurator.selectedProduct.media.unshift(newMedia)
            $scope.scrollToSection('gallery')
          }
          TrackingService.track('View MC Photo')
        })
        $scope.$watchCollection('configurator.selectedStyle', function() {
          angular.element(document.querySelector('.styles-wrapper--desktop')).addClass('loading')
          angular.element(document.querySelector('.colors-wrapper--desktop')).addClass('loading')
          $scope.animateConfigurator(300)
        });
      })
      $scope.animateConfigurator = function(delay) {
        $timeout(function() {
          var tl = new TimelineLite({
            onComplete: function() {
              angular.element(document.querySelector('.styles-wrapper--desktop')).removeClass('loading')
              angular.element(document.querySelector('.colors-wrapper--desktop')).removeClass('loading')
            }
          });
          _.each(angular.element(document.querySelector('.styles-wrapper--desktop')).find('button'), function(button, i) {
            if (button) {
              tl.add(TweenLite.to(button, 0.25, {
                top: 0,
                opacity: 1,
                ease: Power2.easeOut
              }), '-=.2')
            }
          })
          _.each(angular.element(document.querySelector('.colors-wrapper--desktop')).find('button'), function(button, i) {
            if (button) {
              tl.add(TweenLite.to(button, 0.25, {
                top: 0,
                opacity: 1,
                ease: Power2.easeOut
              }), '-=.2')
            }
          })
          tl.play();
        }, delay);
      }
      $scope.loadProduct = function() {
        $scope.configurator.selectedProduct = _.where($scope.configurator.products, {
          'subClassification': $scope.configurator.selectedStyle.label,
          'swatchLabel': $scope.configurator.selectedColor
        })[0]
        if ($scope.configurator.selectedProduct.subClassification[0] !== 'cropped-leg') {
          _.each($scope.configurator.selectedProduct.simpleProducts, function(simple, i) {
            switch (true) {
              case /^X-Small/.test(simple.Size):
                simple.group = 'X-Small'
                break
              case /^Small/.test(simple.Size):
                simple.group = 'Small'
                break
              case /^Medium/.test(simple.Size):
                simple.group = 'Medium'
                break
              case /^Large/.test(simple.Size):
                simple.group = 'Large'
                break
              case /^X-Large/.test(simple.Size):
                simple.group = 'X-Large'
                break
              case /^XX-Large/.test(simple.Size):
                simple.group = 'XX-Large'
                break
            }
          })
        }
        TrackingService.trackPage($scope.configurator.selectedProduct.url, true)
      }

      function preloadImages(which) {
        var images = new Array()
        var urls = new Array()

        function preload(imgs) {
          for (i = 0; i < imgs.length; i++) {
            images[i] = new Image()
            images[i].src = imgs[i]
          }
        }
        switch (which) {
          case 'initial':
            for (var i = 0; i < $scope.configurator.products.length; i++) {
              var product = $scope.configurator.products[i]
              for (var j = 0; j < 4; j++) {
                urls.push("https://static6.betabrands.com/media/configurator/dpyp/" + product.subClassification[0].toLowerCase() + "/" + product.swatchLabel.toLowerCase() + "/0.jpg?iopts=807x")
              };
            }
            break
          case 'style':
            for (var i = 0; i < 4; i++) {
              urls.push("https://static6.betabrands.com/media/configurator/dpyp/" + $scope.configurator.selectedStyle.label[0].toLowerCase() + "/" + $scope.configurator.selectedColor.toLowerCase() + "/" + i + ".jpg?iopts=807x")
            };
            break
        }
        preload(urls)
      }
      $scope.updateAddToCartText = function() {
        $scope.configurator.addToCartText = "Add " + $scope.configurator.selectedStyle.label[0] + " : " + $scope.configurator.selectedColor + " : " + $scope.configurator.selectedSimpleProduct.Size + " to Cart"
      }
      $scope.onStyleChange = function() {
        var colors = $scope.configurator.selectedStyle.colors,
          color = $scope.configurator.selectedColor,
          simpleProduct = $scope.configurator.selectedSimpleProduct
        $scope.configurator.selectedColor = _.includes(colors, color) ? color : colors[0]
        $scope.loadProduct()
        _.each($scope.configurator.selectedProduct.simpleProducts, function(simple, i) {
          if (simple.Size === simpleProduct.Size) {
            $scope.configurator.selectedSimpleProduct = simple
            return false
          } else {
            $scope.configurator.selectedSimpleProduct = $scope.configurator.selectedProduct.simpleProducts[0]
          }
        })
        $scope.buildImageUrl()
        $scope.buildFitImageUrl()
        $scope.updateAddToCartText()
        preloadImages('style')
      }
      $scope.buildImageUrl = function() {
        $scope.configurator.currentImage = "https://static6.betabrands.com/media/configurator/dpyp/" + $scope.configurator.selectedStyle.label[0].toLowerCase() + "/" + $scope.configurator.selectedColor.toLowerCase() + "/" + $scope.configurator.angle + ".jpg"
      }
      $scope.buildFitImageUrl = function() {
        $scope.configurator.currentFitImage = "https://static6.betabrands.com/media/configurator/dpyp/fit-images/" + $scope.configurator.selectedStyle.label[0].toLowerCase() + ".svg"
      }
      $scope.addToCart = function() {
        var item = $scope.configurator.selectedProduct
        item.selectedAttributes = $scope.configurator.selectedSimpleProduct.attributes
        item.preorder = $scope.configurator.selectedProduct.preorder
        item.crowdfunding = $scope.configurator.selectedProduct.crowdfundingActivated
        item.selectedAttributes['Size'].preorder = $scope.configurator.selectedProduct.preorder
        item.selectedAttributes['Size'].selected = true
        _.each(item.attributes[0], function(attribute, i) {
          attribute.preorder = $scope.configurator.selectedProduct.preorder
          attribute.selected = (attribute.value_id === item.selectedAttributes['Size'].value_id) ? true : false
        })
        CartService.addProduct(angular.copy(item)).then(function(response) {}, function(error) {
          BannerService.showError(error)
        })
        if (!$rootScope.isMobile) {
          var timer = $timeout(function() {
            $scope.showAddToCartModal(angular.copy(item))
          }, 0)
        } else {
          CartService.showCart = true
        }
      }
      $scope.showAddToCartModal = function(item) {
        ModalService.showModal({
          templateUrl: "/angular/app/modal/add-to-cart/add-to-cart-modal.html",
          controller: "AddToCartModalController",
          inputs: {
            item: item
          }
        }).then(function(modal) {
          modal.close.then(function(result) {})
        })
      }
      $scope.setUpMicrodata = function() {
        $scope.microdata = {}
        if ($scope.configurator.selectedProduct.state == "in-stock") {
          $scope.microdata.availability = "InStock"
        } else if ($scope.configurator.selectedProduct.state == "out-of-stock") {
          $scope.microdata.availability = "OutOfStock"
        } else {
          $scope.microdata.availability = "PreOrder"
        }
        var crumbs = $scope.breadcrumbs()
        var category = []
        angular.forEach(crumbs, function(value, key) {
          category.push(value.label)
        })
        $scope.microdata.category = category.join(" > ")
      }
      $scope.breadcrumbs = function() {
        if (typeof $scope.configurator.selectedProduct.breadcrumbs == "undefined")
          return
        if (typeof $scope.configurator.selectedProduct.breadcrumbs[CategoryService.id] !== "undefined") {
          return $scope.configurator.selectedProduct.breadcrumbs[CategoryService.id]
        } else if (LookupService.categoryId) {
          return $scope.configurator.selectedProduct.breadcrumbs[LookupService.categoryId]
        }
        return $scope.configurator.selectedProduct.breadcrumbs.default
      }
      $scope.showReferralModal = function() {
        $rootScope.$broadcast('toggleModal')
        ModalService.showModal({
          templateUrl: "/angular/app/modal/referrals/referral-modal.html",
          controller: "ReferralModalController",
          inputs: {
            productId: $scope.configurator.selectedProduct.id
          }
        }).then(function(modal) {
          modal.close.then(function(result) {})
        })
      }
      $scope.showQuestionsModal = function() {
        ModalService.showModal({
          templateUrl: "/angular/app/modal/product/questions-modal.html",
          controller: "QuestionsModalController",
          inputs: {
            product: $scope.configurator.selectedProduct
          }
        }).then(function(modal) {
          modal.close.then(function(result) {})
        })
      }
      $scope.changeAngle = function(direction) {
        switch (direction) {
          case "right":
            $scope.configurator.angle = ($scope.configurator.angle == 3) ? 0 : $scope.configurator.angle + 1
            break
          case "left":
            $scope.configurator.angle = ($scope.configurator.angle == 0) ? 3 : $scope.configurator.angle - 1
            break
        }
        $scope.buildImageUrl()
        $scope.buildFitImageUrl()
      }
      $scope.openEnlarged = function() {
        angular.element(document.querySelector('.dpyp-product__enlarged-image')).removeClass('hidden')
        $scope.enlarged = !$scope.enlarged
        angular.element(document.body).addClass('enlarge')
      }
      $scope.closeEnlarged = function() {
        angular.element(document.querySelector('.dpyp-product__enlarged-image')).removeClass('show')
        $timeout(function() {
          $scope.enlarged = !$scope.enlarged
          angular.element(document.body).removeClass('enlarge')
          angular.element(document.querySelector('.dpyp-product__enlarged-image')).addClass('hidden')
        }, 700)
      }
      $scope.scrollToSection = function(section) {
        switch (section) {
          case 'top':
            $document.scrollTo(angular.element(document.querySelector('body')), 0, 500)
            break
          case 'configurator':
            $document.scrollTo(angular.element(document.querySelector('.dpyp-product__section--configurator')), 110, 500)
            break
          case 'details':
            $document.scrollTo(angular.element(document.querySelector('.dpyp-product__section--make')), 210, 500)
            break
          case 'gallery':
            $document.scrollTo(angular.element(document.querySelector('.dpyp-product__section--gallery')), 140, 500)
            break
          case 'sizing':
            $document.scrollTo(angular.element(document.querySelector('.dpyp-product__section--sizing')), 210, 500)
            break
          case 'reviews':
            $document.scrollTo(angular.element(document.querySelector('.dpyp-product__section--reviews')), 210, 500)
            break
          case 'faqs':
            $document.scrollTo(angular.element(document.querySelector('.dpyp-product__section--questions')), 210, 500)
            break
        }
      }
      $scope.scrolled = function() {
        return angular.element(document).scrollTop() > 100
      }
      $scope.showFaq = function(index, direction) {
        if (direction !== undefined) {
          switch (direction) {
            case 'right':
              index = (index == document.querySelectorAll('.product-faq').length) ? 0 : index
              break
            case 'left':
              index = (index <= 0) ? document.querySelectorAll('.product-faq').length - 1 : index
              break
          }
        }
        $scope.question = ($scope.question == index) ? $scope.question = -1 : index
        if ($rootScope.isMobile) {
          $timeout(function() {
            $document.scrollTo(angular.element(document.querySelector('.animate-show')), 100, 500)
          }, 600)
        }
      }
      $scope.fitImageInView = function(event, part) {
        if (part == 'both') {}
      }
      $scope.shuffleArray = function(array) {
        var m = array.length,
          t, i;
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
        return array;
      }
    }
  }
}]).filter('capitalize', function() {
  return function(input, scope) {
    if (input != null)
      input = input.toLowerCase()
    return input.substring(0, 1).toUpperCase() + input.substring(1)
  }
}).filter('titlecase', function() {
  return function(s) {
    s = (s === undefined || s === null) ? '' : s
    return s.toString().toLowerCase().replace(/\b([a-z])/g, function(ch) {
      return ch.toUpperCase()
    })
  }
}).directive("bnFadeHelper", function() {
  function compile(element, attributes, transclude) {
    element.prepend("<img class='fader' />")
    return (link)
  }

  function link($scope, element, attributes) {
    var fader = angular.element(document.querySelector('.fader'))
    var primary = angular.element(document.querySelector('.dpyp-product__image'))
    $scope.$watch("configurator.currentImage", function(newValue, oldValue) {
      if (newValue === oldValue) {
        return
      }
      if (isFading()) {
        return
      }
      initFade(oldValue)
    })

    function initFade(fadeSource) {
      if (fadeSource == undefined) {
        return
      }
      fader.prop("src", fadeSource).addClass("show")
      primary.one("load", startFade)
    }

    function isFading() {
      return (fader.hasClass("show") || fader.hasClass("fadeOut"))
    }

    function startFade() {
      forceRedraw(fader[0])
      fader.addClass("fadeOut")
      setTimeout(teardownFade, 250)
    }

    function forceRedraw(el) {
      var t = el.ownerDocument.createTextNode(' ')
      el.appendChild(t)
      setTimeout(function() {
        el.removeChild(t)
      }, 0)
    }

    function teardownFade() {
      fader.removeClass("show fadeOut")
    }
  }
  return ({
    compile: compile,
    restrict: "A"
  })
}).filter('encodeURIComponent', function() {
  return window.encodeURIComponent
})
BetabrandApp.directive('productCard', ['ProductService', 'ModalService', 'TrackingService', '$rootScope', 'APP_CONFIG', 'ImageService', function(ProductService, ModalService, TrackingService, $rootScope, APP_CONFIG, ImageService) {
  return {
    restrict: 'E',
    replace: false,
    templateUrl: '/angular/app/product/productCard.html',
    scope: {
      product: "=",
      index: "@",
      category: "=",
      isThinkTankCategory: "=",
      useCanonical: "="
    },
    link: function(scope, element, attrs, controller) {
      scope.showQuickLook = function() {
        ModalService.showModal({
          templateUrl: "/angular/app/modal/quicklook/quick-look.html",
          controller: "QuickLookModalController",
          controllerAs: 'quicklook',
          inputs: {
            product: scope.product,
            category: scope.category,
            useCanonical: scope.useCanonical
          }
        }).then(function(modal) {
          modal.close.then(function(result) {})
        })
      }
      scope.getTrackingData = function() {
        var trackingData = TrackingService.buildProductTrackingData(scope.product)
        trackingData['Source'] = ('crowdfunding' == scope.product.state) ? 'Think Tank Product Page' : (scope.product.state == 'voting' ? 'Voting Page' : 'Product Page')
        return trackingData
      }
      scope.product.formattedThumbnails = ImageService.lazyFormatSrc
    }
  }
}]).filter('floor', function() {
  return function(input) {
    return Math.floor(input)
  }
})
BetabrandApp.controller('ProductController', ['$scope', '$location', '$q', 'ProductService', 'CartService', 'CategoryService', 'TrackingService', 'LookupService', 'ModalService', '$rootScope', '$window', '_', 'ModelCitizenService', 'PageService', 'CustomerService', '$timeout', '$sce', 'OptimizelyService', '$document', function($scope, $location, $q, ProductService, CartService, CategoryService, TrackingService, LookupService, ModalService, $rootScope, $window, _, ModelCitizenService, PageService, CustomerService, $timeout, $sce, OptimizelyService, $document) {
  $scope.cart = CartService
  $scope.templateUrl = LookupService.templateUrl
  $scope.showSidebar = false
  $scope.activeTab = 'related'
  var trackingDeferred = $q.defer()
  TrackingService.setTrackingPromise(trackingDeferred.promise)
  ProductService.getProduct(LookupService.id).then(function(data) {
    $scope.data = data
    $scope.isConfigurator = _.contains(["6430", "6208", "5782", "6431", "12384", "8554", "5783", "8144", "6920", "8759", "9719", "9717", "8761", "10569", "10385", "8556", "8555", "10567", "7292", "6921", "10387"], $scope.data.id) && OptimizelyService.handle("isConfigurator")
    if ($scope.isConfigurator) return;
    $scope.$emit('viewLoaded')
    $scope.page.setTitle(data.title)
    $scope.page.setDescription(data.description)
    $scope.page.setCanonical(data.canonicalUrl)
    $scope.page.setImage(data.thumbnail)
    $scope.setUpMicrodata()
    $scope.commentHighlights = {}
    $scope.data.videos = _.filter($scope.data.media, function(media) {
      return media.videoType == 'story'
    });
    OptimizelyService.handle("updatePreorderData", data)
    if (data.thinktankCounts !== undefined) {
      if (data.thinktankCounts.crowdfunding !== undefined) {
        var tiers = data.thinktankCounts.crowdfunding.tiers
        for (var i = tiers.length - 2; i >= 0; i--) {
          if (i == 0)
            tiers[0].real_quantity = tiers[0].quantity
          else
            tiers[i].real_quantity = tiers[i].quantity - tiers[i - 1].quantity
        }
      }
    }
    angular.forEach(data.designers, function(designer) {
      if (!designer.id)
        return;
      $scope.commentHighlights[designer.id] = 'designer'
    })
    ModelCitizenService.getHijack().then(function(data) {
      if (data.image && $scope.data.media.length) {
        var newMedia = {
          type: "image",
          url: data.image,
          label: data.caption
        }
        $scope.data.media.unshift(newMedia)
      }
      TrackingService.track('View MC Photo')
    })
    var trackingData = TrackingService.buildProductTrackingData(data)
    trackingData['Source'] = ('crowdfunding' == data.state) ? 'Think Tank Product Page' : (data.state == 'voting' ? 'Voting Page' : 'Product Page')
    trackingDeferred.resolve(trackingData)
    TrackingService.track('updateProductData', data)
    var categoryId = CategoryService.id
    if (LookupService.categoryId) {
      categoryId = LookupService.categoryId
    } else {
      var categories = data.breadcrumbs.default
      if (categories) {
        categoryId = categories[Object.keys(categories)[Object.keys(categories).length - 1]].id
      } else {
        categoryId = 0
      }
    }
    if (!CategoryService.id) {
      TrackingService.track('updateCategoryData', {
        id: categoryId
      })
    }
    return ProductService.getProductsForCategoryId(categoryId)
  }).then(function(products) {
    $scope.relatedProducts = _.without(products, _.findWhere(products, {
      id: $scope.data.id
    }))
    $scope.relatedProducts = $scope.shuffleArray($scope.relatedProducts)
  })
  $scope.customer = CustomerService
  PageService.setBodyClass('product__page')
  PageService.setMicrodataItemType('ItemPage')
  $scope.scrollToSection = function(section) {
    switch (section) {
      case 'comments':
        $scope.activeTab = 'comments'
        $document.scrollTo(angular.element(document.querySelector('.tabs')), 145, 500)
        break
      case 'related':
        $scope.activeTab = 'related'
        $document.scrollTo(angular.element(document.querySelector('.tabs')), 144.9, 500)
        break
    }
  }
  $scope.shuffleArray = function(array) {
    var m = array.length,
      t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
  $scope.setUpMicrodata = function() {
    $scope.microdata = {}
    if ($scope.data.state == "in-stock") {
      $scope.microdata.availability = "InStock"
    } else if ($scope.data.state == "out-of-stock") {
      $scope.microdata.availability = "OutOfStock"
    } else {
      $scope.microdata.availability = "PreOrder"
    }
    var crumbs = $scope.breadcrumbs()
    var category = []
    angular.forEach(crumbs, function(value, key) {
      category.push(value.label)
    })
    $scope.microdata.category = category.join(" > ")
  }
  $scope.showMobileBuybar = function() {
    $rootScope.mobileBuybar = true
  }
  $scope.hideMobileBuybar = function() {
    $rootScope.mobileBuybar = false
  }
  $scope.addSimpleProductToCart = function(item) {
    CartService.addProduct(angular.copy(item)).then(function(response) {}, function(error) {
      BannerService.showError(error)
    })
    CartService.showCart = true
    $document.unbind('keydown')
  }
  $scope.breadcrumbs = function() {
    if (typeof $scope.data.breadcrumbs == "undefined")
      return
    if (typeof $scope.data.breadcrumbs[CategoryService.id] !== "undefined") {
      return $scope.data.breadcrumbs[CategoryService.id]
    } else if (LookupService.categoryId) {
      return $scope.data.breadcrumbs[LookupService.categoryId]
    }
    return $scope.data.breadcrumbs.default
  }
  $scope.addToCart = function(item) {
    $scope.cart.addProduct(angular.copy(item))
    CartService.showCart = true
  }
  $scope.showReferralModal = function(id) {
    $rootScope.$broadcast('toggleModal')
    ModalService.showModal({
      templateUrl: "/angular/app/modal/referrals/referral-modal.html",
      controller: "ReferralModalController",
      inputs: {
        productId: id
      }
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
  $scope.showQuestionsModal = function() {
    ModalService.showModal({
      templateUrl: "/angular/app/modal/product/questions-modal.html",
      controller: "QuestionsModalController",
      inputs: {
        product: $scope.data
      }
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
}]).filter('floor', function() {
  return function(input) {
    return Math.floor(input)
  }
})
BetabrandApp.directive('productGallery', ['ProductService', '_', function(ProductService, _) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/angular/app/product/productGallery.html',
    scope: {
      collection: "=?",
      ids: "=?",
      categoryId: "=?",
      limit: "=?"
    },
    transclude: true,
    link: function(scope, element, attrs, controller) {
      scope._ = _
      scope.productLimit = scope.limit || 100
      if (scope.ids) {
        var collection = new Array()
        angular.forEach(scope.ids, function(id) {
          ProductService.getProduct(id).then(function(product) {
            collection.push(product)
          })
        })
        scope.collection = collection
      } else if (scope.categoryId) {
        var page_size = scope.limit || null
        ProductService.getProductsForCategoryId(scope.categoryId, page_size).then(function(products) {
          scope.collection = products
        })
      } else if (scope.collection) {
        if (attrs.inStock) {
          angular.forEach(scope.collection, function(product, index) {
            if (product.state == 'out-of-stock') {
              scope.collection.splice(index, 1)
            }
          })
        }
      }
    }
  }
}])
BetabrandApp.factory('ProductService', ['$http', '$q', '$log', '$location', 'TrackingService', function($http, $q, $log, $location, TrackingService) {
  function ProductService() {
    var self = this
    self.getProduct = function(id) {
      var deferred = $q.defer()
      $http({
        method: "get",
        url: '/api/rest/products/' + id,
        cache: true
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.getProductsForCategoryId = function(id, page_size) {
      var request = '/api/rest/products/?category_id=' + id + '&view=card'
      if (page_size) {
        request += ('&pageSize=' + page_size)
      }
      var deferred = $q.defer()
      $http({
        method: "get",
        url: request,
        cache: true
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.submitFeedback = function(type, data) {
      var deferred = $q.defer()
      $http({
        method: "post",
        url: "/api/rest/feedback/" + type,
        data: data
      }).success(function(response) {
        deferred.resolve(response)
      }).error(function(response) {
        $log.error("error: feedback/" + type, response);
        deferred.reject(response)
      })
      return deferred.promise
    }
  }
  return new ProductService()
}]);
BetabrandApp.directive('checkSidebarHeight', ['$window', '$rootScope', '$timeout', function($window, $rootScope, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs, controller) {
      scope.onResize = function() {
        var body = document.body,
          html = document.documentElement,
          footerHeight = angular.element(document.querySelector('#footer'))[0].offsetHeight,
          headerHeight = angular.element(document.querySelector('#header'))[0].offsetHeight + 20,
          documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
          scrollAmount = document.documentElement.scrollTop,
          sidebarHeight = angular.element(document.querySelector('#product__top'))[0].offsetHeight + 220
        footerOffset = angular.element(document.querySelector('#footer'))[0].getBoundingClientRect().top
        if (document.body.clientWidth < 1025) {
          elm.css({
            'position': 'static'
          })
        } else if ((documentHeight - scrollAmount) <= (sidebarHeight + footerHeight) && (document.body.clientWidth > 1024)) {
          if (elm.hasClass('product__sidebar--overflow') == false) {
            elm.css({
              'position': 'absolute',
              'top': (documentHeight - (sidebarHeight + footerHeight)) + 'px'
            })
          }
        } else {
          elm.css({
            'position': 'fixed',
            'top': '6.6875em'
          })
        }
        var winHeight = $rootScope.windowHeight
        var sidebarHeight = angular.element(document.querySelector('#product__top'))[0].offsetHeight
        var sidebarTop = angular.element(document.querySelector('#product__top'))[0].offsetTop
        var sidebarOverflow = (sidebarHeight + sidebarTop + headerHeight > winHeight) ? true : false
        if (sidebarOverflow) {
          elm.addClass('product__sidebar--overflow')
        } else {
          elm.removeClass('product__sidebar--overflow')
        }
        if ((footerOffset < window.innerHeight) && (window.scrollY > 0)) {
          var totalOffset = (window.innerHeight - footerOffset) * -1
          elm.css({
            'margin-top': totalOffset + 'px'
          })
        } else {
          elm.css({
            'margin-top': '0'
          })
        }
      }
      scope.cleanUp = function() {
        angular.element($window).off('scroll resize')
      }
      angular.element($window).on('scroll resize', scope.onResize)
      scope.$on('$destroy', scope.cleanUp)
      scope.$watch(attrs.product, function(val) {
        if (val !== undefined) {
          scope.onResize()
        }
      })
    }
  }
}])
BetabrandApp.directive('questionsForm', ['TrackingService', 'CustomerService', 'ProductService', function(TrackingService, CustomerService, ProductService) {
  return {
    restrict: 'E',
    templateUrl: '/angular/app/product/questions-form.html',
    replace: true,
    link: function(scope) {
      scope.data = {}
      CustomerService.getData().then(function(response) {
        if (!scope.data.email && response.email) {
          scope.data.email = response.email
        }
      })
      scope.submitQuestion = function() {
        scope.data.productId = scope.product.id
        ProductService.submitFeedback('question', scope.data).then(function() {
          scope.close()
          TrackingService.trackEvent('Submit a Question')
        })
      }
    }
  }
}])
BetabrandApp.directive('readyToWearPage', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/angular/app/product/readyToWearPage.html',
    link: function(scope, element, attrs, controller) {}
  }
}])
BetabrandApp.directive('votingPage', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/angular/app/thinktank/voting-page.html',
    link: function(scope, element, attrs, controller) {}
  }
}])
BetabrandApp.controller('ReferralsController', ['$scope', 'TrackingService', '$routeParams', function($scope, TrackingService, $routeParams) {
  $scope.email = $routeParams.email
  $scope.productId = $routeParams.productId
  $scope.souce = $routeParams.source
  $scope.$emit('viewLoaded');
  TrackingService.trackEvent("View Invite Friends Page")
}])
BetabrandApp.directive('referralsForm', ['$rootScope', 'ReferralsService', '$timeout', 'CustomerService', 'TrackingService', 'AssetService', function($rootScope, ReferralsService, $timeout, CustomerService, TrackingService, AssetService) {
  return {
    restrict: 'E',
    templateUrl: '/angular/app/referrals/referrals-form.html',
    replace: true,
    scope: {
      ngModel: '=',
      productId: '=?',
      email: '=?',
    },
    link: function(scope, $document) {
      AssetService.loadJs("//www.google.com/recaptcha/api.js?onload=vcRecaptchaApiLoaded&render=explicit")
      scope.reCatpchaKey = "6Ld2d_8SAAAAAJ4lxnLK8v-mOrrDxjyzZtdsA3UQ"
      scope.customer = CustomerService
      CustomerService.getData().then(function(response) {
        if (!scope.advocateEmail && response.email) {
          scope.advocateEmail = response.email
          scope.generateLink()
        } else if (scope.email) {
          scope.advocateEmail = scope.email
        }
        scope.newAdvocate = (response.referralsAdvocateCode) ? false : true
      })
      scope.referrals = ReferralsService
      var productId = (scope.productId) ? scope.productId : ""
      ReferralsService.getSettings(productId).then(function(response) {
        scope.settings = response
      })
      scope.invalidEmail = false
      scope.validateEmail = function() {
        ReferralsService.getValidateEmail(scope.friendEmail).then(function() {
          scope.invalidEmail = false
        }, function(error) {
          scope.invalidEmail = true
        })
      }
      scope.linkGenerated = false
      scope.generateLink = function() {
        ReferralsService.postGerenateLink(scope.advocateEmail, scope.productId).then(function(response) {
          scope.url = response.url
          scope.linkGenerated = true
        })
      }
      scope.showCopiedMessage = function() {
        scope.showCopyMessage = true;
        $timeout(function() {
          scope.showCopyMessage = false
        }, 3000)
      }
      scope.referSuccess = false
      scope.submitClicked = false
      scope.setCaptchaResponse = function(response) {
        scope.captcha = response
      }
      scope.referralShare = function() {
        scope.submitClicked = true
        if (scope.advocateEmail == scope.friendEmail && scope.advocateEmail && scope.friendEmail) {
          scope.errorResponse = "You can not refer yourself."
          scope.submitClicked = false
          scope.referSuccess = false
          grecaptcha.reset()
        } else {
          ReferralsService.referEmail(scope.friendEmail, scope.settings.emailText, scope.settings.program, scope.url, "email", scope.productId, scope.captcha).then(function(response) {
            scope.referSuccess = true
            $timeout(function() {
              scope.referSuccess = true
              scope.submitClicked = false
            }, 400);
            $timeout(function() {
              scope.referSuccess = false
            }, 3000);
            var trackingData = {
              "Program": scope.settings.program,
              "Method": "Email",
              "NewAdvocate": scope.newAdvocate
            }
            TrackingService.trackEvent("Refer", trackingData)
            grecaptcha.reset()
            scope.friendEmail = null
            scope.referralForm.$setPristine()
            scope.referralForm.$setUntouched()
          }, function(error) {
            scope.submitClicked = false
            scope.errorResponse = error.messages.error[0].message
          }).finally(function() {
            if (typeof grecaptcha !== "undefined") {
              grecaptcha.reset()
            }
          })
        }
      }
      scope.clickedSocial = false
      scope.clickSocial = function() {
        scope.clickedSocial = true
      }
      scope.fbShareSuccess = function() {
        ReferralsService.referSocial(scope.settings.program, scope.url + ReferralsService.settings.fbUtmCodes, "facebook", scope.productId)
      }
      scope.twitterShareSuccess = function() {
        ReferralsService.referSocial(scope.settings.program, scope.url + ReferralsService.settings.fbUtmCodes, "twitter", scope.productId)
      }
      $rootScope.$on('loggedIn', function() {
        CustomerService.getData().then(function(response) {
          if (!scope.advocateEmail && response.email) {
            scope.advocateEmail = response.email
            scope.generateLink()
          }
        })
      })
      $rootScope.$on('loggedOut', function() {
        scope.advocateEmail = null
        scope.url = null
        scope.linkGenerated = false
      })
    }
  }
}])
BetabrandApp.controller('ReferralsLandingController', ['$scope', '$q', 'CategoryService', 'CartService', 'TrackingService', 'LookupService', '_', 'PageService', 'ProductService', '$filter', '$timeout', '$window', function ReferralsLanding($scope, $q, CategoryService, CartService, TrackingService, LookupService, _, PageService, ProductService, $filter, $timeout, $window) {
  $scope.cart = CartService
  $scope.templateUrl = LookupService.templateUrl
  $scope._ = _
  $scope.collectionLogo = false
  var category = {}
  $scope.filterSorter = {
    selectedFilter: {
      gender: "!!",
      classification: "!!",
      subClassification: "!!",
      color: "!!"
    },
    selectedFilterLabels: {
      gender: "!!",
      classification: "!!",
      subClassification: "!!",
      color: "!!"
    },
    selectedSorter: "position",
    sortReverse: true
  }
  var trackingData = null
  var trackingDeferred = $q.defer()
  TrackingService.setTrackingPromise(trackingDeferred.promise)

  function _buildTrackingData(data) {
    trackingData = {
      'Source': 'Referrals Landing Page'
    }
    trackingDeferred.resolve(trackingData);
  }
  CategoryService.getCategory(99).then(function(data) {
    category = data
    $scope.collectionLogo = (data.logo !== "") ? true : false
    return ProductService.getProductsForCategoryId(99)
  }).then(function(data) {
    category.products = Object.keys(data).map(function(k) {
      return data[k]
    })
    $scope.data = category
    $scope.categoryData = category
    $scope.data.filters.gender = _.values($scope.data.filters.gender)
    $scope.data.filters.colors = _.values($scope.data.filters.colors)
    _buildTrackingData($scope.data);
    TrackingService.trackEvent('View ' + trackingData['Source'])
    $scope.$watch('filterSorter', $scope.doFilter, true)
    $scope.$emit('viewLoaded')
  })
  $scope.doFilter = function() {
    $scope.data.filteredProducts = $filter('filterFields')($scope.data.products, {
      gender: $scope.filterSorter.selectedFilter.gender,
      color: $scope.filterSorter.selectedFilter.color,
      classification: $scope.filterSorter.selectedFilter.classification,
      subClassification: $scope.filterSorter.selectedFilter.subClassification
    });
    $scope.data.filteredProducts = _.sortBy($scope.data.filteredProducts, function(item) {
      if ($scope.filterSorter.selectedSorter == "prices.final" && $scope.filterSorter.sortReverse) {
        return -1 * item.prices.final
      } else if ($scope.filterSorter.selectedSorter == "prices.final") {
        return item.prices.final
      } else if ($scope.filterSorter.selectedSorter == "thinktankCounts.voting.count" && $scope.filterSorter.sortReverse) {
        return -1 * item.thinktankCounts.voting.count
      } else if ($scope.filterSorter.selectedSorter == "thinktankCounts.voting.count") {
        return item.thinktankCounts.voting.count
      } else {
        return -1 * item.position
      }
    });
    $timeout(function() {
      angular.element($window).triggerHandler('scroll');
    }, 0);
  }
  PageService.setBodyClass('category__page')
  PageService.setMicrodataItemType('CollectionPage')
}]).filter('removeCollectionPrefix', function() {
  return function(value) {
    return (!value) ? '' : value.replace("Men's ", "").replace("Women's ", "")
  }
})
BetabrandApp.factory('ReferralsService', ['$http', '$q', '$cookies', '$rootScope', 'BannerService', 'TrackingService', '$location', 'CustomerService', function($http, $q, $cookies, $rootScope, BannerService, TrackingService, $location, CustomerService) {
  function ReferralsService() {
    var self = this
    self.initialized = false
    var f = ""
    if ("Fingerprint" in window) {
      f = new Fingerprint().get()
    }
    this.settings = {}
    this.stats = {}
    $rootScope.$on('viewLoaded', function() {
      if (!self.initialized) {
        self.getSettings().then(function() {
          self.setupAdvocateMessaging()
        })
        self.initialized = true
      }
      self.applyReferral()
    })
    self.getValidateEmail = function(friendEmail) {
      var self = this
      var deferred = $q.defer()
      var url = '/api/rest/referrals/validate/?email=' + friendEmail
      $http.get(url).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.postGerenateLink = function(advocateEmail, productId) {
      var self = this
      var deferred = $q.defer()
      var dataObj = {
        "productId": productId,
        "email": advocateEmail,
        "f": f
      }
      $http({
        method: "post",
        url: "/api/rest/referrals/generate/",
        data: dataObj
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.referEmail = function(friendEmail, emailMessage, program, url, method, productId, captcha) {
      var dataObj = {
        "method": method,
        "email": friendEmail,
        "f": f,
        "program": program,
        "message": emailMessage,
        "url": url,
        "product": productId,
        "captcha": captcha
      }
      return _postReferral(dataObj)
    }
    self.referSocial = function(program, url, method, productId) {
      var dataObj = {
        "method": method,
        "f": f,
        "program": program,
        "url": url,
        "product": productId
      }
      return _postReferral(dataObj)
    }
    var _postReferral = function(dataObj) {
      var deferred = $q.defer()
      $http({
        method: "post",
        url: "/api/rest/referrals/refer/",
        data: dataObj
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.applyReferral = function() {
      var params = window.location.search || ""
      if ($location.search().r) {
        var advocateCode = $location.search().r.trim()
      }
      if ($location.search().s) {
        var shareId = $location.search().s.trim()
      }
      $cookies._fp = f
      if (advocateCode) {
        var data = {
          f: f,
          advocateCode: advocateCode,
          shareId: shareId
        }
        $http({
          method: "post",
          url: "/api/rest/referrals/apply/",
          data: data
        }).success(function(response) {
          BannerService.showSuccess(response.message)
          TrackingService.trackEvent("View Referral", {
            "Program": response.program,
            "Channel": response.method || "Other",
            "Reward": response.reward
          })
        }).error(function(response) {
          BannerService.showError(response.messages.error[0].message, {
            timeout: 10000
          })
        })
      }
    }
    self.getSettings = function(productId) {
      productId = productId || ""
      var dataObj = {
        'product': productId
      }
      var deferred = $q.defer()
      $http({
        method: "get",
        url: "/api/rest/referrals/settings/?product=" + productId,
      }).success(function(data) {
        self.settings = data
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.getStats = function() {
      var deferred = $q.defer()
      $http({
        method: "get",
        url: "/api/rest/referrals/stats/",
      }).success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
    self.setupAdvocateMessaging = function() {
      if ($location.search().a) {
        CustomerService.getData().then(function(data) {
          if (data.referralsAdvocateCredit > 0) {
            BannerService.showSuccess("Thanks for referring! Here's your $" + parseFloat(data.referralsAdvocateCredit).toFixed(2) + " to spend!")
          } else if (data.id) {
            BannerService.showSuccess("You don't have any advocate credit, but refer now and earn!")
          } else {
            BannerService.showSuccess("Log in to see your reward for referring!")
          }
        })
      }
    }
    $rootScope.$on('loggedIn', function() {
      self.setupAdvocateMessaging()
    })
  }
  return new ReferralsService()
}]);
BetabrandApp.controller('ReturnsController', ['$scope', '$location', '$compile', 'OrderService', '$routeParams', '$sce', 'PageService', 'CustomerService', function ReturnsController($scope, $location, $compile, OrderService, $routeParams, $sce, PageService, CustomerService) {
  $scope.customerService = CustomerService
  $scope.startRMA = function() {
    if (!$scope.returnData.customerEmail || !$scope.returnData.incrementId) {
      alert('please provide an email address and an order id')
      return;
    }
    var rma = OrderService.getRMA($scope.returnData.incrementId, $scope.returnData.customerEmail).then(function(response) {
      $scope.returnData.url = response.data.rma_url
    }, function(error) {
      alert(error.data.messages.error[0].message)
    })
    return rma
  }
  if ("customerEmail" in $routeParams && "incrementId" in $routeParams) {
    $scope.returnData = $routeParams;
    $scope.startRMA($scope.returnData.incrementId, $scope.returnData.customerEmail).finally(function() {
      $scope.$emit('viewLoaded')
    })
  } else if ("returnToken" in $routeParams) {
    $scope.returnData = {
      'url': "https://www.whiplashmerch.com/rma/" + $routeParams.returnToken
    }
    $scope.$emit('viewLoaded')
  } else {
    $scope.returnData = {}
    $scope.$emit('viewLoaded')
  }
  PageService.setBodyClass('returns')
  PageService.setTitle('Returns')
  $scope.$emit('viewLoaded')
}]);
BetabrandApp.factory('LookupService', ['$http', '$q', '$location', function LookupService($http, $q, $location) {
  return {
    id: null,
    originalPath: '',
    contoller: '',
    templateUrl: '',
    categoryId: '',
    query: function(url) {
      var deferred = $q.defer()
      var self = this
      $http({
        method: "get",
        url: "/api/rest/lookup/?path=" + url,
        cache: true
      }).then(function(response) {
        var data = response.data
        var capitalizedController = data.controller.charAt(0).toUpperCase() + data.controller.substring(1)
        self.id = data.id
        self.originalPath = url
        self.categoryId = data.categoryId
        self.controller = capitalizedController + 'Controller'
        self.templateUrl = '/angular/app/' + data.controller + '/' + data.controller + '.html'
        deferred.resolve(data)
      }, function() {
        deferred.reject()
      })
      return deferred.promise
    }
  }
}])
BetabrandApp.controller('SearchController', ['$scope', 'PageService', function($scope, PageService) {
  $scope.$emit('viewLoaded')
  PageService.setBodyClass('search__page')
  PageService.setMicrodataItemType('SearchResultsPage')
}])
BetabrandApp.directive('search', ['SearchService', '_', '$document', '$rootScope', 'TrackingService', 'PageService', '$timeout', 'hotkeys', '$location', function(SearchService, _, $document, $rootScope, TrackingService, PageService, $timeout, hotkeys, $location) {
  return {
    restrict: 'E',
    link: function(scope, iElm, iAttrs, controller) {
      scope.search = SearchService
      scope.query = $location.search().q
      scope.loading = false
      scope.queryWords = null
      scope.kittenize = false
      scope.teeps = false
      scope.data = null
      scope.hasResults = false
      scope.products = []
      scope.previousSearch = ""
      scope.category = {
        products: []
      }
      var query
      SearchService.getSearchData().then(function(results) {
        scope.data = results
        angular.element(iElm.find('input'))[0].focus()
        if (scope.query) {
          query = scope.query
          scope.doSearch()
        };
      })
      scope.doSearch = function() {
        if (query.length > 2 && !scope.loading && (query !== scope.previousSearch)) {
          scope.products = []
          scope.previousSearch = angular.copy(query)
          scope.results = angular.copy(scope.data)
          scope.loading = true
          scope.queryWords = query.split(" ")
          _.forEach(scope.queryWords, function(value, which) {
            _.forEach(scope.results, function(value, index) {
              var str = scope.results[index].tags
              var exp = str.toLowerCase().indexOf(scope.queryWords[which])
              if (!str || str.length == 0 || exp < 0) {
                delete scope.results[index]
              }
            })
          })
          var count = Object.keys(scope.results).length
          if (count == 0) {
            scope.hasResults = false
          } else {
            _.forEach(scope.results, function(value, index) {
              if ($location.absUrl().indexOf("pos.") > 0) {
                scope.results[index].url = scope.results[index].url.replace("www.", "pos.")
              }
              var product = scope.results[index]
              scope.products.push(product)
            })
            scope.category.products = scope.products
          }
          scope.queryWords = null
          scope.loading = false
          var trackingData = {
            "Num of Search Results": count,
            "Page Type": TrackingService.pageType,
            "Page": PageService.title(),
            "Query": scope.query
          }
          TrackingService.trackEvent("Search", trackingData)
          $location.search("q", scope.query.toLowerCase())
        }
      }
      scope.debouncedSearch = _.debounce(scope.doSearch, 400)
      scope.handleSearchInput = function(event) {
        if (event.keyCode == 13) {
          scope.doSearch()
        }
        var inp = String.fromCharCode(event.keyCode)
        if (/[a-zA-Z0-9-_]/.test(inp) || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 17 || event.keyCode == 91) {
          query = event.target.value.toLowerCase()
          scope.debouncedSearch()
        }
      }
    }
  }
}]).filter("outOfStockToEnd", function() {
  return function(array, key) {
    if (!angular.isArray(array)) return
    var instock = array.filter(function(item) {
      return (item.state !== 'Out of Stock')
    })
    var outofstock = array.filter(function(item) {
      return (item.state == 'Out of Stock')
    })
    return instock.concat(outofstock)
  }
})
BetabrandApp.factory('SearchService', ['$http', '$q', '$location', function SearchService($http, $q, $location) {
  return {
    showSearch: false,
    getSearchData: function() {
      var deferred = $q.defer()
      var self = this
      $http.get('/media/search.json').success(function(data) {
        deferred.resolve(data)
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
  }
}])
BetabrandApp.service('AssetService', [function AssetService() {
  var service = {
    loadOptimizedFont: loadOptimizedFont,
    loadJs: loadJs
  };
  return service;

  function loadJs(url) {
    var js = document.createElement("script")
    js.type = "text/javascript"
    js.async = !0
    js.src = url
    var script = document.getElementsByTagName("script")[0];
    script.parentNode.insertBefore(js, script)
  }

  function supportsWoff2() {
    if (!("FontFace" in window)) {
      return false;
    }
    var f = new FontFace('t', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAAIkAAoAAAAABVwAAAHcAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABlYAgloKLEoBNgIkAxgLDgAEIAWDcgc1G7IEyB6SJAFID5YA3nAHC6h4+H7s27nP1kTyOoQkGuJWtNGIJKYznRI3VEL7IaHq985ZUuKryZKcAtJsi5eULwUybm9KzajBBhywZ5ZwoJNuwDX5C/xBjvz5DbsoNsvG1NGQiqp0NMLZ7JlnW+5MaM3HwcHheUQeiVokekHkn/FRdefvJaTp2PczN+I1Sc3k9VuX51Tb0Tqqf1deVXGdJsDOhz0/EffMOPOzHNH06pYkDDjs+P8fb/z/8n9Iq8ITzWywkP6PBMMN9L/O7vY2FNoTAkp5PpD6g1nV9WmyQnM5uPpAMHR2fe06jbfvzPriekVTQxC6lpKr43oDtRZfCATl5OVAUKykqwm9o8R/kg37cxa6eZikS7cjK4aIwoyh6jOFplhFrz2b833G3Jii9AjDUiAZ9AxZtxdEYV6imvRF0+0Nej3wu6nPZrTLh81AVcV3kmMVdQj6Qbe9qetzbuDZ7vXOlRrqooFSxCv6SfrDICA6rnHZXQPVcUHJYGcoqa3jVH7ATrjWBNYYkEqF3RFpVIl0q2JvMOJd7/TyjXHw2NyAuJpNaEbz8RTEVtCbSH7JrwQQOqwGl7sTUOtdBZIY2DKqKlvOmPvUxJaURAZZcviTT0SKHCXqzwc=" ) format( "woff2" )', {});
    f.load()['catch'](function() {});
    return f.status == 'loading' || f.status == 'loaded';
  }

  function injectCss(cssFile) {
    var link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', cssFile)
    document.getElementsByTagName('head')[0].appendChild(link)
  }

  function loadOptimizedFont(fontList) {
    var ua = window.navigator.userAgent;
    if ('woff2' in fontList && supportsWoff2()) {
      injectCss(fontList.woff2);
    } else if ('ttf' in fontList && ua.indexOf("Android 4.") > -1 && ua.indexOf("like Gecko") > -1 && ua.indexOf("Chrome") === -1) {
      injectCss(fontList.ttf);
    } else {
      injectCss(fontList.woff);
    }
  };
}]);
angular.module('error', []).factory('ErrorInterceptor', ['$q', '$log', 'BannerService', function($q, $log) {
  return {
    'responseError': function(rejection) {
      if (rejection.status >= 500) {
        $log.debug('[Error Service] 50x Error', rejection)
        rejection.data = "Woops! Seems like we are experiencing difficulties... Please try again in a few seconds"
      }
      return $q.reject(rejection);
    }
  };
}]).config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('ErrorInterceptor')
}])
angular.module('forceRefresh', []).factory('ForceRefreshService', ['$http', '$log', '$interval', '$window', 'BannerService', '$rootScope', function($http, $log, $interval, $window, BannerService, $rootScope) {
  function ForceRefreshService() {
    var self = this
    self.appVersion = null
    self.alreadyAlerted = false
    self.lastAlerted = false
    self.interval = 30000
    self.initialized = false
    this.checkVersion = function() {
      $log.debug("[ForceRefresh] Requesting app version")
      $http({
        method: "get",
        url: "/api/rest/angularversion"
      }).success(function(response) {
        $log.debug("[ForceRefresh] App version received:", response.version)
        if (self.appVersion == null) {
          $log.debug("[ForceRefresh] App version is null, setting new app version:", response.version)
          self.appVersion = response.version
        } else if (self.appVersion < response.version) {
          if (response.refresh === "force") {
            $log.debug("[ForceRefresh] New version number. Need to force reload", self.appVersion, $window.location.pathname)
            $window.location.reload()
          } else if (response.refresh === "onroutechange") {
            $log.debug("[ForceRefresh] New version number. Reloading onroutechange", self.appVersion, $window.location.pathname)
            $rootScope.$on('$routeChangeSuccess', function() {
              $window.location.reload()
            })
          } else if (response.refresh === "popup") {
            if (self.lastAlerted != false) {
              $log.debug("[ForceRefresh] last popup:", (Date.now() - self.lastAlerted.getTime()) / 1000, "seconds ago")
            }
            if (!self.alreadyAlerted || (self.lastAlerted != false && (Date.now() - self.lastAlerted.getTime()) > 300000)) {
              BannerService.showAlert("Hi there! A new version of Betabrand is available! <a href='" + $window.location.href + "' target='_self'>Click Here to reload!</a>")
              self.alreadyAlerted = true
              self.lastAlerted = new Date()
            }
          }
        }
      }).error(function(response) {
        $log.debug("[ForceRefresh] Error", response)
      })
    }
    this.initialize = function() {
      $rootScope.$on('viewLoaded', function(event, current) {
        if (!self.initialized) {
          self.checkVersion()
          self.startLoop()
          self.initialized = true
        }
      })
    }
    this.startLoop = function() {
      $log.debug("[ForceRefresh] Initialize")
      $interval(self.checkVersion, self.interval)
    }
  }
  return new ForceRefreshService();
}]).run(function(ForceRefreshService) {
  ForceRefreshService.initialize()
})
BetabrandApp.service('ImageService', ['APP_CONFIG', '_', function ImageService(APP_CONFIG, _) {
  var shards = APP_CONFIG.shards;
  var service = {
    formatImgSrc: formatImgSrc,
    lazyFormatSrc: lazyFormatSrc
  };
  return service;

  function formatImgSrc(baseUrl, iopts) {
    var ratio = ((typeof window.devicePixelRatio !== 'undefined') ? window.devicePixelRatio : 1);
    iopts = iopts || []
    if (shards.length > 0) {
      baseUrl = baseUrl.replace((new RegExp((window.location.host.toString()), 'g')), shards[(baseUrl.length % shards.length)])
    };
    if (iopts.length) {
      iopts[0] = ((ratio * parseInt(iopts[0])).toFixed() + iopts[0].replace(/[0-9]/g, ''));
      var optionString = "iopts=" + iopts.join(",");
      baseUrl = baseUrl.match(/\?/) ? baseUrl + '&' + optionString : baseUrl + '?' + optionString
    }
    return baseUrl;
  };

  function lazyFormatSrc(breakpoints, src, options) {
    var thumbnails = [];
    var options = options || [];
    _.each(breakpoints, function(breakpoint) {
      var opts = angular.copy(options);
      opts.push(breakpoint.imageWidth + 'x');
      thumbnails.push(([formatImgSrc(src, opts), (breakpoint.screenWidth + 'w')]).join(' '));
    });
    thumbnails = thumbnails.join(', ');
    return thumbnails;
  };
}]);
angular.module('BetabrandApp').provider('imageSharder', function ImageSharderProvider() {
  this.shards = {}
  this.addShards = function(host, shards) {
    this.shards[host] = shards
  };
  this.$get = [function imageSharderFactory() {
    return new ImageSharder(shards)
  }]
}).config(["$provide", "imageSharderProvider", "APP_CONFIG", function($provide, imageSharderProvider, APP_CONFIG) {
  if (APP_CONFIG && 'shards' in APP_CONFIG && APP_CONFIG.shards.length > 0) {
    imageSharderProvider.addShards(window.location.host, APP_CONFIG.shards)
    $provide.decorator('ngSrcDirective', function($delegate, $parse) {
      function getShard(url, shards) {
        var number = url.length,
          shardIndex = number % shards.length;
        return shards[shardIndex]
      }

      function shardUrl(url) {
        angular.forEach(imageSharderProvider.shards, function(shards, host) {
          if (url.match(new RegExp(host, "i"))) {
            var shardHost = getShard(url, shards)
            var hostRe = new RegExp(host, "i")
            url = url.replace(hostRe, shardHost)
          }
        })
        return url
      }
      var ngSrc = $delegate[0]
      ngSrc.compile = function(element, attrs) {
        return function(scope, element, attr) {
          attr.$observe('ngSrc', function(value) {
            if (value) {
              attr.$set('src', shardUrl(value))
            }
          })
        }
      }
      delete ngSrc.link
      return $delegate
    });
  }
}])
angular.module('BetabrandApp').filter('phone', function() {
  return function(tel) {
    if (!tel) {
      return '';
    }
    var value = tel.toString().trim().replace(/^\+/, '');
    if (value.match(/[^0-9]/)) {
      return tel;
    }
    var country, city, number;
    switch (value.length) {
      case 10:
        country = 1;
        city = value.slice(0, 3);
        number = value.slice(3);
        break;
      case 11:
        country = value[0];
        city = value.slice(1, 4);
        number = value.slice(4);
        break;
      case 12:
        country = value.slice(0, 3);
        city = value.slice(3, 5);
        number = value.slice(5);
        break;
      default:
        return tel;
    }
    if (country == 1) {
      country = "";
    }
    number = number.slice(0, 3) + '-' + number.slice(3);
    return (country + " (" + city + ") " + number).trim();
  };
});
BetabrandApp.directive('emailShare', ['$window', '$log', function($window, $log) {
  return {
    restrict: 'E',
    replace: true,
    template: '<a ng-transclude ng-click></a>',
    scope: {
      url: "@",
      text: "@",
      subject: "@"
    },
    transclude: true,
    link: function(scope, element, attrs) {
      scope.url = scope.url || $window.location.href
      scope.subject = scope.subject || "Check this out"
      scope.text = scope.text || ""
      var shareUrl = "mailto:?subject=" + scope.subject + "&body=" + scope.text + " " + scope.url
      attrs.$set('target', "_blank");
      attrs.$set('href', shareUrl);
    }
  }
}])
BetabrandApp.directive('facebookShare', ['$window', '$log', '$facebook', function($window, $log, $facebook) {
  return {
    restrict: 'E',
    replace: true,
    template: '<a ng-transclude ng-click></a>',
    scope: {
      url: "@",
      image: "@",
      description: "@",
      caption: "@",
      name: "@",
      callbackSuccess: "=?",
      callbackFail: "=?",
      valid: "="
    },
    transclude: true,
    link: function(scope, element, attrs) {
      element.on('click', function() {
        if (typeof FB !== "object") {
          return
        }
        if (scope.valid) {
          var shareData = {
            method: 'feed',
            link: scope.url ? scope.url : $window.location.href
          }
          if (scope.image) {
            shareData['picture'] = scope.image
          }
          if (scope.caption) {
            shareData['caption'] = scope.caption
          }
          if (scope.description) {
            shareData['description'] = scope.description
          }
          if (scope.name) {
            shareData['name'] = scope.name
          }
          $log.debug('Facebook sharing:', shareData)
          $facebook.ui(shareData, function(response) {
            $log.debug("fb ui response", response)
            var eventData = {};
            if (response && response.post_id) {
              scope.callbackSuccess(response)
            } else {
              scope.callbackFail()
            }
          });
          return false
        }
      })
    }
  }
}])
BetabrandApp.directive('twitterShare', ['$window', '$log', function($window, $log) {
  return {
    restrict: 'E',
    replace: true,
    template: '<a ng-transclude ng-click></a>',
    scope: {
      url: "@",
      text: "@",
      via: "@",
      hashtags: "@",
      callbackSuccess: "=?",
      valid: "="
    },
    transclude: true,
    link: function(scope, element, attrs) {
      element.on('click', function() {
        if (scope.valid) {
          scope.url = scope.url || $window.location.href
          var shareParams = []
          if (scope.via) {
            shareParams.push("via=" + scope.via)
          }
          if (scope.text) {
            shareParams.push("text=" + scope.text)
          }
          if (scope.hashtags) {
            shareParams.push("hashtags=" + scope.hashtags)
          }
          shareParams.push("url=" + scope.url)
          var shareUrl = encodeURI(shareParams.join("&"))
          scope.twitterWindow = window.open("http://twitter.com/intent/tweet?" + shareUrl, "Twitter", "status = 1, left = 430, top = 270, height = 550, width = 420, resizable = 0");
          scope.listener = function(event) {
            if (scope.twitterWindow && event.source == scope.twitterWindow && event.data != "__ready__") {
              $log.debug("twitter callback", event)
              scope.callbackSuccess()
              window.removeEventListener("message", scope.listener, false)
            }
          }
          window.addEventListener("message", scope.listener, false)
        }
      })
    }
  }
}])
angular.module("templates", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/angular/app/account/address.html", "<div class=\"account\">\n\n    <account-sidebar tab=\"\'your_addresses\'\" customer=\"customer\" account=\"customer\" is-phone=\"isPhone\"></account-sidebar>\n    \n    <div class=\"account__content\">\n\n        <h3>Your Addresses</h3>\n\n        <div id=\"js-account-addresses\">\n        	<div class=\"addresses-container\">        		\n	            <address-form account-address=\"true\" class=\"address__block\" model-name=\"address\" form-name=\"address\" submit-method=\"updateAddress()\" delete-method=\"deleteAddress()\" logged-in=\"customer.loggedIn\" mode=\"mode\" ng-repeat=\"address in addresses\"></address-form>\n        	</div>\n        </div>\n        \n        <button class=\"primary blue\" ng-show=\"!addingNewAddress\" ng-click=\"addAddress()\">Add an address</button>\n\n        \n\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/account/cards.html", "<div class=\"account\">\n\n	<account-sidebar tab=\"\'cards\'\" customer=\"customer\" is-phone=\"isPhone\"></account-sidebar>\n	\n	<div class=\"account__content\">\n\n		<h3>Your Credit Cards</h3>\n\n		<div id=\"account_saved_cards\">\n			<div ng-if=\"updatingCards == true\">\n				<i class=\"fa fa-refresh fa-spin\"></i>\n			</div>\n			<div ng-if=\"cards.length == 0\">\n				You don\'t have any credit cards saved on your account.\n			</div>\n			<ul class=\"row saved-cards_list\"  ng-if=\"updatingCards == false && cards.length > 0\">\n				<li class=\"saved-cards__item {{card.type | lowercase}}\" data-card=\"card.id\" ng-repeat=\"card in cards\"><i class=\"betabrand-close\" ng-click=\"deleteSavedCard(card.id)\"></i>{{card.type}} ending in <strong>{{card.last4}}</strong> (exp. {{card.exp_month}}/{{card.exp_year}})</li>\n			</ul>\n		</div>\n\n	</div>\n</div>\n");
  $templateCache.put("/angular/app/account/dashboard.html", "<div class=\"account\">\n\n    <account-sidebar tab=\"\'dashboard\'\" customer=\"customer\" is-phone=\"isPhone\"></account-sidebar>\n    \n    <div class=\"account__content\">\n        <h3>Credit</h3>\n        <section>\n\n            <p>Available Store Credit: {{ customer.betabrandStoreCredit | currency }}</p>\n\n        </section>\n\n        <h3>Recent Orders</h3>\n\n        <div ng-if=\"!ordersLoaded\">\n            <p>\n                <i class=\"fa fa-refresh fa-spin\"></i> Loading Your Orders\n            </p>\n        </div>\n    \n        <section class=\"account__no-order\" ng-show=\"!orders.length && ordersLoaded\">\n            <p>No orders have been placed. Get started with our latest styles. <a ng-href=\"/shop\">Shop now</a></p>\n        </section>\n\n        <orders-table limit=\"5\"></orders-table>\n\n        <a class=\"button auto secondary\" ng-href=\"/account/orders/\" ng-show=\"customer.orders.length && ordersLoaded\">View all orders</a>\n    </div>\n</div>\n\n");
  $templateCache.put("/angular/app/account/edit-account.html", "<div class=\"account account-user--edit\">\n    <account-sidebar tab=\"\'edit_profile\'\" customer=\"customer\" is-phone=\"isPhone\"></account-sidebar>\n    <div class=\"account__content\">\n        <div class=\"column__6\">\n            <h3>Edit Your Account Info</h3>\n            <section>\n                <div class=\"row\">\n                    <label for=\"firstname\">First Name</label>\n                    <input name=\"firstname\" title=\"First Name\" type=\"text\" ng-model=\"firstname\" autofocus>\n                    <label for=\"lastname\">Last Name</label>\n                    <input name=\"lastname\" title=\"Last Name\" type=\"text\" ng-model=\"lastname\">\n                    <label for=\"dob\">Date Of Birth</label>\n                    <input name=\"dob\" title=\"Date of Birth\" type=\"date\" ng-model=\"dob\">\n                    <label for=\"gender\">Iâ€™m mostly interested in products for</label>\n                    <select name=\"gender\" ng-model=\"gender\" ng-init=\"gender=customer.gender\">\n                        <option value=\"1\">Men</option>\n                        <option value=\"2\">Women</option>\n                    </select>\n                    <label for=\"email\">Email Address</label>\n                    <input name=\"email\" title=\"Email Address\" type=\"text\" ng-model=\"email\" ng-init=\"customer.email\">\n                    <label>\n                        <input name=\"change_password\" title=\"Change Password\" type=\"checkbox\" ng-model=\"changePassword\"> Change Password</label>\n                </div>\n            </section>\n            <section ng-show=\"changePassword\">\n                <div class=\"row\">\n                    <div class=\"column__6\">\n                        <label for=\"current_password\">Current Password</label>\n                        <input name=\"current_password\" title=\"Current Password\" type=\"password\" ng-model=\"currentPassword\">\n                        <label for=\"password\">New Password</label>\n                        <input name=\"password\" title=\"New Password\" type=\"password\" ng-model=\"newPassword\">\n                        <label for=\"confirmation\">Confirm New Password</label>\n                        <input name=\"confirmation\" title=\"Confirm New Password\" type=\"password\" ng-model=\"confirmPassword\">\n                    </div>\n                </div>\n            </section>\n        </div>\n        <div class=\"column__6\">\n            <h3>Edit Your Profile Info</h3>\n            <section>\n                <div class=\"row\">\n                    <div class=\"column__12\">\n                        <label class=\"upload-image__label\" for=\"update_image\">Designer Bio</label>\n                        <textarea name=\"designerBio\" title=\"Designer Bio\" ng-model=\"designerBio\" ng-init=\"designerBio=customer.designerBio\"></textarea>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"column__6\">\n                        <label for=\"\">Upload Your Profile Image (10 MB max)</label>\n                        <div ng-file-drop ng-file-select ng-disabled=\"submitting\" ng-model=\"profileImage\" class=\"submission-form__drop-box\" drag-over-class=\"dragover\" ng-multiple=\"false\" allow-dir=\"false\" accept=\"image/*,application/pdf,application/postscript\">\n                            <div class=\"submission-form__drop-box__icons\">\n                                <i class=\"fa fa-camera camera\"></i>\n                                <i class=\"fa fa-file-photo-o file\"></i>\n                                <i class=\"fa fa-folder-o folder\"></i>\n                            </div>\n                            <span class=\"submission-form__drop-box__drag\">Drag &amp; Drop</span>\n                            <span class=\"submission-form__drop-box__select\">or click to select profile image</span>\n                        </div>\n                        <div ng-no-file-drop>\n                            <!--File Drag/Drop is not supported-->\n                            <div class=\"button\" ng-file-select ng-model=\"files\" ng-multiple=\"true\">Choose Files</div>\n                            <ul>\n                                <li ng-repeat=\"f in files\">{{f.name}}</li>\n                            </ul>\n                        </div>\n                    </div>\n                    <div class=\"column__6\">\n                        <div style=\"background-image: url({{customer.image}});\" class=\"submission-form__upload-previews__profile\"></div>\n                    </div>\n                </div>\n            </section>\n        </div>\n    </div>\n    <div class=\"profile-button-wrapper row\">\n        <button class=\"primary blue\" ng-click=\"updateAccount();\" ng-disabled=\"isSaving\"><i class=\"fa fa-refresh fa-spin\" ng-class=\"{\'ng-show\':isSaving, \'ng-hide\' : !isSaving}\"></i>Save changes</button>\n    </div>\n    \n</div>\n");
  $templateCache.put("/angular/app/account/forgot-password.html", "<div class=\"account\">\n\n    <div class=\'forgot-password\'>\n\n        <div ng-if=\"showForm\">\n            <h1>Forgot your password?</h1>\n            <div><input type=\'email\' ng-model=\'data.email\' placeholder=\'Enter your email\'></div>\n            <button class=\"primary\" ng-click=\"forgot()\">Reset Password</button>\n        </div>\n\n        <div ng-if=\"!showForm\">\n            Your password has been reset. Check your email to complete the process.\n        </div>\n    </div>\n\n\n</div>\n\n\n\n\n");
  $templateCache.put("/angular/app/account/order.html", "<div class=\"account\">\n\n\n\n    <account-sidebar tab=\"\'orders\'\" customer=\"customer\" is-phone=\"isPhone\"></account-sidebar>\n\n    <div class=\"account__content account__order\">\n\n            <div class=\"row\">\n                <div class=\"column__6 order__details\">\n                    <h2>Order #{{order.incrementId}} ({{order.status}})</h2>\n                    <h4>{{order.date | bbTimestampToJSDate | date:\'MMMM d, yyyy\'}}</h4>\n                    <!-- <p><a ng-href=\"/account/track\">Track your order</a></p> -->\n                    <a ng-href ng-disabled=\"!order.returnable\" ng-click=\"startRMA(order.incrementId, order.customerEmail)\" class=\"button small auto blue\">Start Return Process</a>\n\n                </div>\n                <div class=\"column__6 order__shipping-payment\">\n                    <h4>Shipping Method</h4>            \n                    <p ng-bind-html=\"order.shippingDescription\"></p>\n\n                    <h4>Payment Method</h4>\n                    <p>{{ order.paymentMethodTitle }}</p>\n                    \n                </div>\n            </div>\n\n            <div class=\"row\">\n    \n                <ul class=\"addresses\">\n                    <li class=\"column__6\">\n                        <h3>Billing Address</h3>\n\n                        <p>\n                            {{order.addresses.billing.firstname}} {{order.addresses.billing.lastname}}<br>\n                            {{order.addresses.billing.street}}<br>\n                            {{order.addresses.billing.city}}, {{order.addresses.billing.region}} {{order.addresses.billing.postcode}}<br>\n                            {{order.addresses.billing.countryId}}\n                        </p>\n\n                    </li>\n\n                    <li class=\"column__6\">\n                        <h3>Shipping Address</h3>\n\n                        <p>\n                            {{order.addresses.shipping.firstname}} {{order.addresses.shipping.lastname}}<br>\n                            {{order.addresses.shipping.street}}<br>\n                            {{order.addresses.shipping.city}}, {{order.addresses.shipping.region}} {{order.addresses.shipping.postcode}}<br>\n                            {{order.addresses.shipping.countryId}}\n                        </p>\n\n                    </li>\n                </ul>\n                \n            </div>\n                \n            <table>\n                <thead>\n                    <tr>\n                        <th>Product</th>\n                        <th>Options</th>\n                        <th>Qty</th>\n                        <th>Total</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr ng-repeat=\"item in order.items\">\n                        <td>{{item.name}}</td>\n                        <td>\n                            <span ng-repeat=\"attribute in item.attributes\">\n                                <span>{{attribute.label}}: {{attribute.value}} </span>\n                            </span>\n                        </td>\n                        <td>{{parseInt(item.qtyOrdered)}}</td>\n                        <td>{{item.price | currency}}</td>\n                    </tr>\n                    <tr>\n                        <td colspan=\"2\"></td>\n                        <td>Item total</td>\n                        <td>{{order.subtotal | currency}}</td>\n                    </tr>\n                    <tr ng-if=\"parseInt(order.discountAmount)\">\n                        <td colspan=\"2\"></td>\n                        <td>Discount</td>\n                        <td>{{order.discountAmount | currency}}</td>\n                    </tr>\n                    <tr ng-if=\"parseInt(order.taxAmount)\">\n                        <td colspan=\"2\"></td>\n                        <td>Tax</td>\n                        <td>{{order.taxAmount | currency}}</td>\n                    </tr>\n                    <tr ng-if=\"parseInt(order.shippingAmount)\">\n                        <td colspan=\"2\"></td>\n                        <td>Shipping</td>\n                        <td>{{order.shippingAmount | currency}}</td>\n                    </tr>\n                    <tr>\n                        <td colspan=\"2\"></td>\n                        <td>Grand total</td>\n                        <td>{{order.grandTotal | currency}}</td>\n                    </tr>\n                </tbody>\n            </table>\n\n\n        \n    </div>\n    \n\n\n</div>\n\n");
  $templateCache.put("/angular/app/account/orders.html", "<div class=\"account\">\n\n    <account-sidebar tab=\"\'orders\'\" customer=\"customer\" is-phone=\"isPhone\"></account-sidebar>\n\n    <div class=\"account__content\">\n\n        <h3>Your Orders</h3>\n\n        <div ng-if=\"!ordersLoaded\">\n            <span>\n                <i class=\"fa fa-refresh fa-spin\"></i> Loading Your Orders\n            </span>\n        </div>\n    \n        <section class=\"account__no-order\" ng-show=\"!orders.length && ordersLoaded\">\n            <p>No orders have been placed. Get started with our latest styles. <a ng-href=\"/shop\">Shop now</a></p>\n        </section>\n    \n        <section class=\"account__returns\" ng-show=\"customer.orders.length && ordersLoaded\">\n			<h4>Need to return an item?</h4>\n			<p>Select one of your orders and then start the return process there.</p>\n        </section>\n\n        <orders-table></orders-table>\n\n    </div>\n</div>\n\n");
  $templateCache.put("/angular/app/account/orders-table.html", "<div>\n    \n    <table ng-show=\"orders.length\" class=\"account__orders-table\">\n        <thead>\n        <tr>\n            <th>Order #</th>\n            <th>Date</th>\n            <th>Items</th>\n            <th>Total</th>\n            <th class=\"hide__mobile\">Ship To</th>\n            <th class=\"hide__mobile\">Status</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr ng-repeat=\"order in orders | orderBy:\'-date\' | limitTo: limit || \'Infinity\'\" class=\"account__orders-table-row\">\n            <td>\n                <a class=\"account__orders-table-row-link\" ng-href=\"/account/order/{{order.id}}\">{{order.incrementId}}</a>\n            </td>\n            <td>{{order.date | bbTimestampToJSDate | date: \'mediumDate\'}}</td>\n            <td>\n                <ul class=\"account__orders-table-items\">\n                    <li ng-repeat=\"item in order.items track by $index\">\n                        <div class=\"account__orders-table-item-name\">{{item.name}}</div>\n                        <div><span ng-repeat=\"attribute in item.attributes track by $index\">{{attribute.label}}: {{attribute.value}}</span></div>\n                    </li>\n                </ul>\n            </td>            \n            <td>{{order.grandTotal | currency}}</td>\n            <td class=\"hide__mobile\">{{order.addresses.shipping.firstname}} {{order.addresses.shipping.lastname}}</td>\n            <td class=\"hide__mobile capitalize\">{{order.status}}</td>\n        </tr>\n        </tbody>\n    </table>\n</div>");
  $templateCache.put("/angular/app/account/referrals.html", "<div class=\"account account-referrals\">\n    <account-sidebar tab=\"\'referrals\'\" customer=\"customer\" is-phone=\"isPhone\"></account-sidebar>\n    <!-- Vanilla Referrals -->\n    <div class=\"account__content\">\n        <div class=\"referrals-header\">\n            <div class=\"referrals-header__title\">\n                <div class=\"referrals-header__reward\">Credit: {{customer.referralsAdvocateCredit | currency}}</div>\n                <h3>Referrals</h3>\n            </div>\n        </div>\n        <div class=\"row referrals-vanilla\">\n            <table>\n                <thead>\n                    <tr>\n                        <th>Email</th>\n                        <th>Status</th>\n                        <th>Earned</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr ng-repeat=\"referral in shares.email.referrals\">\n                        <td>{{ referral.friendEmail }}</td>\n                        <td>{{ (referral.conversions > 0) ? \'Complete\' : \'Pending\' }}</td>\n                        <td>{{ referral.reward | currency }}</td>\n                    </tr>\n                </tbody>\n            </table>\n            <button class=\"secondary auto refer-btn\" ng-click=\"showReferralModal()\">Refer Now</button>\n        </div>\n        <!-- Referral Stats -->\n        <div class=\"referrals-header\">\n            <div class=\"referrals-header__title\">\n                <h3>Your Stats</h3>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"social-media\">\n                <h4><i class=\"fa fa-facebook\"></i> Facebook</h4>\n                <div class=\"row\">\n                    <div class=\"social-media__stat\">\n                        <span class=\"item\">Posts</span>\n                        <span class=\"value\">{{::shares.facebook.count}}</span>\n                    </div>\n                    <div class=\"social-media__stat\">\n                        <span class=\"item\">Clicks</span>\n                        <span class=\"value\">{{::shares.facebook.clicks}}</span>\n                    </div>\n                    <div class=\"social-media__stat\">\n                        <span class=\"item\">Purchases</span>\n                        <span class=\"value\">{{::shares.facebook.conversions}}</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"social-media\">\n                <h4><i class=\"fa fa-twitter\"></i> Twitter</h4>\n                <div class=\"row\">\n                    <div class=\"social-media__stat\">\n                        <span class=\"item\">Tweets</span>\n                        <span class=\"value\">{{::shares.twitter.count}}</span>\n                    </div>\n                    <div class=\"social-media__stat\">\n                        <span class=\"item\">Clicks</span>\n                        <span class=\"value\">{{::shares.twitter.clicks}}</span>\n                    </div>\n                    <div class=\"social-media__stat\">\n                        <span class=\"item\">Purchases</span>\n                        <span class=\"value\">{{::shares.twitter.conversions}}</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"social-media\">\n                <h4><i class=\"fa fa-link\"></i> Links</h4>\n                <div class=\"row\">\n                    <div class=\"social-media__stat\">\n                        <span class=\"item\">Clicks</span>\n                        <span class=\"value\">{{::shares.direct.clicks}}</span>\n                    </div>\n                    <div class=\"social-media__stat\">\n                        <span class=\"item\">Purchases</span>\n                        <span class=\"value\">{{::shares.direct.conversions}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/account/reset-password.html", "<div class=\"account\">\n	<div class=\'reset-password\'>\n		<h1>Reset Password</h1>\n		<input type=\'text\' ng-model=\'firstname\' placeholder=\"Enter your first name\" ng-if=\"advocateId\">\n		<input type=\'text\' ng-model=\'lastname\' placeholder=\"Enter your last name\" ng-if=\"advocateId\">\n		<input type=\'password\' ng-model=\'password\' placeholder=\"Type your new password\">\n		<input type=\'password\' ng-model=\'confirmation\' placeholder=\"Confirm your new password\">\n		<button class=\"primary\"ng-click=\"reset()\">Update password</button>\n	</div>\n</div>");
  $templateCache.put("/angular/app/account/sidebar.html", "<div class=\"account-sidebar\">\n    <div class=\"account-image\" style=\"background-image : url({{customer.image ? customer.image : defaultImage}})\">\n        <a class=\"account-image__change\" href=\"/account/profile/\">Update Profile</a>\n    </div>\n    <p class=\"sidebar__email\">{{customer.email}}</p>\n    \n    <div class=\"account-sidebar__navigation\">\n    \n        <div class=\"account-menu\" ng-class=\"{active: toggleNavigation}\" ng-click=\"toggleNavigation = !toggleNavigation\">{{tab.replace(\'_\', \' \')}} <i class=\"fa fa-angle-down\"></i></div>\n\n        <nav ng-class=\"{active: toggleNavigation && isPhone, tabs: !isPhone}\">\n            <a class=\"button\" ng-class=\"{\'active\': tab == \'dashboard\'}\" ng-href=\"/account/dashboard/\">Dashboard</a>\n            <a class=\"button\" ng-class=\"{\'active\': tab == \'edit_profile\'}\" ng-href=\"/account/profile/\">Edit Profile</a>\n            <a class=\"button\" ng-class=\"{\'active\': tab == \'submissions\'}\" ng-href=\"/account/submissions/\">Ideas</a>\n            <a class=\"button\" ng-class=\"{\'active\': tab == \'your_addresses\'}\" ng-href=\"/account/addresses/\">Addresses</a>\n            <a class=\"button\" ng-class=\"{\'active\': tab == \'cards\'}\" ng-href=\"/account/payments/\">Credit Cards</a>\n            <a class=\"button\" ng-class=\"{\'active\': tab == \'orders\'}\" ng-href=\"/account/orders/\">Orders</a>\n            <a class=\"button\" ng-class=\"{\'active\': tab == \'referrals\'}\" ng-href=\"/account/referrals/\">Referrals</a>\n        </nav>\n        \n    </div>\n\n    \n</div>\n\n");
  $templateCache.put("/angular/app/account/submissions.html", "<div class=\"account\">\n\n    <account-sidebar tab=\"\'submissions\'\" customer=\"customer\" is-phone=\"isPhone\"></account-sidebar>\n    \n    <div class=\"account__content\">\n\n        <h3>Idea Submissions</h3>\n\n        <div id=\"account_submissions\">\n\n            <div class=\"card-container grid-container\" ng-if=\"submissions.length > 0\">\n                <div class=\"card grid-item\" ng-repeat=\"submission in submissions\">{{submission}}\n                    \n                        <div class=\"card-preview\" style=\"background-image: url( {{submission.media.preview.image ? submission.media.preview.image : (submission.media.images[0] ? submission.media.images[0] : \'/media/catalog/product/placeholder/default/default.jpg\')}}); background-position: 0 {{submission.media.preview.offset ? submission.media.preview.offset : \'0\' }}; \">\n                            <img ng-src=\"{{submission.media.preview.image ? submission.media.preview.image : (submission.media.images[0] ? submission.media.images[0] : \'/media/catalog/product/placeholder/default/default.jpg\')}}\" alt=\"{{submission.name}}\">\n                        </div>\n                        <div class=\"card-details\">\n                            <h3>{{::submission.name}}</h3>\n                            <span class=\"flag flag--idea {{submission.state | lowercase}}\">{{::submission.state}}</span>\n                            <p ng-if=\"submission.state.toLowerCase() == \'unpublished\'\"><a href=\"/submission/edit/{{submission.id}}\">Edit</a></p>\n                            <p ng-if=\"submission.state.toLowerCase() != \'unpublished\'\">Submitted: <span class=\"card-created\">{{::submission.createdAt}}</span></p>\n                        </div>\n\n                </div>\n            </div>\n                        \n            <p ng-if=\"!submissions.length > 0\">\n                You haven&#8217;t made any submissions yet.  <a href=\"/submission/\">Share your ideas with us!</a>\n            </p>\n\n        </div>\n\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/banners/banner.html", "<div class=\"banner {{bannerService.identifier}} {{bannerService.type}}\">\n	<div class=\"banner-message {{bannerService.type}}\" ng-if=\"bannerService.isVisible\">\n	  <span class=\"banner-message__text\" ng-bind-html=\"bannerService.message\"></span>\n	  <i class=\"betabrand-close-circle\" ng-click=\"bannerService.hideBanner()\"></i>\n	</div>\n</div>\n");
  $templateCache.put("/angular/app/buybar/buybar.html", "<div class=\'buybar\'>\n    <span off-click=\"options.isOpen = false\">\n        <div class=\"buybar__select\" ng-if=\"product.isSalable\" ng-show=\"attributeCount > 0\">\n\n            <div class=\"buybar__label\" ng-click=\"showOptions()\">\n                <span class=\"buybar__selected\">{{selectedLabel}}</span>\n                <i class=\"fa fa-angle-down\"></i>\n            </div>\n\n            <div class=\"buybar__dropdown\" ng-class=\"{\'open\': options.isOpen, \'single__attribute\' : attributeCount == 1}\">\n                <div ng-repeat=\"(index, attributes) in product.attributes | toArray\" class=\"attribute__wrapper\">\n                    <div class=\"attribute__title\">{{::attributes[0].label}}</div>\n                    <ul class=\"attribute__list\">\n                        <li ng-repeat=\"attribute in attributes | orderBy : \'position\'\" ng-click=\'attribute.available ? selectAttribute(index, attribute) : showOutOfStockModal(attribute);\' ng-class=\"{selected: (attribute.selected && attribute.available), \'in-stock\': attribute.available, \'out-of-stock\': !attribute.available, \'single__attribute\' : attributeCount == 1}\">\n                            <div class=\"attribute-text\">\n                                <span class=\"size\" ng-class=\"{\'size--pre-order\' : attribute.preorder}\">{{::attribute.value}}</span>\n                                <span class=\"pre-order\" ng-if=\"attribute.preorder && !product.preorder\">Pre-order for 10% off</span>\n                            </div>\n                        </li>\n                    </ul>\n                </div>\n            </div>        \n        </div>\n\n        <div class=\"buybar__btn-wrapper\" ng-if=\"product.isSalable\">\n            <button class=\"button primary add-to-cart\" ng-class=\"{\'out-of-stock\': !product.isSalable, \'error\': addToCartText == addToCartError, simple__product : attributeCount == 0} \" ng-click=\"product.isSalable ? addToCart(product) : showOutOfStockModal()\">\n                {{addToCartText}}\n                <span ng-if=\"product.preorder || product.preorderSelected\">Estimated shipping in <span>{{product.shippingDate}}</span>.</span>\n            </button>\n        </div>\n\n        <out-of-stock-form ng-if=\"product.id && !product.isSalable\" product=\"product\"></out-of-stock-form>\n    </span>\n</div>\n");
  $templateCache.put("/angular/app/buybar/out-of-stock-form.html", "<div class=\"out-of-stock-form\">\n    <div class=\"out-of-stock-form__title\" ng-if=\"!restockSubmitted\">Out of Stock</div>\n    <form ng-if=\"!restockSubmitted\" class=\"out-of-stock-form__form\">\n        <input type=\"email\" name=\"email\" ng-model=\"data.email\" placeholder=\"Enter your email for updates\" required><button type=\"submit\" ng-click=\"submitQuestion()\"><span class=\"outer-arrow-wrapper\"><span class=\"arrow\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"52\" height=\"12\" viewBox=\"-30 0 52 12\" enable-background=\"new -30 0 52 12\"><path fill=\"#fff\" d=\"M22 6l-6-6v5h-46v2h46v5l6-6z\"></path></svg></span></span></button>\n    </form>\n    <div class=\"out-of-stock-form--success\" ng-show=\"restockSubmitted\"><p><i class=\"fa fa-check\"></i>Great! We\'ll let you know when we have more in stock.</p></div>\n</div>");
  $templateCache.put("/angular/app/cart/cart.html", "<div class=\"cart-close\">\n    <div class=\"cart-close__button\" ng-click=\"toggleCart()\">Close <span class=\"betabrand-close-circle\"></span></div>\n    Your Cart\n</div>\n<div class=\"cart-padding\">   \n    <ul class=\"cart-products\" ng-if=\"cart.data.items.length\">\n        <li class=\"cart-products__product\" ng-repeat=\"product in cart.data.items track by $index\" ng-cloak>\n            <div class=\"cart-products__image\">\n                <a ng-href=\"{{product.url}}\"><img ng-src=\"{{product.image}}\" alt=\"\"></a>\n                <div class=\"cart-products__badge preorder\" ng-if=\"product.preorder\">\n                    Pre-order\n                </div>\n                <div class=\"cart-products__badge crowdfunding\" ng-if=\"product.crowdfunding\">\n                    Fund It\n                </div>\n            </div>\n            <div class=\"cart-products__info\">\n                <a class=\"cart-products__name\" ng-href=\"{{product.url}}\">{{product.name}}</a>\n                <div class=\"cart-products__options\">    \n                    <div class=\"cart-products__detail-wrapper\">\n                        <div class=\"cart-products__quantity\">\n                            <form>\n                                <input type=\"number\" min=\"0\" inputmode=\"numeric\" pattern=\"[0-9]*\" ng-model=\"product.qty\" ng-disabled=\"product.illusion\" ng-required min=\"1\" ng-change=\"updateTotal(product)\">\n                            </form>\n                        </div>  \n                        <div class=\"cart-products__option\" ng-repeat=\"(name, attribute) in product.options | orderBy : \'position\'\">\n                            {{name}} : {{attribute}}\n                        </div>\n                        <div class=\"cart-products__total\">\n                            {{product.qty * product.price | currency}}\n                        </div>\n                        <div class=\"cart-products__preorder-shipping\" ng-if=\"product.preorder\">\n                            Pre-Order: Ships in {{product.shippingDate}}\n                        </div> \n                        <div class=\"cart-products__crowdfunding-shipping\" ng-if=\"product.crowdfunding\">\n                            Crowdfunding: Ships in {{product.shippingDate}}\n                        </div>                        \n                    </div>    \n                </div>\n                \n                <div class=\"cart-products__remove\" ng-click=\"!product.illusion && removeProduct(product, $index)\"><i class=\"betabrand-close\"></i></div>\n            </div>\n        </li>\n    </ul>\n    <div ng-if=\"cart.outOfStockItems.length\" class=\"cart-products__outofstock\">\n        <div class=\"cart-products__outofstocktitle\">Some items from your cart are out of stock:</div>\n        <ul>\n            <li class=\"cart-products__product\" ng-repeat=\"product in cart.outOfStockItems track by $index\">\n                <div class=\"cart-products__info cart-products__info--out-of-stock\">\n                    <a ng-href=\"{{product.url}}\">\n                        {{product.name}} - <span ng-repeat=\"(name, attribute) in product.options\">{{name}} : {{attribute}}</span> - {{product.price | currency}}\n                    </a>\n                </div>\n            </li>\n        </ul>\n    </div>\n\n\n    <div class=\"cart-totals\" ng-if=\"cart.data.items.length\">\n        <div class=\"row\">\n            <div class=\"cart-totals__container\">\n                <div class=\"cart-discount\">\n                    <form novalidate>\n                        <div class=\"cart-discount__inputs\">\n                            <input class=\"text__input--button\" autocomplete=\"off\" name=\"discount\" placeholder=\"Enter a discount code\" type=\"text\" ng-model=\"cart.data.totals.discount.subtitle\">\n                            <button class=\"input__button\" ng-click=\"applyCoupon(cart.data.totals.discount.subtitle)\"><span class=\"outer-arrow-wrapper\"><span class=\"arrow\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"52\" height=\"12\" viewBox=\"-30 0 52 12\" enable-background=\"new -30 0 52 12\"><path fill=\"#fff\" d=\"M22 6l-6-6v5h-46v2h46v5l6-6z\"></path></svg></span></span></button>\n                        </div>\n                        <div class=\"cart-discount__response\">\n                            <span class=\"cart-discount__response--error\" ng-show=\"discountErrorMessage\">\n                                <p><strong>{{discountErrorMessage}}</strong></p>\n                                <p>If you need help, please contact customer service at <a href=\"mailto:info@betabrand.com?subject=Discount code help\">info@betabrand.com</a> or <a href=\"tel:(800) 694-9491\">(800) 694-9491</a></p>\n                            </span>  \n                            <span class=\"cart-discount__response--success\" ng-show=\"discountSuccessMessage\">{{discountSuccessMessage}}</span>                    \n                        </div>\n                    </form>\n                </div>\n                <ul class=\"cart-totals__prices\" ng-show=\"!cart.calculatingTotals\">\n                    <li class=\"cart-totals__{{key}}\" ng-repeat=\"item in cart.data.totals | toArray : false | orderBy:\'position\'\" ng-if=\"item.code!=\'grand_total\' || cart.mostRecentPromise.promise.$$state.status\">\n                        <div class=\"cart-totals__label line__{{item.title | lowercase}}\">{{item.title}}:</div>\n                        <div class=\"cart-totals__price line__{{item.title | lowercase}}\">{{item.value | currency}}</div>\n                    </li>\n                </ul>\n                <ul class=\"cart-totals__prices--total\" ng-show=\"!cart.mostRecentPromise.promise.$$state.status\">\n                    <li>\n                        <div class=\"cart-totals__label line__total\">Total:</div>\n                        <div class=\"cart-totals__price line__total\"><span class=\"fa fa-refresh fa-spin\"></span></div>\n                    </li>\n                    \n                </ul>\n            </div>\n        </div>\n        \n    </div>\n\n    <div class=\"cart-message\" ng-if=\"cart.data.items.length\">\n        <span ng-if=\"!customerService.data.loggedIn && cart.data.freeShippingOffer.freeShippingActive !== true\">\n            Get <span class=\"cart-message__free-shipping\">free shipping</span> when you  <a href class=\"signin__link\" ng-click=\"customerService.showLoginModal()\">login</a>.\n            <!-- Spend {{cart.data.freeShippingOffer.remainingAmount | currency}} more to get <strong>free shipping</strong>. -->\n        </span>\n\n        <span ng-if=\"customerService.data.loggedIn || cart.data.freeShippingOffer.freeShippingActive === true\">\n            You qualify for <span class=\"cart-message__free-shipping\">free shipping!</span>\n        </span>\n    </div>\n\n    <div class=\"cart-checkout\" ng-if=\"cart.data.items.length\">\n        <div class=\"row\">\n            <a ng-disabled=\"!cart.mostRecentPromise.promise.$$state.status\" ng-class=\"{disabled: !cart.mostRecentPromise.promise.$$state.status}\" class=\"cart-checkout__button button primary\" href ng-click=\"openCheckout()\">Checkout</a>\n        </div>\n        <div ng-if=\"!cart.hasCrowdfundingItems\" class=\"row\">\n            <button ng-disabled=\"!cart.mostRecentPromise.promise.$$state.status\" class=\"button paypal tertiary\" ng-click=\"paypalCheckout()\">\n                <i class=\"fa fa-paypal\"></i> Checkout with Paypal\n            </button>\n        </div>\n    </div>\n\n    <div class=\"cart-crosssells\" ng-if=\"cart.data.crosssells.length && cart.data.items.length\">\n        <div class=\"row\">\n            <h5 class=\"cart-crossells__title\">You might also like</h5>\n            <div\n                class=\"cart-crosssells__product column__4\"\n                ng-repeat=\"product in cart.data.crosssells track by $index\">\n                    <crosssell product=\"::product\" ng-if=\"cart.showCart\" source=\"Cart Page\"></crosssell>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"cart__loading-wrapper\" ng-if=\"!initialized\">\n        <span class=\"cart__loading fa fa-refresh fa-spin\" ></span>\n    </div>\n\n    <div class=\"cart__message\" ng-if=\"initialized\">\n        <div class=\"cart__message-content\" ng-show=\"!cart.data.items\" >\n            <div class=\"message__icon\"><img src=\"/angular/images/fire-cart/empty-fire-cart.svg\"></div>\n            <h4>Your cart is empty and sad</h4>\n            <a ng-href=\"/shop\" class=\"button auto primary\">Shop Now</a>\n            \n        </div>\n    </div>\n\n</div>\n");
  $templateCache.put("/angular/app/category/category.html", "<div id=\"category\" class=\"category category__{{data.id}}\">\n\n    <div class=\"category__intro\" ng-class=\"{\'top__level\' : !data.products}\" ng-if=\"!data.customHtml\">\n        <div class=\"intro__content\">\n            <div class=\"branding\">\n                <h1 ng-if=\"collectionLogo\" class=\"visuallyhidden\">{{::data.name}}</h1>\n                <h1 ng-if=\"collectionLogo && isPhone\">{{::data.name}}</h1>\n                <img class=\"logo logo__{{data.id}}\" ng-src=\"{{::data.logo}}\" alt=\"{{::data.name}}\" ng-if=\"collectionLogo && !isPhone\">\n                <h1 ng-if=\"!collectionLogo\">{{::data.name}}</h1>\n            </div>\n            <p class=\"category__description\" ng-bind-html=\"::data.description\"></p>\n        </div>\n\n        <div afkl-lazy-image=\"{{::data.image}} 480w, {{::data.image}} 768w, {{::data.image}}\" class=\"afkl-lazy-wrapper afkl-img-ratio-1-1 category__cover\" afkl-lazy-image-options=\"{className: \'category__image\', \'nolazy\': true}\"></div>\n\n        <div class=\"category__imageoverlay\"></div>\n        \n    </div>\n\n    <div class=\"category-intro--custom\" ng-if=\"data.customHtml\" ng-bind-html=\"data.customHtml | sanitize\" compile></div>\n\n    <filter-sorter data=\"data\" filter-sorters=\"filterSorter\" ng-show=\"::data.products\"></filter-sorter>\n\n    <section class=\"category__products grid-container\">\n        <div class=\"product-card__submit grid-item\" ng-if=\"data.id==67 || data.id==164 || data.id==168\">\n            <div class=\"product__pad\">\n                <submit-idea></submit-idea>\n            </div>\n        </div>\n\n        <product-card\n            class=\"category__product grid-item\"\n            product=\"product\"\n            category=\"data.filteredProducts\"\n            index=\"{{$index}}\"\n            is-think-tank-category=\"data.isThinkTankCategory\"\n            ng-repeat=\"product in data.filteredProducts track by product.id\"\n            ></product-card>\n\n            <p class=\"category-products__emptyresults\" ng-if=\"data.filteredProducts.length == 0\">\n                Sorry, the filters you selected didn\'t match any products.\n            </p>\n\n    </section>\n\n\n    <div class=\"collection__categories\">\n    \n        <div class=\"collection__category\" ng-repeat=\"category in data.children | orderBy: \'position\'\" ng-show=\"!data.products\">\n            <a ng-href=\"{{category.url}}\">\n                <div class=\"collection__top\">\n                    <h4>{{category.name | removeCollectionPrefix}}</h4>\n                    <img width=\"997\" height=\"304\" ng-src=\"{{category.thumbnail}}\">\n                </div>\n                <div class=\"collection__bottom\">\n                    <h4>{{category.name}}</h4>\n                    <p ng-bind-html=\"::category.description\"></p>\n                </div>\n            </a>                \n        </div>\n        \n    </div>\n\n    <div class=\"category__crosssells\" ng-if=\"crosssells.length\">\n        <h3>Other products you might like:</h3>\n        <div class=\"grid-container\">\n            <div ng-repeat=\"product in crosssells track by $index\" class=\"grid-item\">\n                <crosssell product=\"::product\" source=\"Category Page\"></crosssell>\n            </div>\n            \n        </div>\n    </div>\n\n</div>\n");
  $templateCache.put("/angular/app/category/filter-sorter.html", "<div class=\"filters-wrapper\" id=\"filters__sorters\">\n    <div class=\"filters-sorters-band-wrapper\" id=\"filters-sorters-band-wrapper\">\n\n        <div class=\"title\">{{::data.name}}</div>\n        <p class=\"count\"><span>{{::data.products.length}}</span> Products</p>\n\n        <div class=\"filters-sorters-band\" off-click=\"showFilters = false; showSorters=false;\">\n            <div class=\"filters\" ng-class=\"{active:showFilters}\">\n\n                <div\n                    class=\"filter-label\"\n                    ng-click=\"handleFilterClick()\">\n                        Filter by:\n\n                        <span class=\"selected\" ng-if=\"filter !== \'!!\'\" ng-repeat=\"(key,filter) in filterSorters.selectedFilterLabels\">\n                            {{filter.split(\'+\').join(\' &amp; \')}}\n                            <span class=\"cancel\"\n                                ng-class=\"{hide:filterLabel==\'all\'}\"\n                                ng-click=\"clearFilter(key); $event.stopPropagation()\">\n                                    <i class=\"fa fa-times-circle\"></i>\n                            </span>\n                        </span>\n                        <span ng-if=\"noFilters()\">All</span>\n\n                        <span class=\"down-arrow\"><i class=\"fa fa-angle-down\"></i></span>\n                </div>\n                \n                <div class=\"dropdown filters-dropdown\">\n                    <span ng-if=\"data.filters.gender.length > 1\">\n                        \n                        <h5>Gender:</h5>\n                        \n                        <ul class=\"filter-categories\">\n                            <li\n                                class=\"filter option\"\n                                ng-class=\"{active:filterSorters.selectedFilter[\'gender\'] == \'men\'}\"\n                                ng-if=\"_.contains(data.filters.gender, \'men\')\"\n                                ng-click=\"changeFilter(\'gender\', \'men\', \'men\\\'s\')\">\n                                    Men\'s\n                            </li>\n                            <li\n                                class=\"filter option\"\n                                ng-class=\"{active:filterSorters.selectedFilter[\'gender\'] == \'women\'}\"\n                                ng-if=\"_.contains(data.filters.gender, \'women\')\"\n                                ng-click=\"changeFilter(\'gender\', \'women\', \'women\\\'s\')\">\n                                    Women\'s\n                            </li>\n                            <li\n                                class=\"filter option\"\n                                ng-class=\"{active:filterSorters.selectedFilter[\'gender\'] == \'unisex\'}\"\n                                ng-if=\"_.contains(data.filters.gender, \'unisex\')\"\n                                ng-click=\"changeFilter(\'gender\', \'unisex\', \'unisex\')\">\n                                    Unisex\n                            </li>\n                        </ul> \n\n                    </span>\n\n                    <span ng-if=\"data.filters.classification.length > 1\">\n                        \n                        <h5>Category:</h5>\n                        \n                        <ul class=\"filter-types classification\">\n                            <li\n                                class=\"filter option\"\n                                ng-class=\"{active:filterSorters.selectedFilter[\'classification\'] == type}\"\n                                ng-repeat=\"type in data.filters.classification | orderBy: type\"\n                                ng-click=\"changeFilter(\'classification\', type, type)\">\n                                    {{type.split(\'+\').join(\' &amp; \')}}\n                            </li>\n                        </ul>\n\n                    </span>\n\n                    <span ng-if=\"data.filters.subClassification.length > 1 && !data.isVotingCategory && enableSubClassification\">                            \n                        \n                        <h5>Type:</h5>\n                        \n                        <ul class=\"filter-types\">\n                            <li\n                                class=\"filter option\"\n                                ng-class=\"{active:filterSorters.selectedFilter[\'subClassification\'] === type}\"\n                                ng-repeat=\"type in data.filters.subClassification | orderBy: type\"\n                                ng-click=\"changeFilter(\'subClassification\', type, type)\">\n                                    {{type.split(\'+\').join(\' &amp; \')}}\n                            </li>\n                        </ul>\n\n                    </span>\n\n                    <span ng-if=\"data.filters.colors && !data.isVotingCategory\">\n                        \n                        <h5>Color:</h5>\n\n                        <ul class=\"filter-colors filter-list\">\n                            <li\n                                class=\"filter option color-{{color}}\"\n                                ng-class=\"{\'active\': filterSorters.selectedFilter[\'color\'] == color}\"\n                                ng-repeat=\"color in data.filters.colors\"\n                                ng-click=\"changeFilter(\'color\',color, color)\">{{color}}\n                            </li>\n                        </ul>\n\n                    </span>\n\n                </div>\n            </div>\n\n            <div class=\"sorters\" ng-class=\"{active:showSorters}\">\n                \n                <div class=\"filter-label\" ng-click=\"handleSorterClick()\">Sort by: <span class=\"selected\">{{sorterLabel}}</span><span class=\"down-arrow\"><i class=\"fa fa-angle-down\"></i></span></div>\n\n                <div class=\"dropdown\">\n                    <ul>\n\n                        <li\n                            class=\"sort option\"\n                            ng-class=\"{active: filterSorters.selectedSorter==\'hot\'}\"\n                            ng-click=\"changeSorter(\'hot\', \'Hot\', true)\">\n                                Hot\n                        </li>\n\n                        <li\n                            class=\"sort option\"\n                            ng-class=\"{active: filterSorters.selectedSorter==\'new\'}\"  \n                            ng-if=\"data.isVotingCategory\"\n                            ng-click=\"changeSorter(\'new\', \'New\', false)\">\n                                New\n                        </li>\n\n                        <li\n                            class=\"sort option {{filterSorters.sortReverse}}\"\n                            ng-class=\"{active: filterSorters.selectedSorter==\'prices.final\' && !filterSorters.sortReverse}\"\n                            ng-if=\"!data.isVotingCategory\"\n                            ng-click=\"changeSorter(\'prices.final\', \'Price (Low to High)\', false);\"\n                            >\n                                Price (Low to High)\n                        </li>\n\n                        <li\n                            class=\"sort option\"\n                            ng-class=\"{active: (filterSorters.selectedSorter==\'prices.final\' && filterSorters.sortReverse) }\"\n                            ng-if=\"!data.isVotingCategory\"\n                            ng-click=\"changeSorter(\'prices.final\', \'Price (High to Low)\', true);\"\n                            >\n                                Price (High to Low)\n                        </li>\n\n                        <li\n                            class=\"sort option\"\n                            ng-class=\"{active: (filterSorters.selectedSorter==\'thinktankCounts.crowdfunding.percent_to_goal\' && filterSorters.sortReverse) }\"\n                            ng-if=\"data.isThinkTankCategory && !data.isVotingCategory\"\n                            ng-click=\"changeSorter(\'thinktankCounts.crowdfunding.percent_to_goal\', \'Percent to Goal (High to Low)\', true);\"\n                            >\n                                Percent to Goal (High to Low)\n                        </li>\n\n                        <li\n                            class=\"sort option\"\n                            ng-class=\"{active: (filterSorters.selectedSorter==\'thinktankCounts.crowdfunding.percent_to_goal\' && !filterSorters.sortReverse) }\"\n                            ng-if=\"data.isThinkTankCategory && !data.isVotingCategory\"\n                            ng-click=\"changeSorter(\'thinktankCounts.crowdfunding.percent_to_goal\', \'Percent to Goal (Low to High)\', false);\"\n                            >\n                                Percent to Goal (Low to High)\n                        </li>\n\n                        <li\n                            class=\"sort option\"\n                            ng-class=\"{active: (filterSorters.selectedSorter==\'thinktankCounts.voting.count\' && filterSorters.sortReverse) }\"\n                            ng-if=\"data.isVotingCategory\"\n                            ng-click=\"changeSorter(\'thinktankCounts.voting.count\', \'Votes (High to Low)\', true);\"\n                            >\n                                Votes (High to Low)\n                        </li>\n\n                        <li\n                            class=\"sort option\"\n                            ng-class=\"{active: (filterSorters.selectedSorter==\'thinktankCounts.voting.count\' && !filterSorters.sortReverse) }\"\n                            ng-if=\"data.isVotingCategory\"\n                            ng-click=\"changeSorter(\'thinktankCounts.voting.count\', \'Votes (Low to High)\', false);\"\n                            >\n                                Votes (Low to High)\n                        </li>\n\n                        <li\n                            class=\"sort option\"\n                            ng-class=\"{active: (filterSorters.selectedSorter==\'commentsCount.count\' && filterSorters.sortReverse) }\"\n                            ng-if=\"data.isThinkTankCategory\"\n                            ng-click=\"changeSorter(\'commentsCount.count\', \'Comments (High to Low)\', true);\"\n                            >\n                                Comments (High to Low)\n                        </li>\n\n                        <li\n                            class=\"sort option\"\n                            ng-class=\"{active: (filterSorters.selectedSorter==\'commentsCount.count\' && !filterSorters.sortReverse) }\"\n                            ng-if=\"data.isThinkTankCategory\"\n                            ng-click=\"changeSorter(\'commentsCount.count\', \'Comments (Low to High)\', false);\"\n                            >\n                                Comments (Low to High)\n                        </li>\n\n\n                    </ul>\n                </div>\n\n            </div>\n        </div>  \n    </div>\n</div>\n");
  $templateCache.put("/angular/app/category/special/category-dpyp.html", "<div class=\"category dpyp-category\">\n    <div class=\"category-header\">\n        <video src=\"/media/videos/dpyp-video.mp4\" autoplay loop poster=\"/media/videos/dpyp-video-poster.jpg\" ng-if=\"isDesktop\"></video>\n        <img class=\"category-header__poster\" src=\"/media/videos/dpyp-video-poster.jpg\" alt=\"Dress Pant Yoga Pants\" ng-if=\"!isDesktop\">\n        <div class=\"category__image-overlay\"></div>\n\n        <div class=\"category-header__title\">\n            <h1>Dress Pant <img src=\"/media/configurator/dpyp/icons/lotus-white.svg\"> Yoga Pants</h1>\n            <h2>Free Shipping &amp; Free Returns</h2>\n        </div>\n    </div>\n    <div class=\"category-header__description\">\n        <p>Dress Pant Yoga Pants combine sophisticated styling with a soft, stretch performance knit. We think they\'ll be the <span>most comfortable pants</span> you ever wear to work.</p> \n    </div>\n\n    <div class=\"dpyp-influence\">\n        <h6>As featured in:</h6>\n        <div class=\"category-header__influence-logos\">\n            <span><img src=\"/media/configurator/dpyp/logos/the-verge-logo.png\" alt=\"The Verve\"></span>\n            <span><img src=\"/media/configurator/dpyp/logos/glamour-logo.png\" alt=\"Glamour\"></span>\n            <span><img src=\"/media/configurator/dpyp/logos/daily-mail-logo.png\" alt=\"Daily Mail\"></span>\n            <span><img src=\"/media/configurator/dpyp/logos/abc-news-logo.png\" alt=\"ABC News\"></span>\n            <span><img src=\"/media/configurator/dpyp/logos/washington-post-logo.png\" alt=\"Washington Post\"></span>\n        </div>\n    </div>\n\n    <h4 class=\"decorated\"><span>The collection</span></h4>\n    \n    <p>Yoga pants for the office? We don\'t think that\'s a stretch. Far and away our most popular crowdfunded products ever!</p>\n\n    <div class=\"category-styles\">\n        <div class=\"category-styles__style\" ng-repeat=\"style in configurator.styles | toArray : false | orderBy:\'position\'\">\n            <a ng-href=\"{{style.url}}\">\n                <div class=\"category-styles__image\">\n                    <img ng-src=\"{{::style.image}}\" alt=\"{{style.label[0]}}\"/>\n                </div>\n                <h3>{{::style.label[0]}}</h3>\n            </a>\n            <div class=\"category-styles__swatches\">\n                <a ng-href=\"{{product.url}}\" ng-repeat=\"product in style.products\" ng-style=\"{\'background-image\': \'url(\' + product.swatch + \')\'}\" ng-mouseover=\"style.hoveredStyle = product.swatchLabel;\" ng-mouseleave=\"style.hoveredStyle = style.products.length + \' styles\'\">{{product.swatchLabel}}</a>\n                <div>{{style.hoveredStyle}}</div>\n            </div>\n\n        </div>\n    </div>\n\n    <div class=\"category__alt\">\n        \n        <h4 class=\"decorated\"><span>Travel Yoga Pants</span></h4>\n\n        <p>Our classic yoga pants styles but with extra hidden pockets to keep your important documents safe while traveling.</p>\n\n        <div class=\"category__products grid-container\">\n            <product-card \n                class=\"category__product\" \n                product=\"product\" \n                index=\"{{$index}}\" \n                ng-repeat=\"product in configurator.travelProducts track by $index\"></product-card>\n        </div>\n\n    </div>\n\n</div>\n");
  $templateCache.put("/angular/app/checkout/checkout.html", "<div class=\"checkout\" ng-class=\"{\'logged-in\':customerService.data.loggedIn}\">\n\n    <p class=\"checkout__login\" ng-if=\"!customerService.data.loggedIn\">\n        You are checking out as guest. <a href class=\"signin__link\" ng-click=\"customerService.showLoginModal()\">Sign in/Sign up</a> to checkout faster<span ng-if=\"!cart.data.freeShippingOffer.freeShippingActive\"> and get <span class=\"checkout__free-shipping\">free shipping</span></span>.\n    </p>\n\n    <div class=\"column__6\">\n        <div class=\"checkout__shipping checkout__step\">\n\n            <h3><i class=\"betabrand-package\"></i>Shipping &amp; Billing Info</h3>\n\n            <div class=\"checkout__block\">\n\n                <h4 ng-show=\"!checkoutService.shippingIsSameAsBilling\">Shipping</h4>\n\n                <div class=\"shipping-select__container\" ng-show=\"checkoutService.data.saved_addresses.length && !addShippingAddress\">\n\n                    <select class=\"shipping-select\" ng-if=\"!addShippingAddress\" ng-options=\"address.id as (address.name + \', \' +address[\'street-address\'] + \', \'+ address.locality +\', \'+ address.region +\', \'+ address.country  ) for address in checkoutService.data.saved_addresses\" ng-model=\"checkoutService.data.shipping.id\" ng-change=\"shippingAddressIsSaved ? submitShippingAddress() : false\">\n                        <option value=\"\">Select an Address</option>\n                    </select>\n\n                    <a href class=\"add__address\" ng-click=\"toggleAddAddress(\'shipping\')\" ng-hide=\"addShippingAddress\">Add a new address</a>\n\n                </div>\n\n                <div ng-show=\"!checkoutService.data.saved_addresses.length || addShippingAddress\">\n\n                    <checkout-address-form class=\"checkout-steps-address__container\" shipping-address-is-saved=\"shippingAddressIsSaved\" model-name=\"checkoutService.data.shipping\" service=\"checkoutService\" form-name=\"shipping\" submit-method=\"submitShippingAddress()\" mode=\"shippingFormMode\" logged-in=\"customerService.data.loggedIn\" use-for-billing=\"checkoutService.shippingIsSameAsBilling\" show-errors=\"showshippingErrors\"></checkout-address-form>\n\n                    <a href class=\"add__address\" ng-click=\"toggleAddAddress(\'shipping\')\" ng-show=\"checkoutService.data.saved_addresses.length && addShippingAddress\">Use a saved address</a>\n\n                </div>\n\n                <div class=\"use__shipping\">\n                    <label><input class=\"shipping-use-same-address-for-billing\" name=\"use_same_address_for_billing\" type=\"checkbox\" ng-change=\"shippingAddressIsSaved = false; validateCheckout()\" ng-model=\"checkoutService.shippingIsSameAsBilling\"> Use for billing address</label>\n                </div>\n\n                <div class=\"billing__address\" ng-show=\"!checkoutService.shippingIsSameAsBilling\">\n\n                    <h4>Billing</h4>\n\n                    <div ng-show=\"checkoutService.data.saved_addresses.length\">\n\n                        <select class=\"shipping-select\" ng-if=\"!addBillingAddress\" ng-options=\"address as (address.name + \', \' +address[\'street-address\'] + \', \'+ address.locality +\', \'+ address.region +\', \'+ address.country  ) for address in checkoutService.data.saved_addresses track by address.id\" ng-model=\"checkoutService.data.billing\" ng-change=\"shippingAddressIsSaved ? submitBillingAddress() : false\" >\n                            <option value=\"\">Select an Address</option>\n                        </select>\n                        <a href class=\"add__address\" ng-click=\"toggleAddAddress(\'billing\')\" ng-hide=\"addBillingAddress\">Add a new address</a>\n\n                    </div>\n\n                    <div ng-show=\"!checkoutService.data.saved_addresses.length || addBillingAddress\">\n\n                        <checkout-address-form class=\"checkout-steps-address__container\" shipping-address-is-saved=\"shippingAddressIsSaved\" model-name=\"checkoutService.data.billing\" service=\"checkoutService\" form-name=\"billing\" submit-method=\"submitBillingAddress()\" mode=\"shippingFormMode\" use-for-billing=\"checkoutService.shippingIsSameAsBilling\" show-errors=\"showbillingErrors\"></checkout-address-form>\n\n                        <a href class=\"add__address\" ng-click=\"toggleAddAddress(\'billing\')\" ng-show=\"checkoutService.data.saved_addresses.length && addBillingAddress\">Use a saved address</a>\n\n                    </div>\n\n                </div>\n\n            </div>\n            \n            <button type=\"submit\" class=\"primary\" ng-click=\"submitShippingBillingStep()\" ng-show=\"!shippingAddressIsSaved\" ng-disabled=\"(checkoutService.mostRecentPromise && !checkoutService.mostRecentPromise.promise.$$state.status)\">Next: Shipping Method</button>\n\n        </div>\n\n        <shipping-method shipping-address-is-saved=\"shippingAddressIsSaved\"></shipping-method>\n\n        <div class=\"checkout__shipping checkout__step\" id=\"payment__method\" ng-show=\"shippingAddressIsSaved\">\n            <h3><i class=\"betabrand-payment\"></i> Payment</h3>\n            <div ng-show=\"shippingAddressIsSaved\" class=\"payment-method__container\">\n                <div class=\"payment__method payment__method--{{method.code}} checkout__block\" ng-repeat=\"(key, method) in checkoutService.data.payment.methods\">\n                    <input id=\"payment_method[{{method.code | lowercase}}]\" name=\"payment_method[{{method.code | lowercase}}]\" type=\"radio\" ng-value=\"method.code\" ng-model=\"checkoutService.data.payment.selected.method\" ng-disabled=\"!checkoutService.mostRecentPromise.promise.$$state.status\">\n                    <form id=\'payment-{{method.code}}\' novalidate name=\'{{method.code}}\'>\n                        <div ng-if=\"!method.html\" class=\"payment__html\">\n                            <div class=\"payment__title\">\n                                <label for=\"payment_method[{{method.code}}]\" class=\"label__radio\">{{method.title}}</label>\n                            </div>\n                        </div>\n                        <div ng-if=\"method.html\" compile recompile=\"method.html\" class=\"payment__html\" ng-bind-html=\"method.html | sanitize\"></div>\n                    </form>\n                </div>\n            </div>\n            <p class=\"checkout__shipping--message\" ng-show=\"!shippingAddressIsSaved\">\n                Please save your shipping address to see your payment methods\n            </p>\n\n        </div>\n\n        <div class=\"cart-checkout\" ng-show=\"shippingAddressIsSaved\">\n            <div class=\"agreement-wrapper\">\n                <li class=\"agreement-wrapper__checkbox\">\n                    <input type=\"checkbox\" name=\"newsletter\" ng-change=\"trackingService.trackEvent(\'Newsletter Opt-out\', {\'Source\':\'Checkout\'})\" ng-model=\"checkoutService.joinNewsletter\">\n                </li>\n                <li class=\"agreement-wrapper__label\">\n                    <span>Sign up for the Betabrand newsletter.</span>\n                </li>\n            </div>\n            <button\n            class=\"cart-checkout__submit button primary\"\n            ng-click=\"placeOrder({shippingAddress:true, billingAddress:true, shippingMethod:true, payment:true}, options)\"\n            ng-disabled=\"(checkoutService.mostRecentPromise && !checkoutService.mostRecentPromise.promise.$$state.status)\">\n            <i class=\"fa fa-refresh fa-spin\" ng-if=\"loadingSpinner\"></i>\n            <i class=\"fa fa-shopping-cart\" ng-if=\"!loadingSpinner\"></i> Place Order</button>\n\n        </div>\n\n    </div>\n\n    <div class=\"column__6\" id=\"scroll__trigger\">\n        <div class=\"checkout__order checkout__step\" id=\"review__order\">\n            <h3><i class=\"betabrand-cart\"></i>Your Order</h3>\n            <div class=\"cart\">\n                <ul class=\"cart-products cart-products--checkout\" ng-show=\"cart.data.items.length\">\n                    <li class=\"cart-products__product\" ng-repeat=\"product in cart.data.items track by $index\" ng-cloak>\n                        <div class=\"cart-products__image\">\n                            <img ng-src=\"{{product.image}}\" alt=\"\">\n                            <div class=\"cart-products__badge preorder\" ng-if=\"product.preorder\">\n                                Pre-order\n                            </div>\n                            <div class=\"cart-products__badge crowdfunding\" ng-if=\"product.crowdfunding\">\n                                Fund It\n                            </div>\n                        </div>\n                        <div class=\"cart-products__info\">\n                            <div class=\"cart-products__name\">{{product.name}}</div>\n                            <div class=\"cart-products__options\">\n                                <div class=\"cart-products__quantity\">\n                                    <form>\n                                        <input type=\"number\" min=\"0\" inputmode=\"numeric\" pattern=\"[0-9]*\" ng-model=\"product.qty\" ng-required min=\"1\" ng-change=\"updateTotal(product)\">\n                                    </form>                \n                                </div>\n                                <div class=\"cart-products__option\" ng-repeat=\"(name, attribute) in product.options\">\n                                    {{::name}} : {{attribute}}\n                                </div>\n\n                                <div class=\"cart-products__total\">{{product.qty * product.price | currency}}</div>\n                            </div>\n                            <div ng-if=\"product.isFinalSale\" class=\'final-sale\'>Final sale, no returns or exchanges</div>\n                            <div class=\"cart-products__preorder-shipping\" ng-if=\"product.preorder\">\n                                Pre-Order: Ships in {{product.shippingDate}}\n                            </div>\n                            <div class=\"cart-products__crowdfunding-shipping\" ng-if=\"product.crowdfunding\">\n                                Crowdfunding: If fully funded, will ship for free in {{product.shippingDate}}\n                            </div>\n                            <div class=\"cart-products__rtw-shipping\" ng-if=\"!product.preorder && !product.crowdfunding\" ng-show=\"checkoutService.data.shipping_method.selectedTitle\">\n                                Shipping: {{checkoutService.data.shipping_method.selectedTitle}}\n                            </div> \n                            <div class=\"cart-products__remove\" ng-click=\"!product.illusion && removeProduct(product, $index)\"><i class=\"betabrand-close\"></i></div>\n                        </div>\n                    </li>\n                </ul>\n\n                <div ng-show=\"!cart.data.promo\">\n                    <div class=\"cart-discount\">\n                        <form novalidate>\n                            <div class=\"cart-discount__inputs\">\n                                <input class=\"text__input--button\" autocomplete=\"off\" name=\"discount\" placeholder=\"Enter a discount code\" type=\"text\" ng-model=\"cart.data.totals.discount.subtitle\">\n                                <button class=\"input__button\" ng-click=\"applyCoupon(cart.data.totals.discount.subtitle)\"><span class=\"outer-arrow-wrapper\"><span class=\"arrow\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"52\" height=\"12\" viewBox=\"-30 0 52 12\" enable-background=\"new -30 0 52 12\"><path fill=\"#fff\" d=\"M22 6l-6-6v5h-46v2h46v5l6-6z\"></path></svg></span></span></button>\n                            </div>\n                            <div class=\"cart-discount__response\">\n                                <span class=\"cart-discount__response--error\" ng-show=\"discountErrorMessage\">\n                                    <p><strong>{{discountErrorMessage}}</strong></p>\n                                    <p>If you need help, please contact customer service at <a href=\"mailto:info@betabrand.com?subject=Discount code help\">info@betabrand.com</a> or <a href=\"tel:(800) 694-9491\">(800) 694-9491</a></p>\n                                \n                                </span>  \n                                <span class=\"cart-discount__response--success\" ng-show=\"discountSuccessMessage\">{{discountSuccessMessage}}</span>                    \n                            </div>\n                        </form>\n                    </div>\n                </div>\n                <div ng-show=\"cart.data.promo\">\n                    <a href class=\"cart-discount__button cart-discount__button-remove active checkout\" ng-click=\"cart.removeCoupon()\"><span>Remove Discount: <span>{{cart.data.promo}} <i class=\"cart-discount__button-remove--icon betabrand betabrand-close\"></i></span></span></a>\n                </div>\n\n                <div class=\"cart-totals cart-totals--checkout\" ng-show=\"cart.data.items.length\">\n\n                    <ul class=\"cart-totals__prices\" ng-show=\"!cart.calculatingTotals\">\n                        <li class=\"cart-totals__{{item.code}}\" ng-repeat=\"item in cart.data.totals | toArray : false | orderBy:\'position\'\" ng-show=\"item.code!=\'grand_total\' || cart.mostRecentPromise.promise.$$state.status\">\n                            <div class=\"cart-totals__label\">{{item.title}}:</div>\n                            <div class=\"cart-totals__price\">{{item.value | currency | zeroToFree}}</div>\n                        </li>\n                    </ul>\n                    <ul class=\"cart-totals__prices\" ng-if=\"!cart.mostRecentPromise.promise.$$state.status\">\n                        <li>\n                            <div class=\"cart-totals__label\">Total:</div>\n                            <div class=\"cart-totals__price\"><span class=\"fa fa-refresh fa-spin\"></span></div>\n                        </li>\n\n                    </ul>\n\n                </div>\n\n\n                <div class=\"cart__message\" ng-show=\"!cart.data.items\">\n                    <div class=\"message__icon pe-7s-cart\"></div>\n                    <h4>Your cart is empty and sad</h4>\n                    <a ng-href=\"/shop\" class=\"button auto primary\">Shop Now</a>\n                </div>\n            </div>\n\n            <div class=\"secure-badges\">\n                <img src=\"/angular/images/checkout/authorize-net.png\" alt=\"\">\n                <img src=\"/angular/images/checkout/comodo-ssl-logo.png\" alt=\"\">\n            </div>\n        </div>\n\n    </div>\n\n</div>\n");
  $templateCache.put("/angular/app/checkout/checkout-paypal.html", "<div class=\"checkout\">\n    \n    <div class=\"row\">\n        <div class=\"column__6\">\n            <div class=\"checkout__shipping checkout__step\">\n                <h3>Shipping Info</h3>\n                <p class=\"shipping__message\">We\'ve imported your shipping address from Paypal. Please verify that it is correct.</p>\n                <div class=\"checkout__block\">\n                    <h4>Shipping Address</h4>\n                    <div ng-show=\"checkoutService.data.saved_addresses.length && !addShippingAddress\">\n\n                        <select class=\"shipping-select\" ng-if=\"!addShippingAddress\" ng-options=\"address as (address.name + \', \' +address[\'street-address\'] + \', \'+ address.locality +\', \'+ address.region +\', \'+ address.country  ) for address in checkoutService.data.saved_addresses track by address.id\" ng-model=\"checkoutService.data.shipping\" ng-change=\"submitShippingAddress()\">\n                            <option value=\"\">Select an Address</option>\n                        </select>\n\n                        <a href class=\"add__address pull-right\" ng-click=\"toggleAddAddress(\'shipping\')\" ng-hide=\"addShippingAddress\">Add an address</a>\n\n                    </div>\n\n                    <div ng-show=\"!checkoutService.data.saved_addresses.length || addShippingAddress\">\n\n                        <address-form class=\"checkout-steps-address__container\" shipping-address-is-saved=\"shippingAddressIsSaved\" model-name=\"checkoutService.data.shipping\" service=\"checkoutService\" form-name=\"shipping\" submit-method=\"submitShippingAddress()\" mode=\"shippingFormMode\"></address-form>\n\n                        <a href class=\"add__address pull-right\" ng-click=\"toggleAddAddress(\'shipping\')\" ng-hide=\"!addShippingAddress\">Saved addresses</a>\n\n                    </div>\n                    <!-- billing hidden for now -->\n                    <div ng-show=\"false\" class=\"checkout__shipping checkout__step\">\n                        <h3>Billing Address</h3>\n                        <address-form class=\"checkout-steps-address__container\" mode=\'billingFormMode\' model-name=\"checkoutService.data.billing\" service=\"checkoutService\" submitMethod=\"checkoutService.submitBillingAddress()\" form-name=\"billing\"></address-form>\n                    </div>\n                </div>\n                \n            </div>\n            <shipping-method shipping-address-is-saved=\"shippingAddressIsSaved\"></shipping-method>\n        </div>\n    <div class=\"column__6\" id=\"scroll__trigger\">\n        <div class=\"checkout__order checkout__step\" id=\"review__order\">\n            <h3>Your Order</h3>\n            <div class=\"cart\">\n\n                <ul class=\"cart-products cart-products--checkout\" ng-show=\"cart.data.items.length\">\n                    <li class=\"cart-products__product\" ng-repeat=\"product in cart.data.items track by $index\" ng-cloak>\n                        <div class=\"cart-products__image\">\n                            <img ng-src=\"{{product.image}}\" alt=\"\">\n                            <div class=\"cart-products__badge preorder\" ng-if=\"product.preorder\">\n                                Pre-order\n                            </div>\n                            <div class=\"cart-products__badge crowdfunding\" ng-if=\"product.crowdfunding\">\n                                Fund It\n                            </div>\n                        </div>\n                        <div class=\"cart-products__info\">\n                            <div class=\"cart-products__name\">{{product.name}}</div>\n                            <div class=\"cart-products__options\">\n                                <div class=\"cart-products__quantity\">\n                                    <form>\n                                        <input type=\"number\" min=\"0\" inputmode=\"numeric\" pattern=\"[0-9]*\" ng-model=\"product.qty\" ng-required min=\"1\" ng-change=\"updateTotal(product)\">\n                                    </form>                \n                                </div>\n                                <div class=\"cart-products__option\" ng-repeat=\"(name, attribute) in product.options\">\n                                    {{::name}} : {{attribute}}\n                                </div>\n\n                                <div class=\"cart-products__total\">{{product.qty * product.price | currency}}</div>\n                            </div>\n                            <div ng-if=\"product.isFinalSale\" class=\'final-sale\'>Final sale, no returns or exchanges</div>\n                            <div class=\"cart-products__preorder-shipping\" ng-if=\"product.preorder\">\n                                Pre-Order: Ships in {{product.shippingDate}}\n                            </div>\n                            <div class=\"cart-products__crowdfunding-shipping\" ng-if=\"product.crowdfunding\">\n                                Crowdfunding: If fully funded, will ship for free in {{product.shippingDate}}\n                            </div>\n                            <div class=\"cart-products__rtw-shipping\" ng-if=\"!product.preorder && !product.crowdfunding\" ng-show=\"checkoutService.data.shipping_method.selectedTitle\">\n                                Shipping: {{checkoutService.data.shipping_method.selectedTitle}}\n                            </div> \n                            <div class=\"cart-products__remove\" ng-click=\"!product.illusion && removeProduct(product, $index)\"><i class=\"betabrand-close\"></i></div>\n                        </div>\n                    </li>\n\n                </ul>\n\n                <div class=\"cart-totals cart-totals--checkout\" ng-show=\"cart.data.items.length\">\n\n                    <ul class=\"cart-totals__prices\" ng-show=\"!cart.calculatingTotals\">\n                        <li class=\"cart-totals__{{item.code}}\" ng-repeat=\"item in cart.data.totals | toArray : false | orderBy:\'position\'\" ng-show=\"item.code!=\'grand_total\' || cart.mostRecentPromise.promise.$$state.status\">\n                            <div class=\"cart-totals__label\">{{item.title}}:</div>\n                            <div class=\"cart-totals__price\">{{item.value | currency | zeroToFree}}</div>\n                        </li>\n                    </ul>\n                    <ul class=\"cart-totals__prices\" ng-if=\"!cart.mostRecentPromise.promise.$$state.status\">\n                        <li>\n                            <div class=\"cart-totals__label\">Total:</div>\n                            <div class=\"cart-totals__price\"><span class=\"fa fa-refresh fa-spin\"></span></div>\n                        </li>\n\n                    </ul>\n\n                    \n                </div>\n\n                <div class=\"cart-checkout\" ng-show=\"cart.data.items.length\">\n                    <button class=\"primary cart-checkout__button--paypal\" ng-click=\"placeOrder({ shippingMethod:true})\" ng-disabled=\"!shippingAddressIsSaved || !checkoutService.mostRecentPromise.promise.$$state.status\"><i class=\"fa fa-shopping-cart\"></i> Place Order</button>\n                </div>\n            </div>\n        </div>    \n        \n    </div>  \n    </div>\n\n\n\n</div>\n");
  $templateCache.put("/angular/app/checkout/checkout-success.html", "<div class=\"checkout-success\">  \n    <div class=\"container\">    \n        <div class=\"inner\">\n            <div class=\"checkout-success__text\">\n                <h3><i class=\"fa fa-check\"></i> Order Success</h3>\n                <p><ng-pluralize count=\"checkoutService.successData.orders.length\"\n                                 when=\"{\'1\': \'Order #{{checkoutService.successData.orderString}}\',\n                                     \'other\': \'Orders #{{checkoutService.successData.orderString}}\'}\">\n                    </ng-pluralize><br>\n                    <span ng-show=\"!isMobile\">Look for a confirmation email with purchase details soon. Once your order ships, you\'ll also receive an email with a tracking number. </span>Questions? Customer Service: <a ng-href=\"mailto:info@betabrand.com\">info@betabrand.com</a> or call <a ng-href=\"tel:800-694-9491\">800.694.9491</a></p>\n            </div>\n            <div class=\"checkout-success__refer\">\n                <h3>Give ${{referrals.settings.vanillaFriendReward}} & Get ${{referrals.settings.vanillaAdvocateReward}}</h3>\n                <p><span ng-show=\"!isMobile\">Good design deserves to be shared.</span> Get rewarded after a friend you refer makes their first purchase. Click below to share.</p>\n                <ul>\n                    <li ng-click=\"showReferralModal()\"><a href=\"\"><i class=\"betabrand-email\"></i> <span>Email</span></a></li>                    \n                    <li ng-click=\"showReferralModal()\"><a href=\"\"><i class=\"betabrand-facebook\"></i><span>Facebook</span></a></li>\n                    <li ng-click=\"showReferralModal()\"><a href=\"\"><i class=\"betabrand-twitter\"></i><span>Twitter</span></a></li>\n                </ul>\n\n                <div ng-repeat=\"product in checkoutService.successData.items\" ng-show=\"$index < 1\">\n                    <img ng-src=\"{{product.image.url}}\">\n                </div>\n            </div>        \n        </div>   \n    </div>   \n</div>\n");
  $templateCache.put("/angular/app/checkout/shipping-method.html", "<div class=\"checkout__shipping checkout__step\" id=\"checkout-shipping__method\" ng-show=\"shippingAddressIsSaved\">\n    \n    <h3><i class=\"betabrand-shipping-1\"></i>Shipping Method</h3>\n    <div class=\"checkout__shipping preorder-shipping__msg\" ng-if=\"cart.hasPreOrderItems() || cart.hasCrowdfundingItems\">\n        <span>The selected shipping method will be applied to each item in your order. Some items will ship separately and you will only be charged once for shipping. Additional taxes and duties may be required upon delivery.</span>\n    </div>  \n    <p ng-if=\"!checkoutService.data.shipping_method.methods\" class=\"shipping__message\">There are no shipping methods available for your address. Please try saving your shipping address again.  If you continue to experience this problem please contact us by email: <a target=\"_blank\" href=\"mailto:info@betabrand.com\">info@betabrand.com</a> or phone: <a target=\"_blank\" href=\"tel:18006949491\">(800) 694-9491</a>.</p>\n\n    <form class=\"checkout__block shipping-method-form\">\n        <div class=\"checkout-shipping__container\" ng-class=\"{\'required--focus\':!shippingMethodValid && showShippingMethodErrors}\">\n    \n            <div class=\"checkout-shipping__method\" ng-repeat=\"(key, value) in checkoutService.data.shipping_method.methods\">\n                <div class=\"checkout-shipping__row\" ng-repeat=\"method in value track by $index\">\n                    <input id=\"{{method.code}}\" name=\"shipping_method\" type=\"radio\" ng-value=\"method.code\" ng-change=\"submitShippingMethod()\" ng-model=\"checkoutService.data.shipping_method.selected\" ng-disabled=\"!checkoutService.mostRecentPromise.promise.$$state.status\">\n                    <label class=\"label__radio\" for=\"{{method.code}}\"><span compile ng-bind-html=\"method.title | sanitize\"></span></label>\n                    <div class=\"checkout-shipping__price\">{{method.price | currency | zeroToFree}}</div>\n                </div>\n            </div>\n\n            <div class=\"checkout-shipping__map\" ng-show=\"showStoreMap\">\n                <iframe src=\"https://www.google.com/maps/embed/v1/place?key=AIzaSyBumY8YpDoy2jvuH0iADsnxUeYQMPHC2Gs&q=Betabrand,780+Valencia+St,San+Francisco+CA&zoom=14\" width=\"220\" height=\"220\" frameborder=\"0\" style=\"border:0\"></iframe>\n            </div>\n            \n        </div>\n    </form>\n\n    <p class=\"checkout__shipping--message\" ng-show=\"!shippingAddressIsSaved\">\n        Please save your shipping address to see your shipping methods\n    </p>\n\n</div>\n");
  $templateCache.put("/angular/app/cms/cms.html", "<div class=\"cms\">\n	<div ng-if=\"data.content\" class=\"cms__content\" ng-bind-html=\"data.content | sanitize\" compile></div>\n</div>\n");
  $templateCache.put("/angular/app/colorselector/colorselector.html", "<ul class=\"product__colors\" ng-model=\"selectedProductColor\">\n    <li ng-repeat=\"obj in product.colorProducts | orderObjectBy:\'inventory\':true\" ng-click=\"changeColor(obj.id);selectedProductColor = obj.id\" data-id=\"{{obj.id}}\" data-inventory=\"{{obj.inventory}}\">\n    	<span ng-if=\"obj.swatch\" class=\"color__color {{(product.id == obj.id) ? \'active\' : \'\'}}\" style=\"background-image: url({{obj.swatch}})\"></span>\n    	<span ng-if=\"!obj.swatch\" class=\"color__color {{(product.id == obj.id) ? \'active\' : \'\'}} {{obj.color}}\" ng-class=\"{active:selectedProductColor == obj.id}\"></span>\n    </li>\n    <li ng-if=\"!product.colorProducts\">\n    	<span ng-if=\"product.swatch\" class=\"color__color active\" style=\"background-image: url({{product.swatch}})\"></span>\n    	<span ng-if=\"!product.swatch\" class=\"color__color active {{product.color}}\"></span>\n		<span class=\"color__name\">{{product.swatchLabel || product.color}}</span>\n    </li>\n</ul>");
  $templateCache.put("/angular/app/comments/comment.html", "<div>\n    <div class=\"comment__avatar\">\n        <img class=\"comment__avatar-pic\" ng-src=\"{{comment.user.avatar}}\" ng-alt=\"{{comment.user.name}}\">\n    </div>\n\n    <div class=\"comment__content\">\n\n        <div class=\"comment__user-details\">\n            <span class=\"comment__name\">{{comment.user.name}} </span>\n            <span class=\"comment__designer\" ng-if=\"highlights[comment.user.id] == \'designer\'\"><img src=\"/angular/images/designer-star.svg\" alt=\"Designer\">Designer</span>\n            <span class=\"comment__employee\" ng-if=\"comment.user.role != \'Collaborator\'\"><img src=\"/angular/images/bb.svg\" alt=\"Employee\"><span ng-if=\"comment.user.title\">{{comment.user.title}}</span><span ng-if=\"!comment.user.title\">Employee</span></span>\n            <span class=\"comment__timestamp\"> â€¢ {{comment.date | timeAgo}}</span>\n        </div>\n\n        <div class=\"comment__body break-long-text\" ng-show=\"!comment.edit\" ng-bind-html=\"comment.body\"></div>\n\n        <!-- Edit form -->\n        <form class=\"edit__form\" ng-if=\"comment.edit\" name=\'edit\' ng-submit=\"submitEdit(comment)\">\n            <textarea class=\"edit__input\" id=\"edit-input-{{comment.id}}\" ng-model=\"comment.newbody\" placeholder=\"Edit your comment...\"></textarea>\n            <button class=\"edit__submit secondary auto\" type=\'submit\'>Submit</button>\n            <button class=\"edit__cancel secondary auto\" ng-click=\"comment.edit = false;\">Cancel</button>\n        </form>\n\n        <div class=\"comment__actions\" ng-if=\"!comment.edit && !comment.deleted\">\n            <span class=\"comment__upvote\" ng-class=\"{\'comment__upvoted--upvoted\' : votes.data[comment.id]}\" ng-click=\"upvote(comment.id, \'up\');\">\n                <span class=\"comment__score\">{{comment.score}}</span>\n                <i class=\"fa fa-chevron-up comment__upvote-icon\" alt=\"Upvote\"></i>\n            </span>\n            <span class=\"comments__reply-link\" ng-if=\"!disableReply\" ng-click=\"toggleReply(comment)\">Reply</span>\n            <span class=\"comments__edit-link\" ng-if=\"comment.user.id == customer.id\" ng-click=\"toggleEdit(comment)\" title=\"Edit...\" alt=\"Edit...\"> â€¢ Edit</span>\n            <span class=\"comments__delete-link\" ng-if=\"comment.user.id == customer.id || customer.role.id\" ng-click=\"delete(comment)\"> â€¢ Delete</span>\n        </div>\n\n\n    </div>\n\n    <div class=\"comment__content--replies\">\n        <!-- Replies repeat -->\n        <ul class=\"reply__list\" ng-if=\"comment.replies\" ng-class=\"{\'reply__list--reply-line\' : comment.showReplyForm}\">\n            <li class=\"reply__wrapper\" ng-repeat=\"reply in comment.replies\" id=\"comment-{{ reply.id }}\" ng-if=\"!(reply.deleted && reply.replies.length == 0)\" ng-class=\"{\'comment__wrapper--direct-link\': reply.directLink}\">\n                <comment highlights=\"highlights\" thread-id=\"threadId\" thread=\"thread\" votes=\"votes\" comment=\"reply\" disable-reply=\"false\" customer=\"customer\" replies=\"reply.replies\"></comment>\n            </li>\n        </ul>\n    \n        <!-- Reply form -->\n        <form class=\"new-reply__form\" id=\"reply-form-{{comment.id}}\" ng-if=\"!disableReply && comment.showReplyForm && CommentsThreadService.currentCommentIdBeingReplied==comment.id\" name=\'new-reply\' ng-submit=\"submitReply(comment.id)\">\n            <textarea class=\"new-reply__input\" ng-model=\"reply.body\" placeholder=\"Write a reply...\"></textarea>\n            <button class=\"new-reply__submit auto secondary\" type=\'submit\'>Submit</button>\n            <button class=\"new-reply__cancel auto secondary\" ng-click=\"comment.showReplyForm = false;\">Cancel</button>\n        </form>\n        \n    </div>\n\n</div>\n");
  $templateCache.put("/angular/app/comments/commentsThread.html", "<div class=\"comments-wrapper\">\n    <div class=\"comments__add-comment\">\n        <h4>Have any comments? Let us know what you think.</h4>\n        <!-- Submit a new comment form -->\n        <form class=\"new-comment__form\" name=\'new-comment\' ng-submit=\"submitComment()\">\n            <textarea class=\"new-comment__textbox\" type=\'text\' ng-model=\"comment.body\" placeholder=\"Write a comment...\" required></textarea>\n            <button class=\"new-comment__submit auto secondary\" type=\'submit\' ng-disabled=\"isSubmitting\"><span ng-if=\"isSubmitting\"><i class=\"fa fa-refresh fa-spin\"></i></span> Submit{{isSubmitting ? \'ting\' : \'\'}}</button>\n        </form>        \n        <div class=\"comments__filters\">Order by: <a href=\"#\" ng-click=\"order(\'date\')\">Oldest</a>, <a href=\"#\" ng-click=\"order(\'-date\')\">Newest</a>, <a href=\"#\" ng-click=\"order(\'-score\')\">Score</a> </div>\n    </div>\n    <!-- Main discussion repeat -->\n    <ul class=\"comment__list\">\n        <li class=\"comment__wrapper\" ng-repeat=\"comment in thread.data | orderBy:orderField:false | limitTo: commentCount track by $index\" ng-class=\"{odd: $odd, even: $even, \'comment__wrapper--direct-link\': comment.directLink}\" id=\"comment-{{ comment.id }}\" ng-if=\"!(comment.deleted && comment.replies.length == 0)\">\n            <comment highlights=\"highlights\" comment=\"comment\" disable-reply=\"false\" customer=\"customer\" thread-id=\"threadId\" thread=\"thread\" votes=\"votes\" replies=\"comment.replies\"></comment>\n        </li>\n    </ul>\n    <div class=\"load__more-container\">\n        <button class=\"button primary load__more\" ng-click=\"loadMore()\" ng-if=\"commentCount <= thread.data.length\">Load more comments</button>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/directives/sizing-chart.html", "<div class=\"product-sizing__table columns__{{count}}\">\n    <div class=\"product-sizing__row product-sizing__header\">\n        <div class=\"column product-sizing__label product-sizing__label--bold\">{{title}}</div>\n		<div class=\"column product-sizing__label\" ng-repeat=\"label in columnLabels track by $index\">{{label}}</div>\n    </div>\n	<div class=\"product-sizing__row\" ng-repeat=\"row in rows track by $index\">\n        <div class=\"column product-sizing__label\">{{row.label}}</div>\n        <div class=\"column\" ng-repeat=\"value in row.values track by $index\" ng-if=\"unit\">{{value|measurement:unit}}</div>\n        <div class=\"column\" ng-repeat=\"value in row.values track by $index\" ng-if=\"!unit\">{{value}}</div>\n	</div>\n</div>\n");
  $templateCache.put("/angular/app/divvy/bike-for-life-discussion.html", "<div class=\"divvy divvy-category category\">\n\n    <div class=\"category__intro\">\n        <div class=\"intro__content\">\n            <div class=\"branding\">\n\n                <h1>Bike to Life</h1>\n                <div class=\"category__description\">\n                    <img src=\"/angular/images/thinktank/divvy/divvy-logo.png\" alt=\"\"> + <img src=\"/angular/images/thinktank/divvy/bb_logo_white.svg\" alt=\"\"> + <img src=\"/angular/images/thinktank/divvy/drink-tank-horz.png\" alt=\"\">\n                </div>\n            </div>\n        </div>\n\n        <img ng-src=\"/angular/images/thinktank/divvy/Divvy_Landing Page_1150x350.jpg\" alt=\"Bike to Life\" class=\"category__image\">\n                \n\n        <div class=\"category__imageoverlay\"></div>\n        \n    </div>\n\n    <div class=\"row category-content\">\n        <div class=\"column__12\">\n\n            <p class=\"gallery-description\">Biking to work, biking for fun, biking for your health, biking for the hell of it: What sort of cyclist-friendly clothing for all sorts of two-wheeled experiences? Join the discussion below. Got a suggestion for a new topic, or even a brand-new bike-related product? <submit-idea></submit-idea>.</p>\n\n            <p class=\"gallery-description\">Live in Chicago? Come to the <a href=\"http://www.drinktankthat.com/bike-to-life\">DIVVY+Betabrand Drink Tank event on August 6th!</a> </p>\n\n            <h3 class=\"gallery-title\">Click on a topic and join the discussion!</h3>\n\n            <ul class=\"category__products\">\n                <li class=\"gallery-product\">\n                    <a href=\"/night-visibility-discussion\">\n                        <div class=\"product__pad\">\n                            <img src=\"/angular/images/thinktank/divvy/1_NightVisibility_V2.jpg\" alt=\"\">\n                        </div>\n                    </a>\n                </li>\n                <li class=\"gallery-product\">\n                    <a href=\"/dont-sweat-it-discussion\">\n                        <div class=\"product__pad\">\n                            <img src=\"/angular/images/thinktank/divvy/2_DontSweatIt_V2.jpg\" alt=\"\">\n                        </div>\n                    </a>\n                </li>\n                <li class=\"gallery-product\">\n                    <a href=\"/join-the-club-discussion\">\n                        <div class=\"product__pad\">\n                            <img src=\"/angular/images/thinktank/divvy/3_JoinTheClub_V2.jpg\" alt=\"\">\n                        </div>\n                    </a>\n                </li>\n                <li class=\"gallery-product\">\n                    <a href=\"/miles-discussion\">\n                        <div class=\"product__pad\">\n                            <img src=\"/angular/images/thinktank/divvy/4_Miles_V2.jpg\" alt=\"\">\n                        </div>\n                    </a>\n                </li>\n                <li class=\"gallery-product\">\n                    <a href=\"/what-me-worry-discussion\">\n                        <div class=\"product__pad\">\n                            <img src=\"/angular/images/thinktank/divvy/5_WhatMeWorry_V2.jpg\" alt=\"\">\n                        </div>\n                    </a>\n                </li>\n                <li class=\"gallery-product\">\n                    <a href=\"/sunny-day-cyclist-discussion\">\n                        <div class=\"product__pad\">\n                            <img src=\"/angular/images/thinktank/divvy/6_SunnyDayCyclist_V2.jpg\" alt=\"\">\n                        </div>\n                    </a>\n                </li>\n            </ul>\n        </div>\n        <h3 class=\"more-ideas\">Check out other bike related ideas in the Think Tank</h3>\n        <product-gallery class=\"related__products\" ids=\"[6553,8537,6727,4930,9833,10027,10553,10109]\" limit=\"12\"></product-gallery>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/divvy/dont-sweat-it.html", "<div class=\"divvy cms\">\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <div class=\"product__breadcrumbs-wrapper\">\n                <ul class=\"product__breadcrumbs\">\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/\"><span itemprop=\"title\">Home</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/bike-to-life-discussion\"><span itemprop=\"title\">Bike to Life</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/dont-sweat-it-discussion\"><span itemprop=\"title\">Don\'t Sweat It</span></a>\n                    </li>\n                </ul>                \n            </div>\n            <img class=\"theme-image\" src=\"/angular/images/thinktank/divvy/2_DontSweatIt_Logos_V3.jpg\" alt=\"\">\n            <div class=\"divvy-columns\">\n                <div class=\"intro-column intro\">\n                    <p class=\"intro-text\">Commuting by bike is good for your health, your wallet, and the environment. It\'s also good for making you a sweaty mess at morning meetings, unless you have access to a shower and a change of clothes.</p>\n                </div>\n                <div class=\"action-column\">\n                    <div class=\"action-buttons\">\n                        <submit-idea></submit-idea>\n                        <vote-button product=\'{\"id\": \"10929\"}\' button-text-submitted=\"Followed\" button-text-default=\"Follow this Topic\"></vote-button>\n                    </div>\n                    <div class=\"sharing-methods\">\n                        <a facebook class=\"facebookShare\" data-title=\"Don\'t Sweat It\" data-picture-url=\'https://www.betabrand.com/angular/images/thinktank/divvy/2_DontSweatIt_Logos_V3.jpg\' data-url=\"https://www.betabrand.com/dont-sweat-it-discussion\" data-shares=\'shares\'>{{ shares }}</a>\n                        <a twitter class=\"twitterShare\" data-lang=\"en\" data-count=\'horizontal\' data-url=\"https://www.betabrand.com/dont-sweat-it-discussion\" data-via=\'Betabrand\' data-size=\"medium\" data-text=\"Don\'t Sweat It\"></a>\n                        <div pintrest class=\"pinterestShare\" data-href=\"https://www.betabrand.com/dont-sweat-it-discussion\" data-description=\"Don\'t Sweat It\" data-img=\'https://www.betabrand.com/angular/images/thinktank/divvy/2_DontSweatIt_Logos_V3.jpg\'></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <h3>Betabrand Ideas on Sweat</h3>\n            <p class=\"inspiration-text\">Betabrand commuter clothing is designed to be worn to, from, and during work. Have a look at our entire Bike to Work Collection, then let us know what you like, what you don\'t like, and what you think we should add to the collection by using the comment section below, or <submit-idea></submit-idea>.</p>\n            <div class=\"row inpriation-photos\">\n                <div class=\"column__6\">\n                    <a href=\"/collections/bike-to-work.html?gender=women\">\n                        <img src=\"https://static5.betabrands.com/media/catalog/product/w/o/women___s_black_bike_to_work_pants_9_1.jpg\" alt=\"\">\n                    </a>\n                </div>\n                <div class=\"column__6\">\n                    <a href=\"/collections/bike-to-work/black-bike-to-work-jacket.html\">\n                        <img src=\"https://static6.betabrands.com/media/catalog/product/b/l/black_bike_to_work_jacket_13_6.jpg\" alt=\"\">\n                    </a>\n                </div>\n            </div>\n            <h3>Designer Bio</h3>\n            <p>Chicago\'s DIVVY, Drink Tank and Betabrand\'s Think Tank have come together to advance the apparel industry in favor of the ever-growing bike riding community. This is a global, online discussion on <strong>What bike users need from their clothing as access to, and usability of bikes increases in major metropolitan areas?</strong> This discussion will culminate in an live event on Thursday August 6th in Chicago. The hope is to generate new product ideas and prototypes that will help evolve biking into the go-to method of transportation. New ideas will be added to the Think Tank as they are <a href=\"/how-it-works\">submitted</a>. A challenge to find the best idea will begin after August 6th.</p>\n            <div class=\"fb-comments\" data-href=\"https://www.betabrand.com/dont-sweat-it-discussion\" data-width=\"100%\" data-numposts=\"5\" data-colorscheme=\"light\" xfbml></div>\n            <h3 class=\"more-ideas\">Check out other bike related ideas in the Think Tank</h3>\n            <product-gallery class=\"related__products\" ids=\"[6553,8537,6727,4930,9833,10027,10553,10109]\" limit=\"12\"></product-gallery>\n        </div>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/divvy/join-the-club.html", "<div class=\"divvy cms\">\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <div class=\"product__breadcrumbs-wrapper\">\n                <ul class=\"product__breadcrumbs\">\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/\"><span itemprop=\"title\">Home</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/bike-to-life-discussion\"><span itemprop=\"title\">Bike to Life</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/join-the-club-discussion\"><span itemprop=\"title\">Join The Club?</span></a>\n                    </li>\n                </ul>                \n            </div>\n            <img class=\"theme-image\" src=\"/angular/images/thinktank/divvy/3_JoinTheClub_Logos_V3.jpg\" alt=\"\">\n            <div class=\"divvy-columns\">\n                <div class=\"intro-column intro\">\n                    <p class=\"intro-text\">What sort of clothing and/or accessories let the rest of the world know that youâ€™re a part of the bike-sharing community? Even better, how about something that encourages other folks to join in! A DIVVY BAG? A Hoodie? A reflective scarf or Socks? Subtle design details like color and pattern, or overt branding? Let us know what you want  in the comments, or <submit-idea></submit-idea>.</p>\n                </div>\n                <div class=\"action-column\">\n                    <div class=\"action-buttons\">\n                        <submit-idea></submit-idea>\n                        <vote-button product=\'{\"id\": \"10931\"}\' button-text-submitted=\"Followed\" button-text-default=\"Follow this Topic\"></vote-button>\n                    </div>\n                    <div class=\"sharing-methods\">\n                        <a facebook class=\"facebookShare\" data-title=\"Join The Club?\" data-picture-url=\"https://www.betabrand.com/angular/images/thinktank/divvy/3_JoinTheClub_Logos_V3.jpg\" data-url=\"https://www.betabrand.com/join-the-club-discussion\" data-shares=\'shares\'>{{ shares }}</a>\n                        <a twitter class=\"twitterShare\" data-lang=\"en\" data-count=\'horizontal\' data-url=\"https://www.betabrand.com/join-the-club-discussion\" data-via=\'Betabrand\' data-size=\"medium\" data-text=\"Join The Club?\"></a>\n                        <div pintrest class=\"pinterestShare\" data-href=\"https://www.betabrand.com/join-the-club-discussion\" data-description=\"Join The Club?\" data-img=\"https://www.betabrand.com/angular/images/thinktank/divvy/3_JoinTheClub_Logos_V3.jpg\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <h3>Betabrand can bring your ideas to life!</h3>\n            <p class=\"inspiration-text\"> Betabrand makes all kinds of apparel items and accessories. Most of which started as an idea from our community members. To date weâ€™ve made clothing, bags, scarves, shoes and sunglasses based on suggestions from people like you!  If there is a good idea, we can figure out how to make it happen. So share your ideas with us!</p>\n            <div class=\"row inpriation-photos\">\n                <div class=\"column__6\">\n                    <a href=\"/how-it-works\">\n                        <img src=\"/angular/images/thinktank/think-tank-submit.png\" alt=\"\">\n                    </a>\n                </div>\n                <div class=\"column__6\">\n                    <a href=\"/how-it-works\">\n                        <img src=\"/angular/images/thinktank/think-tank-vote.png\" alt=\"\">\n                    </a>\n                </div>\n            </div>\n            <h3>Designer Bio</h3>\n            <p>Chicago\'s DIVVY, Drink Tank and Betabrand\'s Think Tank have come together to advance the apparel industry in favor of the ever-growing bike riding community. This is a global, online discussion on <strong>What bike users need from their clothing as access to, and usability of bikes increases in major metropolitan areas?</strong> This discussion will culminate in an live event on Thursday August 6th in Chicago. The hope is to generate new product ideas and prototypes that will help evolve biking into the go-to method of transportation. New ideas will be added to the Think Tank as they are <a href=\"/how-it-works\">submitted</a>. A challenge to find the best idea will begin after August 6th.</p>\n            <div class=\"fb-comments\" data-href=\"https://www.betabrand.com/join-the-club-discussion\" data-width=\"100%\" data-numposts=\"5\" data-colorscheme=\"light\" xfbml></div>\n            <h3 class=\"more-ideas\">Check out other bike related ideas in the Think Tank</h3>\n            <product-gallery class=\"related__products\" ids=\"[6553,8537,6727,4930,9833,10027,10553,10109]\" limit=\"12\"></product-gallery>\n        </div>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/divvy/miles-discussion.html", "<div class=\"divvy cms\">\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <div class=\"product__breadcrumbs-wrapper\">\n                <ul class=\"product__breadcrumbs\">\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/\"><span itemprop=\"title\">Home</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/bike-to-life-discussion\"><span itemprop=\"title\">Bike to Life</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/miles-discussion\"><span itemprop=\"title\">Miles! Miles! Miles!</span></a>\n                    </li>\n                </ul>                \n            </div>\n            <img class=\"theme-image\" src=\"/angular/images/thinktank/divvy/4_Miles_Logos_V3.jpg\" alt=\"\">\n            <div class=\"divvy-columns\">\n                <div class=\"intro-column intro\">\n                    <p class=\"intro-text\">Got ideas for wearable tech that helps people become better cyclists, or maybe helps them log all those crazy mad miles? Badges or Patches for time and miles earned on the bike? Or what about clothing that simply wears (stylishly) and changes as it\'s worn â€” like Betabrand Gay Jeans, featuring denim that gently fades to reveal rainbow thread.</p>\n                </div>\n                <div class=\"action-column\">\n                    <div class=\"action-buttons\">\n                        <submit-idea></submit-idea>\n                        <vote-button product=\'{\"id\": \"10933\"}\' button-text-submitted=\"Followed\" button-text-default=\"Follow this Topic\"></vote-button>\n                    </div>\n                    <div class=\"sharing-methods\">\n                        <a facebook class=\"facebookShare\" data-title=\"Miles! Miles! Miles!\" data-picture-url=\"https://www.betabrand.com/angular/images/thinktank/divvy/4_Miles_Logos_V3.jpg\" data-url=\"https://www.betabrand.com/miles-discussion\" data-shares=\'shares\'>{{ shares }}</a>\n                        <a twitter class=\"twitterShare\" data-lang=\"en\" data-count=\'horizontal\' data-url=\"https://www.betabrand.com/miles-discussion\" data-via=\'Betabrand\' data-size=\"medium\" data-text=\"Miles! Miles! Miles!\"></a>\n                        <div pintrest class=\"pinterestShare\" data-href=\"https://www.betabrand.com/miles-discussion\" data-description=\"Miles! Miles! Miles!\" data-img=\"https://www.betabrand.com/angular/images/thinktank/divvy/4_Miles_Logos_V3.jpg\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <h3>A Betabrand product that changes with time</h3>\n            <p class=\"inspiration-text\">Check out how the Gay Jeans wear with time! Tell us how you\'d like you wear your cred in the comments below, or <submit-idea></submit-idea>.</p>\n            <div class=\"row inpriation-photos\">\n                <div class=\"column__6\">\n                    <a href=\"/rainbow-denim-slim-fit-gay-jeans.html\">\n                        <img src=\"https://static7.betabrands.com/media/catalog/product/g/a/gay_jeans__slim_fit__15_3.jpg\" alt=\"\">\n                    </a>\n                </div>\n                <div class=\"column__6\">\n                    <a href=\"/rainbow-denim-stretch-skinny-gay-jeans.html\">\n                        <img src=\"https://static7.betabrands.com/media/catalog/product/g/a/gay_jeans__stretch_skinny__23_2.jpg\" alt=\"\">\n                    </a>\n                </div>\n            </div>\n            <h3>Designer Bio</h3>\n            <p>Chicago\'s DIVVY, Drink Tank and Betabrand\'s Think Tank have come together to advance the apparel industry in favor of the ever-growing bike riding community. This is a global, online discussion on <strong>What bike users need from their clothing as access to, and usability of bikes increases in major metropolitan areas?</strong> This discussion will culminate in an live event on Thursday August 6th in Chicago. The hope is to generate new product ideas and prototypes that will help evolve biking into the go-to method of transportation. New ideas will be added to the Think Tank as they are <a href=\"/how-it-works\">submitted</a>. A challenge to find the best idea will begin after August 6th.</p>\n            <div class=\"fb-comments\" data-href=\"https://www.betabrand.com/miles-discussion\" data-width=\"100%\" data-numposts=\"5\" data-colorscheme=\"light\" xfbml></div>\n            <h3 class=\"more-ideas\">Check out other bike related ideas in the Think Tank</h3>\n            <product-gallery class=\"related__products\" ids=\"[6553,8537,6727,4930,9833,10027,10553,10109]\" limit=\"12\"></product-gallery>\n        </div>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/divvy/night-visibility.html", "<div class=\"divvy cms\">\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <div class=\"product__breadcrumbs-wrapper\">\n                <ul class=\"product__breadcrumbs\">\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/\"><span itemprop=\"title\">Home</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/bike-to-life-discussion\"><span itemprop=\"title\">Bike to Life</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/night-visibility-discussion\"><span itemprop=\"title\">Night Visibility</span></a>\n                    </li>\n                </ul>                \n            </div>\n            <img class=\"theme-image\" src=\"/angular/images/thinktank/divvy/1_NightVisibility_Logos_V3.jpg\" alt=\"\">\n            <div class=\"divvy-columns\">\n                <div class=\"intro-column intro\">\n                    <p class=\"intro-text\">Wheels keep turning after the evening commute: More than ever, people are making biking, and bike share programs like DIVVY an essential part of their nightlife. What sort of garments could combine high style and high visibility, so you stay safe no matter how late you\'re out on the road?</p>\n                    \n                </div>\n                <div class=\"action-column\">\n                    <div class=\"action-buttons\">\n                        <submit-idea></submit-idea>\n                        <vote-button product=\'{\"id\": \"10927\"}\' button-text-submitted=\"Followed\" button-text-default=\"Follow this Topic\"></vote-button>\n                    </div>\n                    <div class=\"sharing-methods\">\n                        <a facebook class=\"facebookShare\" data-title=\"Night Visibility\" data-picture-url=\"https://www.betabrand.com/angular/images/thinktank/divvy/1_NightVisibility_Logos_V3.jpg\" data-url=\"https://www.betabrand.com/night-visibility-discussion\" data-shares=\'shares\'>{{ shares }}</a>\n                        <a twitter class=\"twitterShare\" data-lang=\"en\" data-count=\'horizontal\' data-url=\"https://www.betabrand.com/night-visibility-discussion\" data-via=\'Betabrand\' data-size=\"medium\" data-text=\"Night Visibility\"></a>\n                        <div pintrest class=\"pinterestShare\" data-href=\"https://www.betabrand.com/night-visibility-discussion\" data-description=\"Night Visibility\" data-img=\"https://www.betabrand.com/angular/images/thinktank/divvy/1_NightVisibility_Logos_V3.jpg\"></div>\n                    </div>\n                    \n                </div>\n                \n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <h3>Betabrand Ideas on Night Visibility</h3>\n            <p class=\"inspiration-text\">Betabrand has explored adding retroreflective details to garments for work and play. Take a look at some of these ideas and let us know what else you want to see in the comments below, or <submit-idea></submit-idea>.</p>\n            <div class=\"row inpriation-photos\">\n                <div class=\"column__6\">\n                    <a href=\"/search?q=reflective\">\n                        <img src=\"https://static5.betabrands.com/media/catalog/product/f/l/flashback_silver_screen_scarf_11_2.jpg\" alt=\"\">\n                    </a>\n                </div>\n                <div class=\"column__6\">\n                    <a href=\"/search?q=reflective\">\n                        <img src=\"https://static5.betabrands.com/media/catalog/product/f/l/flashback_photon_boots__men_s__10_2.jpg\" alt=\"\">\n                    </a>\n                </div>\n            </div>\n            <h3>Designer Bio</h3>\n            <p>Chicago\'s DIVVY, Drink Tank and Betabrand\'s Think Tank have come together to advance the apparel industry in favor of the ever-growing bike riding community. This is a global, online discussion on <strong>What bike users need from their clothing as access to, and usability of bikes increases in major metropolitan areas?</strong> This discussion will culminate in an live event on Thursday August 6th in Chicago. The hope is to generate new product ideas and prototypes that will help evolve biking into the go-to method of transportation. New ideas will be added to the Think Tank as they are <a href=\"/how-it-works\">submitted</a>. A challenge to find the best idea will begin after August 6th.</p>\n            <div class=\"fb-comments\" data-href=\"https://www.betabrand.com/night-visibility-discussion\" data-width=\"100%\" data-numposts=\"5\" data-colorscheme=\"light\" xfbml></div>\n            <h3 class=\"more-ideas\">Check out other bike related ideas in the Think Tank</h3>\n            <product-gallery class=\"related__products\" ids=\"[6553,8537,6727,4930,9833,10027,10553,10109]\" limit=\"12\"></product-gallery>\n        </div>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/divvy/sunny-day-cyclist.html", "<div class=\"divvy cms\">\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <div class=\"product__breadcrumbs-wrapper\">\n                <ul class=\"product__breadcrumbs\">\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/\"><span itemprop=\"title\">Home</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/bike-to-life-discussion\"><span itemprop=\"title\">Bike to Life</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/sunny-day-cyclist-discussion\"><span itemprop=\"title\">The Sunny Day Cyclist</span></a>\n                    </li>\n                </ul>                \n            </div>\n            <img class=\"theme-image\" src=\"/angular/images/thinktank/divvy/6_SunnyDayCyclist_Logos_V3.jpg\" alt=\"\">\n            <div class=\"divvy-columns\">\n                <div class=\"intro-column intro\">\n                    <p class=\"intro-text\">What sort of clothing and/or accessories could we prototype for errand runners, casual cruisers, and the like â€” folks who take a more laid-back approach to cycling? What could make their rides more fun? More convenient?. A stuffable windbreaker that has a pocket for your DIVVY pass?A bag that fits the DIVVY rack? Multi-use products would be great for helping the casual cruiser.  Items that have a life and a function on and off the bike would work great here. Use the comments below to tell us your suggestion or <submit-idea></submit-idea>!</p>\n                    \n                </div>\n                <div class=\"action-column\">\n                    <div class=\"action-buttons\">\n                        <submit-idea></submit-idea>\n                        <vote-button product=\'{\"id\": \"10937\"}\' button-text-submitted=\"Followed\" button-text-default=\"Follow this Topic\"></vote-button>\n                    </div>\n                    <div class=\"sharing-methods\">\n                        <a facebook class=\"facebookShare\" data-title=\"The Sunny Day Cyclist\" data-picture-url=\"https://www.betabrand.com/angular/images/thinktank/divvy/6_SunnyDayCyclist_Logos_V3.jpg\" data-url=\"https://www.betabrand.com/sunny-day-cyclist-discussion\" data-shares=\'shares\'>{{ shares }}</a>\n                        <a twitter class=\"twitterShare\" data-lang=\"en\" data-count=\'horizontal\' data-url=\"https://www.betabrand.com/sunny-day-cyclist-discussion\" data-via=\'Betabrand\' data-size=\"medium\" data-text=\"The Sunny Day Cyclist\"></a>\n                        <div pintrest class=\"pinterestShare\" data-href=\"https://www.betabrand.com/sunny-day-cyclist-discussion\" data-description=\"The Sunny Day Cyclist\" data-img=\"https://www.betabrand.com/angular/images/thinktank/divvy/6_SunnyDayCyclist_Logos_V3.jpg\"></div>\n                    </div>\n                    \n                </div>\n                \n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <h3>Are Betabrand\'s Flip Slips heading in the right direction?</h3>\n            <p class=\"inspiration-text\">Are Betabrand\'s Flip Slips heading in the right direction?  They are a cute, comfy, slip-on shoe for when your feet are done with your dress shoes. Perfect for hitting the dance floor, or jumping on a bike. They also have reflective piping for night visibility.  Best of all they fit in your purse!</p>\n            <div class=\"row inpriation-photos\">\n                <div class=\"column__6\">\n                    <a href=\"/womens/more/womens-cycling-flats-flipslip-shoes.html\">\n                        <img src=\"https://static6.betabrands.com/media/catalog/product/f/l/flipslips_13.jpg\" alt=\"\">\n                    </a>\n                </div>\n                <div class=\"column__6\">\n                    <a href=\"/womens/more/womens-cycling-flats-flipslip-shoes.html\">\n                        <img src=\"https://static5.betabrands.com/media/catalog/product/f/l/flipslips_10_1.jpg\" alt=\"\">\n                    </a>\n                </div>\n            </div>\n            <h3>Designer Bio</h3>\n            <p>Chicago\'s DIVVY, Drink Tank and Betabrand\'s Think Tank have come together to advance the apparel industry in favor of the ever-growing bike riding community. This is a global, online discussion on <strong>What bike users need from their clothing as access to, and usability of bikes increases in major metropolitan areas?</strong> This discussion will culminate in an live event on Thursday August 6th in Chicago. The hope is to generate new product ideas and prototypes that will help evolve biking into the go-to method of transportation. New ideas will be added to the Think Tank as they are <a href=\"/how-it-works\">submitted</a>. A challenge to find the best idea will begin after August 6th.</p>\n            <div class=\"fb-comments\" data-href=\"https://www.betabrand.com/sunny-day-cyclist-discussion\" data-width=\"100%\" data-numposts=\"5\" data-colorscheme=\"light\" xfbml></div>\n            <h3 class=\"more-ideas\">Check out other bike related ideas in the Think Tank</h3>\n            <product-gallery class=\"related__products\" ids=\"[6553,8537,6727,4930,9833,10027,10553,10109]\" limit=\"12\"></product-gallery>\n        </div>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/divvy/what-me-worry.html", "<div class=\"divvy cms\">\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <div class=\"product__breadcrumbs-wrapper\">\n                <ul class=\"product__breadcrumbs\">\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/\"><span itemprop=\"title\">Home</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/bike-to-life-discussion\"><span itemprop=\"title\">Bike to Life</span></a>\n                    </li>\n                    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n                        <a itemprop=\"url\" ng-href=\"/what-me-worry-discussion\"><span itemprop=\"title\">What, Me Worry?</span></a>\n                    </li>\n                </ul>                \n            </div>\n            <img class=\"theme-image\" src=\"/angular/images/thinktank/divvy/5_WhatMeWorry_Logos_V3.jpg\" alt=\"\">\n            <div class=\"divvy-columns\">\n                <div class=\"intro-column intro\">\n                    <p class=\"intro-text\">A lot of folks want to bike to work, but they\'re concerned for their safety. What sort of garments and/or accessories could help get them in the saddle?</p>\n                    \n                </div>\n                <div class=\"action-column\">\n                    <div class=\"action-buttons\">\n                        <submit-idea></submit-idea>\n                        <vote-button product=\'{\"id\": \"10935\"}\' button-text-submitted=\"Followed\" button-text-default=\"Follow this Topic\"></vote-button>\n                    </div>\n                    <div class=\"sharing-methods\">\n                        <a facebook class=\"facebookShare\" data-title=\"What, Me Worry?\" data-picture-url=\"https://www.betabrand.com/angular/images/thinktank/divvy/5_WhatMeWorry_Logos_V3.jpg\" data-url=\"https://www.betabrand.com/what-me-worry-discussion\" data-shares=\'shares\'>{{ shares }}</a>\n                        <a twitter class=\"twitterShare\" data-lang=\"en\" data-count=\'horizontal\' data-url=\"https://www.betabrand.com/what-me-worry-discussion\" data-via=\'Betabrand\' data-size=\"medium\" data-text=\"What, Me Worry?\"></a>\n                        <div pintrest class=\"pinterestShare\" data-href=\"https://www.betabrand.com/what-me-worry-discussion\" data-description=\"What, Me Worry?\" data-img=\"https://www.betabrand.com/angular/images/thinktank/divvy/5_WhatMeWorry_Logos_V3.jpg\"></div>\n                    </div>\n                    \n                </div>\n                \n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"column__12\">\n            <h3>Ideas on safety in Betabrand\'s Think Tank</h3>\n            <p class=\"inspiration-text\">Aside from our incredible <a href=\"/collections/bike-to-work.html\">BTW collection</a> that has clothing with reflectivity, we have some very fun ideas going in the Think Tank.  Have more ideas? Tell us in the comments below or <submit-idea></submit-idea>.</p>\n            <div class=\"row inpriation-photos\">\n                <div class=\"column__6\">\n                    <a href=\"/sovo-reflective-flashback-illuminated-vest.html\">\n                        <img src=\"https://static6.betabrands.com/media/catalog/product/c/a/can_you_see_me_vest_3.jpg\" alt=\"\">\n                    </a>\n                </div>\n                <div class=\"column__6\">\n                    <a href=\"/bike-to-work-light-up-signal-glove.html\">\n                        <img src=\"https://static7.betabrands.com/media/catalog/product/_/b/_bike_to_work_signal_glove_0.jpg\" alt=\"\">\n                    </a>\n                </div>\n            </div>\n            <h3>Designer Bio</h3>\n            <p>Chicago\'s DIVVY, Drink Tank and Betabrand\'s Think Tank have come together to advance the apparel industry in favor of the ever-growing bike riding community. This is a global, online discussion on <strong>What bike users need from their clothing as access to, and usability of bikes increases in major metropolitan areas?</strong> This discussion will culminate in an live event on Thursday August 6th in Chicago. The hope is to generate new product ideas and prototypes that will help evolve biking into the go-to method of transportation. New ideas will be added to the Think Tank as they are <a href=\"/how-it-works\">submitted</a>. A challenge to find the best idea will begin after August 6th.</p>\n            <div class=\"fb-comments\" data-href=\"https://www.betabrand.com/what-me-worry-discussion\" data-width=\"100%\" data-numposts=\"5\" data-colorscheme=\"light\" xfbml></div>\n            <h3 class=\"more-ideas\">Check out other bike related ideas in the Think Tank</h3>\n            <product-gallery class=\"related__products\" ids=\"[6553,8537,6727,4930,9833,10027,10553,10109]\" limit=\"12\"></product-gallery>\n        </div>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/footer/footer.html", "<div class=\"footer__sections\">\n    <div class=\"footer__section\">\n        <div class=\"section__title\">\n            Company Info\n        </div>\n\n        <ul>\n            <li>\n                <a ng-href=\"/blog\" target=\"_self\">Blog</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/about\">About Us</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/contact\">Contact Us</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/press\">Press</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/jobs\">Jobs at Betabrand</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/privacy\">Privacy Policy</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/terms_of_use\">Terms of use</a>\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"footer__section\">\n        <div class=\"section__title\">\n            Customer Service\n        </div>\n\n        <ul>\n            <li>\n                <a ng-href=\"/contact\">Need Help?</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/shipping\">Shipping &amp; Pick-Ups</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/returns\">Returns &amp; Exchanges</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/group-discounts\">Group Discounts</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/unidays-student-discount\">Student Discounts</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/gift-certificates.html\">Gift Certificates</a>\n            </li>\n\n            <li>\n                <a ng-href=\"/bitcoin\">Bitcoin</a>\n            </li>      \n        </ul>\n    </div>\n\n    <div itemscope itemtype=\"https://schema.org/Organization\" class=\"footer__section\">\n        <div class=\"section__title\">\n            Come Say Hi\n        </div>\n\n        <ul>\n            <li itemprop=\"location address\" itemscope itemtype=\"https://schema.org/PostalAddress\">\n                <a ng-href=\"https://maps.google.com/maps?mrt=yp&amp;q=Betabrand+780+Valencia+St.+San+Francisco%2C+CA+94110\" onclick=\"Betabrand.common.pushEvent(\'virtual/mediabox/footer/https://maps.google.com/maps?mrt=yp&amp;q=Betabrand+780+Valencia+St.+San+Francisco%2C+CA+94110\');\" target=\"_blank\">\n                    <span itemprop=\"streetAddress\">780 Valencia St.</span><br/><span itemprop=\"addressLocality\">San Francisco</span>,&nbsp;<span itemprop=\"addressRegion\">CA</span>&nbsp;<span itemprop=\"postalCode\">94110</span>\n                    <meta itemprop=\"addressCountry\" content=\"us\"/>\n                </a>\n            </li>\n\n            <li class=\"section__hours\" ng-bind-html=\"data.hours.content\"></li>\n\n            <li>\n                <a itemprop=\"telephone\" ng-href=\"tel:(800)694-9491\">(800) 694-9491</a>\n            </li>\n\n            <li>\n                <a itemprop=\"email\" ng-href=\"mailto:info@betabrand.com\">info@betabrand.com</a>\n            </li>\n        </ul>\n        <meta itemprop=\"seeks\" itemtype=\"https://schema.org/Demand\" content=\"To rule the worrrllld! Bwahahahahah!\"/>\n    </div>\n    <div class=\"footer__section footer__section--social\">\n        <div class=\"section__title\">\n            Betabrand Newsletter\n        </div>\n        <ul>\n        <p class=\"newsletter-text\">Sign up for our newsletter and be the first to know about new products and discounts!</p>\n            <div class=\"signup__right\">\n                <form name=\"footerNewsletterForm\" class=\"newsletter__form\" onsubmit=\"return false;\">\n                    <i class=\"betabrand-email\"></i>\n                    <input tabindex=\"-1\" class=\"signup__email text__input--button\" autocomplete=\"off\" maxlength=\"50\" name=\"newsletter\" placeholder=\"Email Address\" type=\"email\" ng-model=\"footerNewsletterForm.email\" required>\n                    <button class=\"input__button\" ng-click=\"submitEmail(footerNewsletterForm.email)\">GO</button>\n                </form>        \n            </div>\n            <div class=\"signup__response\">\n                <span class=\"signup--success\" ng-show=\"successMessage\">{{successMessage}}</span>\n                <span class=\"signup--error\" ng-show=\"errorMessage\">{{errorMessage}}</span>\n            </div>\n        </ul>\n\n        <div class=\"section__title\">\n            Follow us\n        </div>\n\n        <ul>\n            <li>\n                <a class=\"betabrand-facebook\" ng-href=\"http://www.facebook.com/betabrand\" target=\"_blank\" title=\"Friend us on Facebook\"></a>\n                <a class=\"betabrand-twitter\" ng-href=\"http://www.twitter.com/betabrand\" target=\"_blank\" title=\"Follow us on Twitter\"></a>\n                <a class=\"betabrand-instagram\" ng-href=\"http://www.instagram.com/betabrand_hq\" target=\"_blank\" title=\"Follow us on Instagram\"></a>\n                <a class=\"betabrand-youtube\" ng-href=\"http://www.youtube.com/user/betabrand\" target=\"_blank\" title=\"Follow us on YouTube\"></a>\n            </li>\n        </ul>       \n        <p class=\"copyright\">&copy;2015 Betabrand. All Rights Reserved.</p>\n    </div>\n\n    \n</div>\n\n");
  $templateCache.put("/angular/app/forms/address-form.html", "<div ng-show=\"!model.hide\" optimizely=\"steppedAddress\">\n\n    <h5 ng-if=\"model.isDefaultBilling\">Default Billing Address</h5>\n\n    <h5 ng-if=\"model.isDefaultShipping\">Default Shipping Address</h5>\n    \n    <div ng-show=\"mode == \'preview\'\" class=\"address__preview {{formName}}\">\n        <span class=\'name\'>{{model.name}}</span>\n        <span ng-show=\"model.email\">{{model.email}}</span>\n        <span class=\"address\">{{model[\'street-address\']}}</span>\n        <span class=\"address\">{{model[\'street-address2\']}}</span>\n        <span class=\"region\"><span class=\"city\">{{model.locality}}</span>, <span class=\"state\">{{model.region}}</span>, <span class=\"postal-code\">{{model[\'postal-code\']}}</span> <span class=\"country\">{{model.country}}</span></span>\n        \n        <ul class=\"address__actions\">\n            <li><a href ng-click=\"edit()\">Edit</a></li>\n            <li ng-if=\"accountAddress\"><a href ng-click=\"delete()\" ng-show=\"loggedIn && !model.isDefaultBilling && !model.isDefaultShipping\">Delete</a></li>\n        </ul>\n        <ul class=\"address__defaults\" ng-if=\"accountAddress\" ng-show=\"loggedIn\">\n            <li><a href ng-click=\"model.isDefaultShipping=true;submit()\" ng-show=\"!model.isDefaultBilling && !model.isDefaultShipping\" >Set as default shipping address</a></li>\n            <li><a href ng-show=\"!model.isDefaultBilling && !model.isDefaultShipping\" ng-click=\"model.isDefaultBilling=true;submit()\">Set as default billing address</a></li>\n        </ul> \n    </div>\n\n    <div ng-show=\"mode == \'default\' || mode == \'edit\'\" class=\"address__form\" ng-class=\"{\'edit\': mode==\'edit\', \'default\': mode==\'default\' }\">\n        \n        <form name=\"{{formName}}\" id=\"address-{{formName}}\" class=\"{{formName}}\" novalidate ng-submit=\"submit()\">\n\n            <div class=\"address-form\">\n    \n                <div class=\"address-form__container\">\n                    \n                    <div class=\"row\">\n                        <div class=\"form-column__6 address-form__name\">\n                            <label for=\"{{formName}}_address_name\">Full Name *</label>\n                            <div class=\"input-validate\">\n                                <input track-focus id=\"{{formName}}_address_name\" name=\"{{formName}}_address_name\" type=\"text\" value=\"\" ng-model=\"model.name\" required ng-minlength=\"3\" ng-class=\"{\'required--focus\':{{formName}}.{{formName}}_address_name.$touched && {{formName}}.{{formName}}_address_name.$invalid}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_name.$touched) && {{formName}}.{{formName}}_address_name.$invalid && {{formName}}.{{formName}}_address_name.hasFocus\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_name.$error.required\">\n                                        Your name is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_name.$error.minlength\">\n                                        Your name needs to be at least 3 characters\n                                    </small>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div ng-if=\"!accountAddress\" class=\"form-column__6\">\n                            <label for=\"{{formName}}_address_email\">Email *</label>\n                            <div class=\"input-validate\">\n                                <input track-focus id=\"{{formName}}_address_email\" name=\"{{formName}}_address_email\" type=\"email\" value=\"\" ng-model=\"model.email\" required ng-class=\"{\'required--focus\':{{formName}}.{{formName}}_address_email.$touched && {{formName}}.{{formName}}_address_email.$invalid}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_email.$touched) && {{formName}}.{{formName}}_address_email.$invalid && {{formName}}.{{formName}}_address_email.hasFocus\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_email.$error.required\">\n                                        Your email is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_email.$error.email\">\n                                        Your email is invalid.\n                                    </small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"column__12\">\n                            <label for=\"{{formName}}_street_address\">Street Address *</label>\n                            <div class=\"input-validate\">\n                                <input track-focus id=\"{{formName}}_street_address\" name=\"{{formName}}_street_address\" type=\"text\" value=\"\" ng-model=\"model[\'street-address\']\" required ng-minlength=\"8\" ng-class=\"{\'required--focus\':{{formName}}.{{formName}}_street_address.$touched && {{formName}}.{{formName}}_street_address.$invalid}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_street_address.$touched) && {{formName}}.{{formName}}_street_address.$invalid && {{formName}}.{{formName}}_street_address.hasFocus\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_street_address.$error.required\">\n                                        Your address is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_street_address.$error.minlength\">\n                                        Your address needs to be at least 8 characters\n                                    </small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"column__12\">\n                            <label for=\"{{formName}}_street_address2\">Street Address (optional)</label>\n                            <div class=\"input-validate\">\n                                <input track-focus id=\"{{formName}}_street_address2\" name=\"{{formName}}_street_address2\" type=\"text\" value=\"\" ng-model=\"model[\'street-address2\']\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <label for=\"{{formName}}_tel\">Phone *</label>\n                        <div class=\"input-validate\">\n                            <input track-focus id=\"{{formName}}_tel\" name=\"{{formName}}_tel\" type=\"tel\" value=\"\" ng-model=\"model.tel\" required ng-class=\"{\'required--focus\':{{formName}}.{{formName}}_tel.$touched && {{formName}}.{{formName}}_tel.$invalid}\">\n                            <i class=\"fa fa-check\"></i>\n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_tel.$touched) && {{formName}}.{{formName}}_tel.$invalid && {{formName}}.{{formName}}_tel.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_tel.$error.required\">\n                                    Your phone number is required.\n                                </small>\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_tel.$error.pattern\">\n                                    Your phone number is invalid.\n                                </small>\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_tel.$error.minlength\">\n                                    Your phone number needs to be at least 7 characters\n                                </small>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <label for=\"{{formName}}_address_country\">Country *</label>\n                        <div class=\"input-validate\">\n                            <select track-focus id=\"{{formName}}_address_country\" name=\"{{formName}}_address_country\" ng-options=\"country.country_id as country.country_name for country in regions | orderBy: \'position\'\" ng-model=\"model.country\" ng-change=\"updateSubregions()\" required ng-class=\"{\'required--focus\':{{formName}}.{{formName}}_address_country.$touched && {{formName}}.{{formName}}_address_country.$invalid}\">\n                            <option value=\"\">Country <span class=\"checkout__required\"> *</span></option>\n                            </select>                                 \n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_country.$touched) && {{formName}}.{{formName}}_address_country.$invalid && {{formName}}.{{formName}}_address_country.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_country.$error.required\">\n                                    Your country is required.\n                                </small>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <label for=\"{{formName}}_address_postal\">Postal Code *</label>\n                        <div class=\"input-validate\">\n                            <input track-focus id=\"{{formName}}_address_postal\" name=\"{{formName}}_address_postal\" type=\"text\" value=\"\" ng-model=\"model[\'postal-code\']\" required ng-minlength=\"3\" ng-class=\"{\'required--focus\':{{formName}}.{{formName}}_address_postal.$touched && {{formName}}.{{formName}}_address_postal.$invalid}\" ng-blur=\"checkPostalCode()\">\n                            <i class=\"fa fa-check\"></i>\n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_postal.$touched) && {{formName}}.{{formName}}_address_postal.$invalid && {{formName}}.{{formName}}_address_postal.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_postal.$error.required\">\n                                    Your zip code is required.\n                                </small>\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_postal.$error.minlength\">\n                                    Your zip code needs to be at least 3 characters.\n                                </small>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <label for=\"{{formName}}_address_locality\">City *</label>\n                        <div class=\"input-validate\">\n                            <input track-focus id=\"{{formName}}_address_locality\" name=\"{{formName}}_address_locality\" type=\"text\" value=\"\" ng-model=\"model.locality\" required ng-minlength=\"3\" ng-class=\"{\'required--focus\':{{formName}}.{{formName}}_address_locality.$touched && {{formName}}.{{formName}}_address_locality.$invalid}\">\n                            <i class=\"fa fa-check\"></i>\n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_locality.$touched) && {{formName}}.{{formName}}_address_locality.$invalid && {{formName}}.{{formName}}_address_locality.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_locality.$error.required\">\n                                    Your city is required.\n                                </small>\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_locality.$error.minlength\">\n                                    Your city needs to be at least 3 characters.\n                                </small>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"row\">\n                        <label for=\"{{formName}}_address_region_select\">State / Region *</label>\n                        <div class=\"input-validate\">\n                            \n                            <select track-focus ng-if=\"subRegions.length\" id=\"{{formName}}_address_region_select\" name=\"{{formName}}_address_region_select\" ng-options=\"region.region_id as region.name for region in subRegions\" ng-model=\"model.region_id\" ng-change=\"updateRegion(model.region_id)\" required ng-class=\"{\'required--focus\':{{formName}}.{{formName}}_address_region_select.$touched && {{formName}}.{{formName}}_address_region_select.$invalid}\">\n                                <option value=\"\">Select</option>\n                            </select>                            \n                            \n                            <input track-focus ng-if=\"!subRegions.length\" type=\'text\' name=\"{{formName}}_address_region\" id=\"{{formName}}_address_region\" ng-model=\"model.region\" required ng-class=\"{\'required--focus\':{{formName}}.{{formName}}_address_region.$touched && {{formName}}.{{formName}}_address_region.$invalid}\">\n                            \n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_region_select.$touched) && {{formName}}.{{formName}}_address_region_select.$invalid && {{formName}}.{{formName}}_address_region_select.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_region_select.$error.required\">\n                                    Your state/region is required.\n                                </small>\n                            </div>\n\n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_region.$touched) && {{formName}}.{{formName}}_address_region.$invalid && {{formName}}.{{formName}}_address_region.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_region.$error.required\">\n                                    Your state/region is required.\n                                </small>\n                            </div>\n\n                        </div>\n                        \n                    </div>\n                </div>\n                \n                <button type=\"submit\" class=\"primary\" ng-disabled=\"{{formName}}.$invalid\">{{useForBilling ? \'Next: Shipping Method\' : \'Next\'}}</button>                \n\n            </div>\n            \n        </form>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/forms/checkout-address-form.html", "<div ng-show=\"!model.hide\">\n    \n    <div ng-show=\"mode == \'preview\'\" class=\"address__preview {{formName}}\">\n        <span class=\'name\'>{{model.name}}</span>\n        <span ng-show=\"model.email\">{{model.email}}</span>\n        <span class=\"address\">{{model[\'street-address\']}}</span>\n        <span class=\"address\">{{model[\'street-address2\']}}</span>\n        <span class=\"region\"><span class=\"city\">{{model.locality}}</span>, <span class=\"state\">{{model.region}}</span>, <span class=\"postal-code\">{{model[\'postal-code\']}}</span> <span class=\"country\">{{model.country}}</span></span>\n        \n        <ul class=\"address__actions\">\n            <li><a href ng-click=\"edit()\">Edit</a></li>\n        </ul>\n    </div>\n\n    <div ng-show=\"mode == \'default\' || mode == \'edit\'\" class=\"address__form\" ng-class=\"{\'edit\': mode==\'edit\', \'default\': mode==\'default\' }\">\n        \n        <form name=\"{{formName}}\" id=\"address-{{formName}}\" class=\"{{formName}}\" novalidate ng-submit=\"submit()\">\n\n            <div class=\"address-form\">\n    \n                <div class=\"address-form__container\">\n                    \n                    <div class=\"row\">\n                        <div class=\"form-column__6 address-form__name\">\n                            <label for=\"{{formName}}_address_name\">Full Name *</label>\n                            <div class=\"input-validate\">\n                                <input track-focus id=\"{{formName}}_address_name\" name=\"{{formName}}_address_name\" type=\"text\" value=\"\" ng-model=\"model.name\" required ng-minlength=\"3\" ng-class=\"{\'required--focus\':(showErrors ||{{formName}}.{{formName}}_address_name.$touched && {{formName}}.{{formName}}_address_name.$invalid)}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_name.$touched) && {{formName}}.{{formName}}_address_name.$invalid && {{formName}}.{{formName}}_address_name.hasFocus\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_name.$error.required\">\n                                        Your name is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_name.$error.minlength\">\n                                        Your name needs to be at least 3 characters\n                                    </small>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div ng-if=\"!accountAddress\" class=\"form-column__6\">\n                            <label for=\"{{formName}}_address_email\">Email *</label>\n                            <div class=\"input-validate\">\n                                <input track-focus id=\"{{formName}}_address_email\" name=\"{{formName}}_address_email\" type=\"email\" value=\"\" ng-model=\"model.email\" required ng-class=\"{\'required--focus\':(showErrors ||{{formName}}.{{formName}}_address_email.$touched && {{formName}}.{{formName}}_address_email.$invalid)}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_email.$touched) && {{formName}}.{{formName}}_address_email.$invalid && {{formName}}.{{formName}}_address_email.hasFocus\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_email.$error.required\">\n                                        Your email is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_email.$error.email\">\n                                        Your email is invalid.\n                                    </small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"column__12\">\n                            <label for=\"{{formName}}_street_address\">Street Address *</label>\n                            <div class=\"input-validate\">\n                                <input track-focus id=\"{{formName}}_street_address\" name=\"{{formName}}_street_address\" type=\"text\" value=\"\" ng-model=\"model[\'street-address\']\" required ng-minlength=\"8\" ng-class=\"{\'required--focus\':(showErrors ||{{formName}}.{{formName}}_street_address.$touched && {{formName}}.{{formName}}_street_address.$invalid)}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_street_address.$touched) && {{formName}}.{{formName}}_street_address.$invalid && {{formName}}.{{formName}}_street_address.hasFocus\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_street_address.$error.required\">\n                                        Your address is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_street_address.$error.minlength\">\n                                        Your address needs to be at least 8 characters\n                                    </small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"column__12\">\n                            <label for=\"{{formName}}_street_address2\">Street Address (optional)</label>\n                            <div class=\"input-validate\">\n                                <input track-focus id=\"{{formName}}_street_address2\" name=\"{{formName}}_street_address2\" type=\"text\" value=\"\" ng-model=\"model[\'street-address2\']\">\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <label for=\"{{formName}}_tel\">Phone *</label>\n                        <div class=\"input-validate\">\n                            <input track-focus id=\"{{formName}}_tel\" name=\"{{formName}}_tel\" type=\"tel\" value=\"\" ng-model=\"model.tel\" required ng-class=\"{\'required--focus\':(showErrors ||{{formName}}.{{formName}}_tel.$touched && {{formName}}.{{formName}}_tel.$invalid)}\">\n                            <i class=\"fa fa-check\"></i>\n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_tel.$touched) && {{formName}}.{{formName}}_tel.$invalid && {{formName}}.{{formName}}_tel.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_tel.$error.required\">\n                                    Your phone number is required.\n                                </small>\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_tel.$error.pattern\">\n                                    Your phone number is invalid.\n                                </small>\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_tel.$error.minlength\">\n                                    Your phone number needs to be at least 7 characters\n                                </small>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <label for=\"{{formName}}_address_country\">Country *</label>\n                        <div class=\"input-validate\">\n                            <select track-focus id=\"{{formName}}_address_country\" name=\"{{formName}}_address_country\" ng-options=\"country.country_id as country.country_name for country in regions | orderBy: \'position\'\" ng-model=\"model.country\" ng-change=\"updateSubregions()\" required ng-class=\"{\'required--focus\':(showErrors ||{{formName}}.{{formName}}_address_country.$touched && {{formName}}.{{formName}}_address_country.$invalid)}\">\n                            <option value=\"\">Country <span class=\"checkout__required\"> *</span></option>\n                            </select>                                 \n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_country.$touched) && {{formName}}.{{formName}}_address_country.$invalid && {{formName}}.{{formName}}_address_country.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_country.$error.required\">\n                                    Your country is required.\n                                </small>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <label for=\"{{formName}}_address_postal\">Postal Code *</label>\n                        <div class=\"input-validate\">\n                            <input track-focus id=\"{{formName}}_address_postal\" name=\"{{formName}}_address_postal\" type=\"text\" value=\"\" ng-model=\"model[\'postal-code\']\" required ng-minlength=\"3\" ng-class=\"{\'required--focus\':(showErrors ||{{formName}}.{{formName}}_address_postal.$touched && {{formName}}.{{formName}}_address_postal.$invalid)}\" ng-blur=\"checkPostalCode()\">\n                            <i class=\"fa fa-check\"></i>\n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_postal.$touched) && {{formName}}.{{formName}}_address_postal.$invalid && {{formName}}.{{formName}}_address_postal.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_postal.$error.required\">\n                                    Your zip code is required.\n                                </small>\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_postal.$error.minlength\">\n                                    Your zip code needs to be at least 3 characters.\n                                </small>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <label for=\"{{formName}}_address_locality\">City *</label>\n                        <div class=\"input-validate\">\n                            <input track-focus id=\"{{formName}}_address_locality\" name=\"{{formName}}_address_locality\" type=\"text\" value=\"\" ng-model=\"model.locality\" required ng-minlength=\"3\" ng-class=\"{\'required--focus\':(showErrors ||{{formName}}.{{formName}}_address_locality.$touched && {{formName}}.{{formName}}_address_locality.$invalid)}\">\n                            <i class=\"fa fa-check\"></i>\n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_locality.$touched) && {{formName}}.{{formName}}_address_locality.$invalid && {{formName}}.{{formName}}_address_locality.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_locality.$error.required\">\n                                    Your city is required.\n                                </small>\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_locality.$error.minlength\">\n                                    Your city needs to be at least 3 characters.\n                                </small>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"row\">\n                        <label for=\"{{formName}}_address_region_select\">State / Region *</label>\n                        <div class=\"input-validate\">\n                            \n                            <select track-focus ng-if=\"subRegions.length\" id=\"{{formName}}_address_region_select\" name=\"{{formName}}_address_region_select\" ng-options=\"region.region_id as region.name for region in subRegions\" ng-model=\"model.region_id\" ng-change=\"updateRegion(model.region_id)\" required ng-class=\"{\'required--focus\':(showErrors || {{formName}}.{{formName}}_address_region_select.$touched && {{formName}}.{{formName}}_address_region_select.$invalid)}\">\n                                <option value=\"\">Select</option>\n                            </select>                            \n                            \n                            <input track-focus ng-if=\"!subRegions.length\" type=\'text\' name=\"{{formName}}_address_region\" id=\"{{formName}}_address_region\" ng-model=\"model.region\" required ng-class=\"{\'required--focus\':(showErrors ||{{formName}}.{{formName}}_address_region.$touched && {{formName}}.{{formName}}_address_region.$invalid)}\">\n                            \n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_region_select.$touched) && {{formName}}.{{formName}}_address_region_select.$invalid && {{formName}}.{{formName}}_address_region_select.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_region_select.$error.required\">\n                                    Your state/region is required.\n                                </small>\n                            </div>\n\n                            <div class=\"error-container\" ng-show=\"(showErrors || {{formName}}.{{formName}}_address_region.$touched) && {{formName}}.{{formName}}_address_region.$invalid && {{formName}}.{{formName}}_address_region.hasFocus\">\n                                <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_region.$error.required\">\n                                    Your state/region is required.\n                                </small>\n                            </div>\n\n                        </div>\n                        \n                    </div>\n                </div>\n\n            </div>\n            \n        </form>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/gallery/gallery.html", "<div class=\"gallery\">\n	<div class=\"gallery__inner\">\n		<div class=\"gallery__main\" ng-swipe-left=\"nextPhoto()\" ng-swipe-right=\"prevPhoto()\">\n\n            <div class=\"gallery__photo\">\n\n                <!-- IF media is an image -->\n                <div afkl-lazy-image=\"{{formatImages([{screenWidth:480, imageWidth:480}, {screenWidth:640, imageWidth:640}, {screenWidth:1024, imageWidth:1150}], galleryMedia[currentIndex].url)}}\" afkl-lazy-image-options=\"{\'className\': \'photo__index-\' + currentIndex, \'alt\':galleryMedia[currentIndex].label}\" ng-if=\"galleryMedia[currentIndex].type == \'image\'\"></div>\n\n                <!-- Preloader: preload the next image to speed up browsing -->\n                <div class=\"hidden\" afkl-lazy-image=\"{{formatImages([{screenWidth:480, imageWidth:480}, {screenWidth:640, imageWidth:640}, {screenWidth:1024, imageWidth:1150}], galleryMedia[currentIndex+1].url)}}\" afkl-lazy-image-options=\"{\'className\': \'photo__index-\' + currentIndex+1, \'alt\':galleryMedia[currentIndex+1].label}\" ng-if=\"galleryMedia[currentIndex+1] && galleryMedia[currentIndex+1].type == \'image\'\"></div>\n                <!-- END preloader -->\n                <!-- END IF media is an image -->\n\n\n                <!-- IF media is a video -->\n                <bb-video name=\"{{galleryMedia[currentIndex].name}}\" description=\"{{galleryMedia[currentIndex].description}}\" url=\"{{galleryMedia[currentIndex].url}}\" play=\"galleryMedia[currentIndex].play\" ng-if=\"galleryMedia[currentIndex].type == \'video\' && galleryMedia[currentIndex].videoType == \'gallery\'\"></bb-video>\n                <!-- END IF media is a video -->\n\n            </div>\n\n			<div class=\"gallery__next\" ng-class=\"{\'visuallyhidden\' : currentIndex == galleryMedia.length - 1 }\">\n				<button type=\"button\" class=\"betabrand-chevron-right\" ng-click=\"nextPhoto()\" ng-disabled=\"currentIndex == galleryMedia.length - 1\"><span class=\"visuallyhidden\">Next Photo</span></button>\n			</div>\n			<div class=\"gallery__prev\" ng-class=\"{\'visuallyhidden\' : currentIndex == 0 }\">\n				<button type=\"button\" class=\"betabrand-chevron-left\" ng-click=\"prevPhoto()\" ng-disabled=\"currentIndex == 0\"><span class=\"visuallyhidden\">Previous Photo</span></button>\n			</div>\n		</div>\n		<div class=\"gallery-thumbnails\">\n			<div class=\"gallery-thumbnails__inner\" ng-style=\"{left: myTransform}\">\n                <div class=\"gallery-thumbnails__photos index-{{$index}}\" ng-repeat=\"image in galleryMedia track by $index\" ng-class=\"{\'active\' : $index == currentIndex, \'video-thumbnail\':image.type == \'video\' && image.videoType == \'gallery\' }\" ng-style=\"{width: myThumbnailWidth}\">\n                    <div class=\"thumbnail-wrapper\" ng-click=\"syncPhoto($index)\" ng-style=\"(image.type == \'video\' && image.videoType == \'gallery\') && {\'background-image\': \'url(\'+\'{{image.url | videoDefaultImage}}\'+\')\'}\">\n\n                        <!-- IF media is an image -->\n\n                        <div afkl-lazy-image=\"{{formatThumbnails([{screenWidth:0, imageWidth:150}], image.url)}}\" class=\"afkl-lazy-wrapper afkl-img-ratio-1-1\" afkl-lazy-image-options=\"::{alt: image.label, className: \'product__img\'}\" ng-if=\"image.type == \'image\'\"></div>\n\n                        <!-- END IF media is an image -->\n\n                        <!-- IF media is a video -->\n                        <span class=\"video-thumbnail__icon\" ng-if=\"image.type == \'video\' && image.videoType == \'gallery\'\"><i class=\"fa fa-play-circle-o\"></i></span>\n                        <!-- END IF media is a video -->\n\n                    </div>\n                </div>\n			</div>\n		</div>       \n	</div>\n\n</div>\n");
  $templateCache.put("/angular/app/header/fire-cart.html", "<div class=\"fire-cart\">\n    \n    <div class=\"fire-cart--empty\" ng-if=\"!fireCartFlames.activated && (!cart.data.items || cart.data.items.length == 0)\">\n        <img src=\"/angular/images/fire-cart/empty-fire-cart.svg\" />\n    </div>\n\n    <div class=\"fire-cart--active\" ng-if=\"fireCartFlames.activated\" ng-class=\"{\'fire-cart--drive\': fireCartDrive.activated}\">\n        <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"-869 943 200 60\" style=\"enable-background:new -869 943 200 60;\" xml:space=\"preserve\">\n            <style type=\"text/css\">\n            .st0 {\n                fill: #333366;\n            }\n            \n            .st1 {\n                fill: #666699;\n            }\n            \n            .st2 {\n                fill: none;\n                stroke: #000000;\n                stroke-miterlimit: 10;\n            }\n            \n            .st3 {\n                fill: #EE2924;\n            }\n            \n            .st4 {\n                fill: #F58321;\n            }\n            \n            .st5 {\n                fill: #FFDE05;\n            }\n            </style>\n            <g id=\"Layer_1_1_\">\n            </g>\n            <g id=\"Layer_2\">\n            </g>\n            <g id=\"fire-cart__frame-1\">\n                <rect id=\"XMLID_57_\" x=\"-699.2\" y=\"951.8\" transform=\"matrix(0.9744 -0.2249 0.2249 0.9744 -232.6773 -131.6517)\" class=\"st0\" width=\"10.3\" height=\"7\" />\n                <rect id=\"XMLID_56_\" x=\"-686.8\" y=\"951.1\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 251.1104 1662.7875)\" class=\"st1\" width=\"7.1\" height=\"4.8\" />\n                <rect id=\"XMLID_55_\" x=\"-691.8\" y=\"960.1\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 257.8943 1676.5441)\" class=\"st1\" width=\"10.5\" height=\"7.1\" />\n                <polygon id=\"XMLID_54_\" class=\"st2\" points=\"-692.4,972.3 -673.9,966.3 -674.7,954 -700.6,957.4   \" />\n                <line id=\"XMLID_53_\" class=\"st2\" x1=\"-704.8\" y1=\"957.5\" x2=\"-700.6\" y2=\"957.4\" />\n                <path id=\"XMLID_52_\" class=\"st2\" d=\"M-669,972.7c0,0-1.7-1-2.8-0.8s-18.4,6.3-18.4,6.3s-3.6,1.2-4.4-1.2c-1.3-3.7,2.2-4.8,2.2-4.8\" />\n                <circle id=\"XMLID_51_\" cx=\"-674.3\" cy=\"977.7\" r=\"2.2\" />\n                <circle id=\"XMLID_50_\" cx=\"-687.9\" cy=\"982\" r=\"2.2\" />\n                <line id=\"XMLID_49_\" class=\"st2\" x1=\"-695.5\" y1=\"956.7\" x2=\"-688.8\" y2=\"971.1\" />\n                <line id=\"XMLID_48_\" class=\"st2\" x1=\"-690.1\" y1=\"956\" x2=\"-685.2\" y2=\"970\" />\n                <line id=\"XMLID_47_\" class=\"st2\" x1=\"-684.5\" y1=\"955.3\" x2=\"-681.1\" y2=\"968.7\" />\n                <line id=\"XMLID_46_\" class=\"st2\" x1=\"-679\" y1=\"954.6\" x2=\"-677.5\" y2=\"967.5\" />\n                <line id=\"XMLID_45_\" class=\"st2\" x1=\"-698.6\" y1=\"961\" x2=\"-674.5\" y2=\"956.7\" />\n                <line id=\"XMLID_44_\" class=\"st2\" x1=\"-674.3\" y1=\"959.8\" x2=\"-696.1\" y2=\"965.5\" />\n                <line id=\"XMLID_43_\" class=\"st2\" x1=\"-694.1\" y1=\"969.2\" x2=\"-674.1\" y2=\"963.1\" />\n                <path id=\"XMLID_42_\" class=\"st3\" d=\"M-696.1,977.7c0,0-4.7-0.1-6.6-4.1s-3-9-5.5-11.6s-9.8-4.8-9.8-4.8s9.8,6.6,3.3,9\n                c-6.5,2.4-9.8-6.1-13.5-9.4c-3.7-3.3-13.9-2.2-13.9-2.2s16,2,14.1,11c-1.8,8.6-5.3,7.9-5.3,7.9s-4.7-10.4-12.2-13.6\n                c-7.5-3.2-12,0.6-12,0.6s10.9-2.2,9.8,3.5c-0.2,0.9-3.9,1.2-3.9,1.2s19.1,0.4,9.6,9.1c-9.5,8.7-14.5-11.2-20.2-13.7\n                c-5.2-2.3-2.5,2.7-7.5,2.6c-5-0.1-6.3-4.9-11.3-4.2c0,0,3.3,1.8,4.3,3.1s4.1,3.9,6.1,4.2c2.8,0.3,13.1-1,6.9,7.5\n                c-6.2,8.5-10.5-4.3-12.3-6.1c-1.8-1.8-5-1.3-5-1.3s7.2,2.3,1.5,7.1c-5.7,4.8-7.8-6.9-12.3-10.1s-6.5,1.5-6.5,1.5s4.7-2.5,2.6,3\n                c-1.1,2.8-5.5-2.4-5.5-2.4s3.1,6.5,7.4,3.9c3.4-2.1,9,0.1,4.3,6c-4.7,5.9-11.5-0.5-12.3-1.3c-0.8-0.8-4.2-5-6.5-5.2\n                c-2.3-0.3-7,0.4-7,0.4s8.3,2.7,5.8,5.3c-2.5,2.7-10.8-2.7-15-4.4c-2.5-1-4.3,0-4.3,0s7.3,0.3,4.8,5.2c-2.5,5-10.5-7-15-7.7\n                c-4.5-0.8-11.8,1.2-11.8,1.2s15.8-2.4,15.3,5.2c-0.3,4.9-14.6,0.2-18.5,0.5c-4.2,0.3-9.4,3.8-9.4,3.8s11.3-4,14.2-0.8\n                c2,2.2-3.7,4.4-3.7,4.4s24.3-6.1,22-1.8c-1.7,3.1-3.8,0.7-7.3,0.9c-3.5,0.2-6.3,3.2-6.3,3.2s5.3-3.5,11,0c3.8,2.3,9.7-4.4,17.2-4.3\n                s10.1,2.5,8.8,4.8c-1.3,2.3-7.5-3.3-12.2,0.3c0,0,4.1-2.1,10.6,3.5c3.5,3.1,8.2-8,10-6.4c1.8,1.6-2.2,5.8-2.2,5.8s23-12.8,27-6.5\n                c4,6.3-3.8,6.3-3.8,6.3s-5.5-2-10.7,1.7c0,0,8.5-1.5,6.3,3s-7.7,2.2-7.7,2.2s6.4,3.8,9.8,1.2c3.4-2.7,6.1-9.6,11-7.8\n                c2.5,0.9-1.4,5.5-1.4,5.5s15.4-14,17.6-8c2,5.4-1.9,2.3-5.1,5.2c-2.8,2.6-4.4,7.9-4.4,7.9s6.7-11.7,15.2-5.3c2,1.5-1,2.6-4.2,2.7\n                c-2.2,0-6.2,3-6.2,3s3.8-1.8,6.8-1.3c2,0.3,4.3,0.1,5.7-1.3c2.2-2.2-0.5-8.4,5.6-9.7c6.2-1.3,4.9,1.6,1.8,4.7\n                c-3.1,3.1-2.2,4.8-4.5,8.3c-1.4,2.1-8.5,3.7-8.5,3.7s9.1-0.6,11.4-2.3c3-2.3,4.1-7.4,8.1-8.6s10.3-1.7,10.3,1.3s-4.3,5-4.3,5\n                s9,1.8,16.5-4.5C-701.2,987.6-696.1,977.7-696.1,977.7z\" />\n                <path id=\"XMLID_36_\" class=\"st4\" d=\"M-739.1,997.8c0.1-0.4,0.2-0.7,0.4-1c0.6-1.6,1.1-3.2,2.9-4.9c2.1-2,4-4.8,3.2-7\n                c-0.3-0.9-1.3-1.9-3.7-1.9c-0.5,0-1,0-1.5,0.1c-6.5,0.9-7.1,5.7-7.5,8.9c0,0,0,0.1,0,0.1c-0.3-0.4-0.6-0.8-1.1-1.1\n                c-1.6-1-3.2-1.6-4.7-1.8c0.6-0.4,1.1-0.9,1.5-1.5c0.8-1.4,0.8-3.2-0.1-5.2c-0.5-1.2-1.6-1.8-3.1-1.8c-3.7,0-9.9,4.2-13,6.5\n                c0-0.2-0.1-0.4-0.2-0.6c-0.2-0.5-0.8-1.3-1.9-1.6c-0.5-0.2-1-0.2-1.6-0.2c-0.3,0-0.6,0-0.8,0.1c0.1-0.2,0.1-0.3,0.2-0.5\n                c0.5-1.4,0.5-3.5-2.3-5.8c-1-0.8-2.4-1.2-4.3-1.2c-6,0-15.6,4.1-20,6.2c0.3-1.3,0.3-2.8-1-3.7c-0.3-0.2-0.6-0.3-0.9-0.3\n                c-1.3,0-2.4,1.4-4,3.3c-0.5,0.7-1.2,1.4-1.8,2.1c0.7-2,0.2-3.3-0.3-4.2c-1.4-2.1-4.8-3.3-9.7-3.3c-0.9,0-1.9,0-2.9,0.1\n                c-3.9,0.3-6.8,2.1-9.2,3.5c-1.6,1-3.1,1.8-4.2,1.8c-0.2,0-0.3,0-0.5-0.1c1.2-0.2,2.1-1.1,2.9-2.5c0.7-1.3,0.4-2.1,0.1-2.6\n                c-0.6-1-1.9-1.4-4.2-1.4c-0.7,0-1.5,0-2.3,0.1c0.6-0.4,1-1,1.2-1.7c0.2-0.6,0.3-1.1,0.3-1.7c0.1,0.1,0.1,0.1,0.2,0.2\n                c2.6,2.6,5.4,5.3,7.9,5.3c1.5,0,2.7-1,3.6-2.9c0.4-1,0.5-1.9,0.2-2.8c3.6,1.9,8.1,4.1,11.2,4.1c1.4,0,2.4-0.4,3.1-1.3\n                c1.1-1.3,1-2.5,0.8-3.3c-0.3-0.8-0.8-1.5-1.5-2c1.2,0.4,2.4,2,3.1,3c0.4,0.6,0.8,1,1.1,1.3l0.2,0.2c3.7,3.2,7,4.8,9.8,4.8\n                c1.8,0,3.4-0.7,4.6-2c1.6-1.7,2.4-3.2,2.8-4.4c1.3,1.8,2.8,3.2,4.8,3.2c0,0,0,0,0,0c1,0,2.1-0.4,3.2-1.2c1.9-1.4,2.8-2.9,2.9-4.5\n                c0,0,0,0,0,0.1c1.6,2.9,4.2,7.8,8,7.8c1.6,0,3.2-0.9,4.7-2.6c2.9-3.4,4-6.2,3-8.6c-0.8-2.1-3.1-3.1-4.8-3.2c-0.3,0-0.7,0-1,0\n                c0.3-0.1,0.5-0.2,0.7-0.4c0.5-0.3,0.8-0.4,1.1-0.4c0.5,0,1.3,0.4,2.5,1.3c1.2,0.9,2.5,2.8,3.9,4.8c3,4.3,6.3,9.1,11.1,9.1\n                c2,0,4.1-0.9,6.1-2.7c2.1-1.8,3.2-3.6,3.3-5.1c1.5,2.8,2.2,5,2.2,5l0.3,0.9l0.9-0.2c3-0.8,8.5-4,7.8-10.5c-0.2-1.7-0.5-3.1-0.9-4.3\n                c0.1,0.1,0.2,0.2,0.2,0.3c0.6,0.7,1.1,1.4,1.6,2.2c1.7,2.5,3.5,5.3,7.3,5.3c0.9,0,1.9-0.2,3-0.5c2.1-0.6,3.4-1.7,3.8-3.3\n                c0.2-0.8,0.2-1.7-0.1-2.5c0.6,0.5,1.1,1.1,1.5,1.8c0.9,1.4,1.3,2.9,1.7,4.5c0.4,1.6,0.9,3.2,1.8,4.9c1.4,2.5,4.1,4,5.7,4.6\n                c-1.2,2.1-4.3,7.1-9.4,11.7c-3.8,3.5-7.9,5-10.5,5.7c0.9-1.3,1.7-3.1,1.1-4.6c-1.1-3.1-4-3.5-6.6-3.5c-1,0-2.2,0.1-3.7,0.2\n                c-5.3,0.5-7.5,4.3-9.2,7.2C-738.3,996.6-738.7,997.2-739.1,997.8z M-781.8,994.5c0.8-0.8,1.3-1.7,1.5-2.9c0.1-1.1-0.1-2.1-0.7-2.8\n                c0.3,0.1,0.6,0.2,0.9,0.3c0.8,0.2,1.5,0.5,2.4,0.5l0.2,0c0.2,0,0.4,0,0.7-0.1c-0.5,0.5-0.9,1.1-1.4,1.7c-0.9,1.1-1.7,2.1-2.4,2.7\n                C-780.9,994.1-781.3,994.4-781.8,994.5z M-847.2,979c0.1-0.2,0.1-0.4,0.1-0.5c0.1-0.5,0-1.2-0.6-2c2.1,0.4,4.5,0.9,6.6,1\n                C-843.4,978-845.5,978.6-847.2,979z M-793.7,967.6c0-0.1,0.1-0.3,0.1-0.5c0.2-1.4,0.2-2.5-0.2-3.3c0.4,0.1,0.9,0.4,1.3,0.7\n                c0.7,0.5,1.4,1.3,2,2.3c-0.1,0-0.3,0-0.4,0C-791.9,966.8-792.8,967.1-793.7,967.6z M-739.8,966.3c-1.6-0.9-3.4-1.4-5-1.7\n                c0,0,0.1-0.1,0.1-0.1c0.5-0.9,0.5-1.7,0.4-2.2c0.6,0.4,1.2,0.8,1.8,1.3C-741.6,964.4-740.7,965.3-739.8,966.3z\" />\n                <path id=\"XMLID_31_\" class=\"st5\" d=\"M-717.6,994.8c0.4-1.1,0.5-2.2,0.1-3.3c-1.4-3.7-4.7-4.2-7.5-4.2c-1.1,0-2.3,0.1-3.8,0.2\n                c-1.2,0.1-2.3,0.4-3.2,0.8c0.5-1.2,0.8-2.6,0.3-3.8c-0.4-0.9-1.5-2.5-4.6-2.5c-0.5,0-1.1,0-1.6,0.1c-6,0.8-7.5,4.9-8.1,8\n                c-1-0.6-2-1.1-3.1-1.4c0.1-0.1,0.2-0.3,0.3-0.4c0.7-1.2,1.3-3.2,0-6.1c-0.7-1.5-2.1-2.4-4-2.4c-3.6,0-9.1,3.5-12.6,6\n                c-0.4-0.6-1.1-1.2-2.2-1.6c-0.4-0.1-0.9-0.2-1.3-0.2c0.2-1.5-0.1-3.7-2.8-6c-1.2-1-2.8-1.5-5-1.5c-0.6,0-1.1,0-1.8,0.1\n                c0.3-0.1,0.5-0.3,0.8-0.5c1.2-0.9,2-1.8,2.6-2.8c1.7,3,4.2,6.3,7.8,6.3c1.9,0,3.7-1,5.4-2.9c2.3-2.6,3.5-4.9,3.6-7.1\n                c0.1,0.2,0.2,0.3,0.3,0.5c3,4.2,6.6,9.5,11.9,9.5c2.2,0,4.5-1,6.8-2.9c1.3-1.1,2.2-2.2,2.9-3.3c0.7,1.6,1.1,2.7,1.1,2.8l0.6,1.8\n                l1.8-0.5c3.3-0.8,9.2-4.3,8.6-11.3c1.6,2.2,3.6,4.3,7.2,4.3c1,0,2.1-0.2,3.3-0.5c2.9-0.9,4-2.6,4.4-3.8c0.6,1.2,0.9,2.3,1.3,3.7\n                c0.4,1.6,0.9,3.3,1.9,5.2c1.3,2.3,3.5,3.7,5.1,4.6c-1.4,2.4-4.3,6.6-8.6,10.5C-712.6,992.6-715.4,994-717.6,994.8z M-803.3,982.1\n                c-0.1-0.7-0.4-1.3-0.7-1.7c-0.9-1.4-2.3-2.3-3.9-2.8c0.7-0.3,1.1-0.7,1.4-1.1c0.6-0.7,0.9-1.4,1-2c0.4,0.5,0.7,0.8,1,1.1l0.2,0.2\n                c1.6,1.3,3,2.4,4.5,3.2C-801,979.4-802.1,980.6-803.3,982.1z M-795.7,982.1c0-0.6-0.2-1.1-0.5-1.6c0.8,0.2,1.6,0.3,2.3,0.3\n                c0.6,0,1.1-0.1,1.6-0.2C-793.5,981.1-794.7,981.6-795.7,982.1z M-790.2,979.8c0.6-0.4,1.2-0.8,1.7-1.3c1.1-1.2,1.8-2.2,2.4-3.2\n                c1,1,2.1,1.8,3.4,2.1C-785.2,978-787.8,978.9-790.2,979.8z\" />\n                <animate id=\"frame1\" attributeName=\"display\" values=\"inline;none;none;none\" keyTimes=\"0;0.33;0.66;1\" dur=\".3s\" begin=\"0s\" repeatCount=\"indefinite\" />\n            </g>\n            <g id=\"fire-cart__frame-2\">\n                <rect id=\"XMLID_74_\" x=\"-698.2\" y=\"948.9\" transform=\"matrix(0.9999 -1.223393e-02 1.223393e-02 0.9999 -11.703 -8.4079)\" class=\"st0\" width=\"10.3\" height=\"7\" />\n                <rect id=\"XMLID_73_\" x=\"-685.8\" y=\"948.8\" transform=\"matrix(-0.4057 0.914 -0.914 -0.4057 -89.5993 1960.7194)\" class=\"st1\" width=\"7.1\" height=\"4.8\" />\n                <rect id=\"XMLID_72_\" x=\"-690.8\" y=\"959.2\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 258.0098 1674.6069)\" class=\"st1\" width=\"10.5\" height=\"7.1\" />\n                <g id=\"XMLID_59_\">\n                    <polygon id=\"XMLID_71_\" class=\"st2\" points=\"-692.4,972.4 -673.9,966.4 -674.7,954.1 -700.6,957.5         \" />\n                    <line id=\"XMLID_70_\" class=\"st2\" x1=\"-704.8\" y1=\"957.6\" x2=\"-700.6\" y2=\"957.5\" />\n                    <path id=\"XMLID_69_\" class=\"st2\" d=\"M-669,972.8c0,0-1.7-1-2.8-0.8s-18.4,6.3-18.4,6.3s-3.6,1.2-4.4-1.2c-1.3-3.7,2.2-4.8,2.2-4.8\n                    \" />\n                    <circle id=\"XMLID_68_\" cx=\"-674.3\" cy=\"977.7\" r=\"2.2\" />\n                    <circle id=\"XMLID_67_\" cx=\"-687.9\" cy=\"982.1\" r=\"2.2\" />\n                    <line id=\"XMLID_66_\" class=\"st2\" x1=\"-695.5\" y1=\"956.8\" x2=\"-688.8\" y2=\"971.2\" />\n                    <line id=\"XMLID_65_\" class=\"st2\" x1=\"-690.1\" y1=\"956.1\" x2=\"-685.2\" y2=\"970.1\" />\n                    <line id=\"XMLID_64_\" class=\"st2\" x1=\"-684.5\" y1=\"955.4\" x2=\"-681.1\" y2=\"968.8\" />\n                    <line id=\"XMLID_63_\" class=\"st2\" x1=\"-679\" y1=\"954.6\" x2=\"-677.5\" y2=\"967.6\" />\n                    <line id=\"XMLID_62_\" class=\"st2\" x1=\"-698.6\" y1=\"961.1\" x2=\"-674.5\" y2=\"956.8\" />\n                    <line id=\"XMLID_61_\" class=\"st2\" x1=\"-674.3\" y1=\"959.9\" x2=\"-696.1\" y2=\"965.6\" />\n                    <line id=\"XMLID_60_\" class=\"st2\" x1=\"-694.1\" y1=\"969.3\" x2=\"-674.1\" y2=\"963.2\" />\n                </g>\n                <path id=\"XMLID_58_\" class=\"st3\" d=\"M-695.1,976.7c0,0-4,0.1-5.6,4.1c-1.6,4-2.6,9-4.7,11.6c-2.1,2.5-8.3,4.8-8.3,4.8\n                s8.3-6.5,2.8-9c-5.5-2.4-8.3,6.1-11.5,9.4s-11.8,2.2-11.8,2.2s13.6-2,12-11c-1.5-8.6-4.5-7.9-4.5-7.9s-4,10.3-10.3,13.5\n                c-6.4,3.2-10.2-0.6-10.2-0.6s9.2,2.2,8.3-3.5c-0.1-0.9-3.3-1.2-3.3-1.2s16.2-0.4,8.1-9.1c-8.1-8.6-12.3,11.2-17.1,13.7\n                c-4.4,2.3-2.1-2.7-6.3-2.6c-4.2,0.1-5.4,4.9-9.6,4.2c0,0,2.8-1.8,3.7-3.1c0.8-1.3,3.5-3.9,5.2-4.1c2.4-0.3,11.1,1,5.9-7.4\n                c-5.2-8.5-8.9,4.3-10.5,6.1c-1.6,1.7-4.2,1.3-4.2,1.3s6.1-2.3,1.3-7.1c-4.8-4.8-6.6,6.9-10.5,10.1c-3.8,3.2-5.5-1.5-5.5-1.5\n                s4,2.5,2.2-3c-0.9-2.7-4.7,2.4-4.7,2.4s2.7-6.5,6.3-3.9c2.9,2.1,7.6-0.1,3.7-6c-4-5.8-9.8,0.5-10.5,1.3c-0.7,0.8-3.5,5-5.5,5.2\n                c-2,0.3-5.9-0.4-5.9-0.4s7.1-2.7,4.9-5.3s-9.2,2.7-12.7,4.4c-2.1,1-3.7,0-3.7,0s6.2-0.3,4.1-5.2c-2.1-5-8.9,6.9-12.7,7.7\n                s-10-1.2-10-1.2s13.4,2.4,13-5.2c-0.2-4.9-12.4-0.2-15.7-0.5c-3.5-0.3-8-3.8-8-3.8s9.6,3.9,12.1,0.8c1.7-2.2-3.1-4.4-3.1-4.4\n                s20.6,6.1,18.6,1.8c-1.4-3.1-3.2-0.7-6.2-0.9s-5.4-3.2-5.4-3.2s4.5,3.5,9.3,0c3.2-2.3,8.2,4.4,14.6,4.3c6.4-0.1,8.6-2.5,7.5-4.8\n                s-6.4,3.3-10.3-0.2c0,0,3.5,2.1,9-3.5c3-3.1,6.9,8,8.5,6.4c1.6-1.6-1.8-5.7-1.8-5.7s19.5,12.8,22.9,6.5c3.4-6.3-3.3-6.3-3.3-6.3\n                s-4.7,2-9-1.7c0,0,7.2,1.5,5.4-3c-1.8-4.5-6.5-2.2-6.5-2.2s5.5-3.8,8.3-1.2c2.9,2.7,5.2,9.5,9.4,7.8c2.1-0.9-1.2-5.5-1.2-5.5\n                s13.1,14,14.9,8c1.7-5.4-1.6-2.3-4.3-5.2c-2.4-2.6-3.7-7.8-3.7-7.8s5.7,11.7,12.9,5.3c1.7-1.5-0.8-2.6-3.5-2.7c-1.8,0-5.2-3-5.2-3\n                s3.2,1.8,5.8,1.3c1.7-0.3,3.6-0.1,4.8,1.3c1.9,2.2-0.5,8.4,4.8,9.7c5.2,1.3,4.2-1.5,1.6-4.7c-2.7-3.1-1.8-4.8-3.8-8.2\n                c-1.2-2.1-7.2-3.7-7.2-3.7s7.7,0.6,9.7,2.3c2.5,2.3,3.5,7.4,6.9,8.6c3.4,1.2,8.8,1.7,8.8-1.3s-3.7-5-3.7-5s7.6-1.8,14,4.5\n                C-699.4,966.9-695.1,976.7-695.1,976.7z\" />\n                <path id=\"XMLID_10_\" class=\"st4\" d=\"M-731.6,956.7c0.1,0.4,0.2,0.7,0.3,1c0.5,1.6,0.9,3.2,2.4,4.9c1.8,2,3.4,4.8,2.7,6.9\n                c-0.3,0.9-1.1,1.9-3.1,1.9c-0.4,0-0.8,0-1.3-0.1c-5.5-0.9-6-5.7-6.4-8.9c0,0,0-0.1,0-0.1c-0.2,0.4-0.5,0.8-0.9,1.1\n                c-1.3,1-2.7,1.6-4,1.8c0.5,0.4,0.9,0.9,1.2,1.5c0.7,1.4,0.7,3.2-0.1,5.2c-0.4,1.2-1.4,1.8-2.6,1.8c-3.1,0-8.4-4.2-11.1-6.5\n                c0,0.2-0.1,0.4-0.1,0.6c-0.2,0.5-0.6,1.3-1.6,1.6c-0.4,0.2-0.9,0.2-1.3,0.2c-0.2,0-0.5,0-0.7-0.1c0.1,0.2,0.1,0.3,0.2,0.5\n                c0.4,1.4,0.4,3.5-1.9,5.7c-0.8,0.8-2.1,1.2-3.7,1.2c-5.1,0-13.2-4.1-16.9-6.2c0.3,1.3,0.2,2.8-0.9,3.7c-0.2,0.2-0.5,0.3-0.8,0.3\n                c-1.1,0-2-1.4-3.4-3.3c-0.5-0.7-1-1.4-1.5-2.1c0.6,1.9,0.2,3.3-0.3,4.2c-1.2,2.1-4.1,3.3-8.2,3.3c-0.8,0-1.6,0-2.5-0.1\n                c-3.3-0.3-5.8-2.1-7.8-3.5c-1.4-1-2.6-1.8-3.6-1.8c-0.1,0-0.3,0-0.4,0.1c1,0.2,1.8,1.1,2.4,2.5c0.6,1.3,0.4,2.1,0.1,2.6\n                c-0.5,1-1.6,1.4-3.5,1.4c-0.6,0-1.3,0-2-0.1c0.5,0.4,0.8,1,1,1.7c0.2,0.6,0.2,1.1,0.3,1.7c0-0.1,0.1-0.1,0.1-0.2\n                c2.2-2.6,4.6-5.3,6.7-5.3c1.3,0,2.3,1,3,2.9c0.3,1,0.4,1.9,0.2,2.8c3.1-1.9,6.9-4.1,9.5-4.1c1.2,0,2.1,0.4,2.6,1.3\n                c0.9,1.3,0.9,2.5,0.6,3.3c-0.2,0.8-0.7,1.5-1.3,2c1-0.4,2-2,2.7-3c0.4-0.6,0.7-1,0.9-1.2l0.2-0.2c3.1-3.2,5.9-4.8,8.3-4.8\n                c1.5,0,2.8,0.7,3.9,2c1.3,1.7,2,3.2,2.4,4.4c1.1-1.8,2.4-3.1,4.1-3.1c0,0,0,0,0,0c0.9,0,1.8,0.4,2.7,1.2c1.6,1.3,2.4,2.9,2.5,4.5\n                c0,0,0,0,0-0.1c1.3-2.9,3.5-7.8,6.8-7.8c1.4,0,2.7,0.9,4,2.5c2.5,3.3,3.4,6.2,2.6,8.5c-0.7,2.1-2.6,3.1-4,3.2c-0.3,0-0.6,0-0.9,0\n                c0.2,0.1,0.4,0.2,0.6,0.4c0.4,0.3,0.7,0.4,1,0.4c0.4,0,1.1-0.4,2.1-1.3c1-0.9,2.1-2.8,3.3-4.8c2.5-4.2,5.4-9.1,9.4-9.1\n                c1.7,0,3.4,0.9,5.2,2.7c1.8,1.8,2.7,3.5,2.8,5.1c1.3-2.7,1.9-5,1.9-5l0.2-0.9l0.8,0.2c2.6,0.8,7.2,3.9,6.6,10.4\n                c-0.2,1.7-0.4,3.1-0.8,4.3c0.1-0.1,0.1-0.2,0.2-0.3c0.5-0.7,0.9-1.4,1.3-2.2c1.4-2.5,3-5.2,6.2-5.2c0.8,0,1.6,0.2,2.5,0.5\n                c1.8,0.6,2.9,1.7,3.2,3.3c0.2,0.8,0.1,1.7,0,2.4c0.5-0.5,0.9-1.1,1.3-1.8c0.7-1.4,1.1-2.9,1.4-4.5c0.4-1.6,0.7-3.2,1.6-4.9\n                c1.2-2.5,3.5-4,4.8-4.6c-1-2.1-3.7-7.1-8-11.7c-3.3-3.5-6.7-5-8.9-5.7c0.8,1.3,1.4,3.1,1,4.6c-1,3.1-3.4,3.5-5.6,3.5\n                c-0.9,0-1.9-0.1-3.1-0.2c-4.5-0.5-6.3-4.2-7.8-7.2C-730.9,957.9-731.2,957.2-731.6,956.7z M-767.8,959.9c0.7,0.8,1.1,1.7,1.3,2.9\n                c0.1,1.1-0.1,2.1-0.6,2.8c0.3-0.1,0.5-0.2,0.8-0.3c0.6-0.2,1.3-0.5,2-0.5l0.1,0c0.2,0,0.4,0,0.6,0.1c-0.4-0.5-0.8-1.1-1.2-1.7\n                c-0.7-1.1-1.4-2.1-2-2.7C-767.1,960.3-767.4,960.1-767.8,959.9z M-823.3,975.4c0,0.2,0.1,0.4,0.1,0.5c0,0.5,0,1.2-0.5,2\n                c1.8-0.4,3.8-0.9,5.6-1C-820,976.4-821.9,975.8-823.3,975.4z M-777.9,986.8c0,0.1,0.1,0.3,0.1,0.5c0.2,1.4,0.1,2.5-0.2,3.3\n                c0.4-0.1,0.7-0.4,1.1-0.7c0.6-0.5,1.2-1.3,1.7-2.3c-0.1,0-0.2,0-0.3,0C-776.3,987.6-777.2,987.3-777.9,986.8z M-732.2,988.1\n                c-1.3,0.8-2.9,1.4-4.3,1.7c0,0,0,0.1,0.1,0.1c0.5,0.9,0.5,1.7,0.3,2.2c0.5-0.4,1-0.8,1.5-1.3C-733.7,990-732.9,989-732.2,988.1z\" />\n                <path id=\"XMLID_4_\" class=\"st5\" d=\"M-713.4,959.6c0.3,1.1,0.4,2.2,0.1,3.3c-1.1,3.7-4,4.1-6.4,4.1c-0.9,0-1.9-0.1-3.2-0.2\n                c-1-0.1-1.9-0.4-2.7-0.8c0.5,1.2,0.7,2.6,0.2,3.8c-0.3,0.9-1.2,2.5-3.9,2.5c-0.4,0-0.9,0-1.4-0.1c-5.1-0.8-6.4-4.8-6.9-8\n                c-0.9,0.6-1.7,1.1-2.6,1.4c0.1,0.1,0.2,0.3,0.2,0.4c0.6,1.2,1.1,3.2,0,6.1c-0.6,1.5-1.8,2.4-3.4,2.4c-3.1,0-7.7-3.5-10.7-6\n                c-0.3,0.6-0.9,1.2-1.9,1.6c-0.4,0.1-0.7,0.2-1.1,0.2c0.2,1.5-0.1,3.7-2.4,6c-1,1-2.4,1.5-4.2,1.5c-0.5,0-1,0-1.5-0.1\n                c0.2,0.1,0.4,0.3,0.7,0.5c1,0.9,1.7,1.8,2.2,2.8c1.4-2.9,3.6-6.3,6.6-6.3c1.6,0,3.2,1,4.6,2.9c1.9,2.6,2.9,4.9,3.1,7\n                c0.1-0.2,0.2-0.3,0.3-0.5c2.5-4.2,5.6-9.5,10.1-9.5c1.9,0,3.8,1,5.7,2.9c1.1,1.1,1.9,2.2,2.4,3.3c0.6-1.6,0.9-2.7,1-2.8l0.5-1.8\n                l1.6,0.5c2.8,0.8,7.8,4.3,7.3,11.3c1.3-2.2,3.1-4.3,6.1-4.3c0.9,0,1.8,0.2,2.8,0.5c2.5,0.9,3.4,2.5,3.8,3.8\n                c0.5-1.2,0.8-2.3,1.1-3.7c0.4-1.6,0.8-3.3,1.6-5.2c1.1-2.3,2.9-3.7,4.4-4.6c-1.2-2.4-3.7-6.6-7.3-10.5\n                C-709.1,961.9-711.4,960.5-713.4,959.6z M-786.1,972.3c-0.1,0.7-0.4,1.3-0.6,1.7c-0.7,1.4-2,2.3-3.3,2.8c0.6,0.3,0.9,0.7,1.2,1.1\n                c0.5,0.7,0.7,1.4,0.9,2c0.3-0.5,0.6-0.8,0.9-1.1l0.2-0.2c1.3-1.3,2.6-2.4,3.8-3.2C-784.1,975-785,973.8-786.1,972.3z M-779.6,972.3\n                c0,0.6-0.2,1.1-0.4,1.6c0.7-0.2,1.3-0.3,2-0.3c0.5,0,0.9,0.1,1.4,0.2C-777.7,973.3-778.7,972.8-779.6,972.3z M-774.9,974.6\n                c0.5,0.4,1,0.8,1.4,1.3c0.9,1.1,1.5,2.2,2,3.2c0.8-1,1.8-1.8,2.9-2.1C-770.7,976.4-772.9,975.5-774.9,974.6z M-801.6,976.8\n                c0.2,0.4,0.5,0.9,0.7,1.5c0.2,0.5,0.3,1,0.3,1.5c1.2-0.7,2.4-1.4,3.6-2c-0.4,0-0.8-0.1-1.2-0.1\n                C-799.4,977.5-800.6,977.2-801.6,976.8z\" />\n                <path id=\"XMLID_3_\" class=\"st3\" d=\"M-840.5,971.1c0.1,1.7-3.1,4.7-6,3c-2.7-1.6-8.8-2.7-8.8-2.7s4.5-1.9,7.7-2.2\n                C-844.4,968.9-840.7,969.3-840.5,971.1z\" />\n                <path id=\"XMLID_2_\" class=\"st4\" d=\"M-845.3,973.4c-0.6,0-1.5-0.1-2.2-0.6c-1.1-0.7-2.8-1.2-5.2-1.4c1.8-0.5,5.1-1,6.4-1\n                c1.7,0,4,0.8,4,1.5C-842.2,973.3-843.7,973.4-845.3,973.4C-845.3,973.4-845.3,973.4-845.3,973.4z\" />\n                <animate id=\"frame2\" attributeName=\"display\" values=\"none;inline;none;none\" keyTimes=\"0;0.33;0.66;1\" dur=\".3s\" begin=\"0s\" repeatCount=\"indefinite\" />\n            </g>\n            <g id=\"fire-cart__frame-3\">\n                <path id=\"XMLID_92_\" class=\"st3\" d=\"M-694,977.7c0,0-3.2,0.1-4.4,4.1s-2,9-3.7,11.6c-1.7,2.5-6.6,4.8-6.6,4.8s6.6-6.5,2.2-9\n                c-4.4-2.4-6.6,6.1-9,9.4c-2.5,3.3-9.3,2.2-9.3,2.2s10.7-2,9.5-11c-1.2-8.6-3.5-7.9-3.5-7.9s-3.1,10.3-8.2,13.5c-5,3.2-8-0.6-8-0.6\n                s7.3,2.2,6.6-3.5c-0.1-0.9-2.6-1.2-2.6-1.2s12.8-0.4,6.4-9.1s-9.7,11.2-13.5,13.7c-3.5,2.3-1.6-2.7-5-2.6c-3.4,0.1-4.2,4.9-7.6,4.2\n                c0,0,2.2-1.8,2.9-3.1c0.7-1.3,2.7-3.9,4.1-4.1c1.9-0.3,8.8,1,4.6-7.4c-4.1-8.5-7,4.3-8.3,6.1c-1.2,1.7-3.4,1.3-3.4,1.3\n                s4.8-2.3,1-7.1c-3.8-4.8-5.3,6.9-8.3,10.1c-3,3.2-4.4-1.5-4.4-1.5s3.2,2.5,1.8-3c-0.7-2.7-3.7,2.4-3.7,2.4s2.1-6.5,4.9-3.9\n                c2.3,2.1,6-0.1,2.9-6c-3.1-5.8-7.7,0.5-8.3,1.3s-2.8,5-4.4,5.2c-1.6,0.3-4.7-0.4-4.7-0.4s5.6-2.7,3.9-5.3s-7.2,2.7-10.1,4.4\n                c-1.7,1-2.9,0-2.9,0s4.9-0.3,3.2-5.2c-1.7-5-7,6.9-10.1,7.7c-3,0.8-7.9-1.2-7.9-1.2s10.6,2.4,10.3-5.2c-0.2-4.9-9.8-0.2-12.4-0.5\n                c-2.8-0.3-6.3-3.8-6.3-3.8s7.6,3.9,9.5,0.8c1.4-2.2-2.5-4.4-2.5-4.4s16.3,6.1,14.7,1.8c-1.1-3.1-2.5-0.7-4.9-0.9s-4.2-3.2-4.2-3.2\n                s3.5,3.5,7.4,0c2.5-2.3,6.5,4.4,11.5,4.3s6.8-2.5,5.9-4.8s-5.1,3.3-8.2-0.2c0,0,2.7,2.1,7.1-3.5c2.3-3.1,5.5,8,6.7,6.4\n                c1.2-1.6-1.5-5.7-1.5-5.7s15.4,12.8,18.1,6.5c2.7-6.3-2.6-6.3-2.6-6.3s-3.7,2-7.1-1.7c0,0,5.7,1.5,4.2-3c-1.5-4.5-5.1-2.2-5.1-2.2\n                s4.3-3.8,6.6-1.2c2.3,2.7,4.1,9.5,7.4,7.8c1.6-0.9-0.9-5.5-0.9-5.5s10.3,14,11.8,8c1.3-5.4-1.3-2.3-3.4-5.2\n                c-1.9-2.6-2.9-7.8-2.9-7.8s4.5,11.7,10.2,5.3c1.3-1.5-0.7-2.6-2.8-2.7c-1.5,0-4.1-3-4.1-3s2.6,1.8,4.6,1.3c1.3-0.3,2.9-0.1,3.8,1.3\n                c1.5,2.2-0.4,8.4,3.8,9.7c4.1,1.3,3.3-1.5,1.2-4.7c-2.1-3.1-1.5-4.8-3-8.2c-0.9-2.1-5.7-3.7-5.7-3.7s6.1,0.6,7.7,2.3\n                c2,2.3,2.7,7.4,5.4,8.6c2.7,1.2,6.9,1.7,6.9-1.3s-2.9-5-2.9-5s6-1.8,11.1,4.5C-697.4,967.9-694,977.7-694,977.7z\" />\n                <path id=\"XMLID_86_\" class=\"st4\" d=\"M-722.9,957.7c0.1,0.4,0.2,0.7,0.2,1c0.4,1.6,0.7,3.2,1.9,4.9c1.4,2,2.7,4.8,2.1,6.9\n                c-0.2,0.9-0.8,1.9-2.5,1.9c-0.3,0-0.6,0-1-0.1c-4.3-0.9-4.8-5.7-5-8.9c0,0,0-0.1,0-0.1c-0.2,0.4-0.4,0.8-0.7,1.1\n                c-1.1,1-2.1,1.6-3.2,1.8c0.4,0.4,0.7,0.9,1,1.5c0.6,1.4,0.5,3.2-0.1,5.2c-0.3,1.2-1.1,1.8-2.1,1.8c-2.5,0-6.6-4.2-8.7-6.5\n                c0,0.2-0.1,0.4-0.1,0.6c-0.2,0.5-0.5,1.3-1.3,1.6c-0.3,0.2-0.7,0.2-1.1,0.2c-0.2,0-0.4,0-0.6-0.1c0.1,0.2,0.1,0.3,0.1,0.5\n                c0.3,1.4,0.3,3.5-1.5,5.7c-0.7,0.8-1.6,1.2-2.9,1.2c-4,0-10.4-4.1-13.4-6.2c0.2,1.3,0.2,2.8-0.7,3.7c-0.2,0.2-0.4,0.3-0.6,0.3\n                c-0.8,0-1.6-1.4-2.7-3.3c-0.4-0.7-0.8-1.4-1.2-2.1c0.5,1.9,0.2,3.3-0.2,4.2c-0.9,2.1-3.2,3.3-6.5,3.3c-0.6,0-1.3,0-2-0.1\n                c-2.6-0.3-4.6-2.1-6.2-3.5c-1.1-1-2.1-1.8-2.8-1.8c-0.1,0-0.2,0-0.3,0.1c0.8,0.2,1.4,1.1,1.9,2.5c0.4,1.3,0.3,2.1,0.1,2.6\n                c-0.4,1-1.3,1.4-2.8,1.4c-0.5,0-1,0-1.5-0.1c0.4,0.4,0.6,1,0.8,1.7c0.1,0.6,0.2,1.1,0.2,1.7c0-0.1,0.1-0.1,0.1-0.2\n                c1.8-2.6,3.6-5.3,5.3-5.3c1,0,1.8,1,2.4,2.9c0.3,1,0.3,1.9,0.1,2.8c2.4-1.9,5.4-4.1,7.5-4.1c0.9,0,1.6,0.4,2.1,1.3\n                c0.7,1.3,0.7,2.5,0.5,3.3c-0.2,0.8-0.6,1.5-1,2c0.8-0.4,1.6-2,2.1-3c0.3-0.6,0.5-1,0.7-1.2l0.1-0.2c2.5-3.2,4.7-4.8,6.6-4.8\n                c1.2,0,2.2,0.7,3.1,2c1.1,1.7,1.6,3.2,1.9,4.4c0.9-1.8,1.9-3.1,3.2-3.1c0,0,0,0,0,0c0.7,0,1.4,0.4,2.1,1.2c1.2,1.3,1.9,2.9,2,4.5\n                c0,0,0,0,0-0.1c1-2.9,2.8-7.8,5.4-7.8c1.1,0,2.1,0.9,3.1,2.5c2,3.3,2.7,6.2,2,8.5c-0.6,2.1-2.1,3.1-3.2,3.2c-0.2,0-0.4,0-0.7,0\n                c0.2,0.1,0.3,0.2,0.5,0.4c0.4,0.3,0.5,0.4,0.8,0.4c0.4,0,0.9-0.4,1.7-1.3c0.8-0.9,1.7-2.8,2.6-4.8c2-4.2,4.2-9.1,7.4-9.1\n                c1.3,0,2.7,0.9,4.1,2.7c1.4,1.8,2.2,3.5,2.2,5.1c1-2.7,1.5-5,1.5-5l0.2-0.9l0.6,0.2c2,0.8,5.7,3.9,5.2,10.4\n                c-0.1,1.7-0.3,3.1-0.6,4.3c0.1-0.1,0.1-0.2,0.2-0.3c0.4-0.7,0.7-1.4,1.1-2.2c1.1-2.5,2.4-5.2,4.9-5.2c0.6,0,1.3,0.2,2,0.5\n                c1.4,0.6,2.3,1.7,2.5,3.3c0.2,0.8,0.1,1.7,0,2.4c0.4-0.5,0.7-1.1,1-1.8c0.6-1.4,0.9-2.9,1.1-4.5c0.3-1.6,0.6-3.2,1.2-4.9\n                c1-2.5,2.8-4,3.8-4.6c-0.8-2.1-2.9-7.1-6.3-11.7c-2.6-3.5-5.3-5-7-5.7c0.6,1.3,1.1,3.1,0.8,4.6c-0.8,3.1-2.6,3.5-4.4,3.5\n                c-0.7,0-1.5-0.1-2.5-0.2c-3.6-0.5-5-4.2-6.2-7.2C-722.3,958.9-722.6,958.2-722.9,957.7z M-751.5,960.9c0.6,0.8,0.9,1.7,1,2.9\n                c0.1,1.1-0.1,2.1-0.5,2.8c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.5,1.6-0.5l0.1,0c0.1,0,0.3,0,0.5,0.1c-0.3-0.5-0.6-1.1-0.9-1.7\n                c-0.6-1.1-1.1-2.1-1.6-2.7C-750.9,961.3-751.1,961.1-751.5,960.9z M-795.3,976.4c0,0.2,0.1,0.4,0.1,0.5c0,0.5,0,1.2-0.4,2\n                c1.4-0.4,3-0.9,4.4-1C-792.7,977.4-794.2,976.8-795.3,976.4z M-759.4,987.8c0,0.1,0,0.3,0.1,0.5c0.2,1.4,0.1,2.5-0.1,3.3\n                c0.3-0.1,0.6-0.4,0.9-0.7c0.5-0.5,0.9-1.3,1.4-2.3c-0.1,0-0.2,0-0.3,0C-758.2,988.6-758.9,988.3-759.4,987.8z M-723.3,989.1\n                c-1,0.8-2.3,1.4-3.4,1.7c0,0,0,0.1,0.1,0.1c0.4,0.9,0.4,1.7,0.2,2.2c0.4-0.4,0.8-0.8,1.2-1.3C-724.5,991-723.9,990-723.3,989.1z\" />\n                <path id=\"XMLID_80_\" class=\"st5\" d=\"M-708.5,960.6c0.2,1.1,0.3,2.2,0.1,3.3c-0.9,3.7-3.2,4.1-5,4.1c-0.7,0-1.5-0.1-2.5-0.2\n                c-0.8-0.1-1.5-0.4-2.2-0.8c0.4,1.2,0.5,2.6,0.2,3.8c-0.3,0.9-1,2.5-3.1,2.5c-0.3,0-0.7,0-1.1-0.1c-4-0.8-5-4.8-5.4-8\n                c-0.7,0.6-1.4,1.1-2.1,1.4c0.1,0.1,0.1,0.3,0.2,0.4c0.5,1.2,0.8,3.2,0,6.1c-0.5,1.5-1.4,2.4-2.7,2.4c-2.4,0-6.1-3.5-8.5-6\n                c-0.3,0.6-0.7,1.2-1.5,1.6c-0.3,0.1-0.6,0.2-0.9,0.2c0.2,1.5,0,3.7-1.9,6c-0.8,1-1.9,1.5-3.3,1.5c-0.4,0-0.8,0-1.2-0.1\n                c0.2,0.1,0.3,0.3,0.5,0.5c0.8,0.9,1.4,1.8,1.7,2.8c1.1-2.9,2.8-6.3,5.2-6.3c1.3,0,2.5,1,3.6,2.9c1.5,2.6,2.3,4.9,2.4,7\n                c0.1-0.2,0.1-0.3,0.2-0.5c2-4.2,4.4-9.5,8-9.5c1.5,0,3,1,4.5,2.9c0.9,1.1,1.5,2.2,1.9,3.3c0.5-1.6,0.7-2.7,0.8-2.8l0.4-1.8l1.2,0.5\n                c2.2,0.8,6.2,4.3,5.8,11.3c1.1-2.2,2.4-4.3,4.8-4.3c0.7,0,1.4,0.2,2.2,0.5c2,0.9,2.7,2.5,3,3.8c0.4-1.2,0.6-2.3,0.9-3.7\n                c0.3-1.6,0.6-3.3,1.3-5.2c0.9-2.3,2.3-3.7,3.4-4.6c-1-2.4-2.9-6.6-5.8-10.5C-705.1,962.9-706.9,961.5-708.5,960.6z M-765.9,973.3\n                c-0.1,0.7-0.3,1.3-0.5,1.7c-0.6,1.4-1.5,2.3-2.6,2.8c0.4,0.3,0.7,0.7,1,1.1c0.4,0.7,0.6,1.4,0.7,2c0.3-0.5,0.5-0.8,0.7-1.1l0.1-0.2\n                c1-1.3,2-2.4,3-3.2C-764.4,976-765,974.8-765.9,973.3z M-760.8,973.3c0,0.6-0.1,1.1-0.3,1.6c0.5-0.2,1-0.3,1.5-0.3\n                c0.4,0,0.7,0.1,1.1,0.2C-759.3,974.3-760.1,973.8-760.8,973.3z M-757.1,975.6c0.4,0.4,0.8,0.8,1.1,1.3c0.7,1.1,1.2,2.2,1.6,3.2\n                c0.6-1,1.4-1.8,2.3-2.1C-753.8,977.4-755.5,976.5-757.1,975.6z M-778.2,977.8c0.2,0.4,0.4,0.9,0.5,1.5c0.1,0.5,0.2,1,0.3,1.5\n                c0.9-0.7,1.9-1.4,2.9-2c-0.3,0-0.6-0.1-0.9-0.1C-776.5,978.5-777.4,978.2-778.2,977.8z\" />\n                <rect id=\"XMLID_79_\" x=\"-698.4\" y=\"952.3\" transform=\"matrix(0.9999 -1.223393e-02 1.223393e-02 0.9999 -11.7447 -8.4094)\" class=\"st0\" width=\"10.3\" height=\"7\" />\n                <rect id=\"XMLID_78_\" x=\"-684.3\" y=\"953.8\" transform=\"matrix(-0.4057 0.914 -0.914 -0.4057 -82.8453 1966.3701)\" class=\"st1\" width=\"7.1\" height=\"4.8\" />\n                <rect id=\"XMLID_77_\" x=\"-690.3\" y=\"960.9\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 259.5259 1676.4869)\" class=\"st1\" width=\"9.2\" height=\"7.1\" />\n                <g id=\"XMLID_20_\">\n                    <polygon id=\"XMLID_76_\" class=\"st2\" points=\"-692.4,972.6 -674.1,965.9 -675.5,953.6 -701.2,958.1         \" />\n                    <line id=\"XMLID_75_\" class=\"st2\" x1=\"-705.4\" y1=\"958.3\" x2=\"-701.2\" y2=\"958.1\" />\n                    <path id=\"XMLID_30_\" class=\"st2\" d=\"M-669,972.1c0,0-1.7-0.9-2.8-0.7s-18.2,7.1-18.2,7.1s-3.5,1.4-4.5-1c-1.5-3.6,2-4.8,2-4.8\" />\n                    <circle id=\"XMLID_29_\" cx=\"-674.1\" cy=\"977.2\" r=\"2.2\" />\n                    <circle id=\"XMLID_28_\" cx=\"-687.5\" cy=\"982.1\" r=\"2.2\" />\n                    <line id=\"XMLID_27_\" class=\"st2\" x1=\"-696.1\" y1=\"957.2\" x2=\"-688.9\" y2=\"971.3\" />\n                    <line id=\"XMLID_26_\" class=\"st2\" x1=\"-690.8\" y1=\"956.3\" x2=\"-685.3\" y2=\"970\" />\n                    <line id=\"XMLID_25_\" class=\"st2\" x1=\"-685.2\" y1=\"955.3\" x2=\"-681.3\" y2=\"968.5\" />\n                    <line id=\"XMLID_24_\" class=\"st2\" x1=\"-679.8\" y1=\"954.3\" x2=\"-677.7\" y2=\"967.2\" />\n                    <line id=\"XMLID_23_\" class=\"st2\" x1=\"-699\" y1=\"961.6\" x2=\"-675.2\" y2=\"956.3\" />\n                    <line id=\"XMLID_22_\" class=\"st2\" x1=\"-674.8\" y1=\"959.4\" x2=\"-696.4\" y2=\"966\" />\n                    <line id=\"XMLID_21_\" class=\"st2\" x1=\"-694.2\" y1=\"969.6\" x2=\"-674.5\" y2=\"962.7\" />\n                </g>\n                <path id=\"XMLID_19_\" class=\"st3\" d=\"M-817,972c0,1.6-2.4,4.4-4.5,3c-1.9-1.3-6.4-2.1-6.4-2.1s3.4-1.9,5.7-2.3\n                C-819.7,970.1-817,970.4-817,972z\" />\n                <path id=\"XMLID_18_\" class=\"st4\" d=\"M-820.6,974.1c-0.5,0-1.1-0.1-1.6-0.5c-0.8-0.7-2-1-3.8-1.1c1.4-0.6,3.8-1.2,4.7-1.3\n                c1.3-0.1,2.9,0.6,2.9,1.3C-818.3,973.9-819.4,974.1-820.6,974.1C-820.6,974.1-820.6,974.1-820.6,974.1z\" />\n                <animate id=\"frame3\" attributeName=\"display\" values=\"none;none;inline;none\" keyTimes=\"0;0.33;0.66;1\" dur=\".3s\" begin=\"0s\" repeatCount=\"indefinite\" />\n            </g>\n            <g id=\"fire-cart__frame-4\">\n                <path id=\"XMLID_124_\" class=\"st3\" d=\"M-694.3,977.7c0,0-3.2,0.1-4.4,4.1s-2,9-3.7,11.6c-1.7,2.5-6.6,4.8-6.6,4.8s6.6-6.5,2.2-9\n                c-4.4-2.4-6.6,6.1-9,9.4c-2.5,3.3-9.3,2.2-9.3,2.2s10.7-2,9.5-11c-1.2-8.6-3.5-7.9-3.5-7.9s-3.1,10.3-8.2,13.5c-5,3.2-8-0.6-8-0.6\n                s7.3,2.2,6.6-3.5c-0.1-0.9-2.6-1.2-2.6-1.2s12.8-0.4,6.4-9.1s-9.7,11.2-13.5,13.7c-3.5,2.3-1.6-2.7-5-2.6c-3.4,0.1-4.2,4.9-7.6,4.2\n                c0,0,2.2-1.8,2.9-3.1c0.7-1.3,2.7-3.9,4.1-4.1c1.9-0.3,8.8,1,4.6-7.4c-4.1-8.5-7,4.3-8.3,6.1c-1.2,1.7-3.4,1.3-3.4,1.3\n                s4.8-2.3,1-7.1c-3.8-4.8-5.3,6.9-8.3,10.1c-3,3.2-4.4-1.5-4.4-1.5s3.2,2.5,1.8-3c-0.7-2.7-3.7,2.4-3.7,2.4s2.1-6.5,4.9-3.9\n                c2.3,2.1,6-0.1,2.9-6s-7.7,0.5-8.3,1.3s-2.8,5-4.4,5.2c-1.6,0.3-4.7-0.4-4.7-0.4s5.6-2.7,3.9-5.3s-7.2,2.7-10.1,4.4\n                c-1.7,1-2.9,0-2.9,0s4.9-0.3,3.2-5.2c-1.7-5-7,6.9-10.1,7.7c-3,0.8-7.9-1.2-7.9-1.2s10.6,2.4,10.3-5.2c-0.2-4.9-9.8-0.2-12.4-0.5\n                c-2.8-0.3-6.3-3.8-6.3-3.8s7.6,3.9,9.5,0.8c1.4-2.2-2.5-4.4-2.5-4.4s16.3,6.1,14.7,1.8c-1.1-3.1-2.5-0.7-4.9-0.9\n                c-2.3-0.2-4.2-3.2-4.2-3.2s3.5,3.5,7.4,0c2.5-2.3,6.5,4.4,11.5,4.3c5-0.1,6.8-2.5,5.9-4.8s-5.1,3.3-8.2-0.2c0,0,2.7,2.1,7.1-3.5\n                c2.3-3.1,5.5,8,6.7,6.4c1.2-1.6-1.5-5.7-1.5-5.7s15.4,12.8,18.1,6.5c2.7-6.3-2.6-6.3-2.6-6.3s-3.7,2-7.1-1.7c0,0,5.7,1.5,4.2-3\n                c-1.5-4.5-5.1-2.2-5.1-2.2s4.3-3.8,6.6-1.2c2.3,2.7,4.1,9.5,7.4,7.8c1.6-0.9-0.9-5.5-0.9-5.5s10.3,14,11.8,8\n                c1.3-5.4-1.3-2.3-3.4-5.2c-1.9-2.6-2.9-7.8-2.9-7.8s4.5,11.7,10.2,5.3c1.3-1.5-0.7-2.6-2.8-2.7c-1.5,0-4.1-3-4.1-3s2.6,1.8,4.6,1.3\n                c1.3-0.3,2.9-0.1,3.8,1.3c1.5,2.2-0.4,8.4,3.8,9.7c4.1,1.3,3.3-1.5,1.2-4.7c-2.1-3.1-1.5-4.8-3-8.2c-0.9-2.1-5.7-3.7-5.7-3.7\n                s6.1,0.6,7.7,2.3c2,2.3,2.7,7.4,5.4,8.6c2.7,1.2,6.9,1.7,6.9-1.3s-2.9-5-2.9-5s6-1.8,11.1,4.5\n                C-697.7,967.9-694.3,977.7-694.3,977.7z\" />\n                <path id=\"XMLID_118_\" class=\"st4\" d=\"M-723.1,957.7c0.1,0.4,0.2,0.7,0.2,1c0.4,1.6,0.7,3.2,1.9,4.9c1.4,2,2.7,4.8,2.1,6.9\n                c-0.2,0.9-0.8,1.9-2.5,1.9c-0.3,0-0.6,0-1-0.1c-4.3-0.9-4.8-5.7-5-8.9c0,0,0-0.1,0-0.1c-0.2,0.4-0.4,0.8-0.7,1.1\n                c-1.1,1-2.1,1.6-3.2,1.8c0.4,0.4,0.7,0.9,1,1.5c0.6,1.4,0.5,3.2-0.1,5.2c-0.3,1.2-1.1,1.8-2.1,1.8c-2.5,0-6.6-4.2-8.7-6.5\n                c0,0.2-0.1,0.4-0.1,0.6c-0.2,0.5-0.5,1.3-1.3,1.6c-0.3,0.2-0.7,0.2-1.1,0.2c-0.2,0-0.4,0-0.6-0.1c0.1,0.2,0.1,0.3,0.1,0.5\n                c0.3,1.4,0.3,3.5-1.5,5.7c-0.7,0.8-1.6,1.2-2.9,1.2c-4,0-10.4-4.1-13.4-6.2c0.2,1.3,0.2,2.8-0.7,3.7c-0.2,0.2-0.4,0.3-0.6,0.3\n                c-0.8,0-1.6-1.4-2.7-3.3c-0.4-0.7-0.8-1.4-1.2-2.1c0.5,1.9,0.2,3.3-0.2,4.2c-0.9,2.1-3.2,3.3-6.5,3.3c-0.6,0-1.3,0-2-0.1\n                c-2.6-0.3-4.6-2.1-6.2-3.5c-1.1-1-2.1-1.8-2.8-1.8c-0.1,0-0.2,0-0.3,0.1c0.8,0.2,1.4,1.1,1.9,2.5c0.4,1.3,0.3,2.1,0.1,2.6\n                c-0.4,1-1.3,1.4-2.8,1.4c-0.5,0-1,0-1.5-0.1c0.4,0.4,0.6,1,0.8,1.7c0.1,0.6,0.2,1.1,0.2,1.7c0-0.1,0.1-0.1,0.1-0.2\n                c1.8-2.6,3.6-5.3,5.3-5.3c1,0,1.8,1,2.4,2.9c0.3,1,0.3,1.9,0.1,2.8c2.4-1.9,5.4-4.1,7.5-4.1c0.9,0,1.6,0.4,2.1,1.3\n                c0.7,1.3,0.7,2.5,0.5,3.3c-0.2,0.8-0.6,1.5-1,2c0.8-0.4,1.6-2,2.1-3c0.3-0.6,0.5-1,0.7-1.2l0.1-0.2c2.5-3.2,4.7-4.8,6.6-4.8\n                c1.2,0,2.2,0.7,3.1,2c1.1,1.7,1.6,3.2,1.9,4.4c0.9-1.8,1.9-3.1,3.2-3.1c0,0,0,0,0,0c0.7,0,1.4,0.4,2.1,1.2c1.2,1.3,1.9,2.9,2,4.5\n                c0,0,0,0,0-0.1c1-2.9,2.8-7.8,5.4-7.8c1.1,0,2.1,0.9,3.1,2.5c2,3.3,2.7,6.2,2,8.5c-0.6,2.1-2.1,3.1-3.2,3.2c-0.2,0-0.4,0-0.7,0\n                c0.2,0.1,0.3,0.2,0.5,0.4c0.4,0.3,0.5,0.4,0.8,0.4c0.4,0,0.9-0.4,1.7-1.3c0.8-0.9,1.7-2.8,2.6-4.8c2-4.2,4.2-9.1,7.4-9.1\n                c1.3,0,2.7,0.9,4.1,2.7c1.4,1.8,2.2,3.5,2.2,5.1c1-2.7,1.5-5,1.5-5l0.2-0.9l0.6,0.2c2,0.8,5.7,3.9,5.2,10.4\n                c-0.1,1.7-0.3,3.1-0.6,4.3c0.1-0.1,0.1-0.2,0.2-0.3c0.4-0.7,0.7-1.4,1.1-2.2c1.1-2.5,2.4-5.2,4.9-5.2c0.6,0,1.3,0.2,2,0.5\n                c1.4,0.6,2.3,1.7,2.5,3.3c0.2,0.8,0.1,1.7,0,2.4c0.4-0.5,0.7-1.1,1-1.8c0.6-1.4,0.9-2.9,1.1-4.5c0.3-1.6,0.6-3.2,1.2-4.9\n                c1-2.5,2.8-4,3.8-4.6c-0.8-2.1-2.9-7.1-6.3-11.7c-2.6-3.5-5.3-5-7-5.7c0.6,1.3,1.1,3.1,0.8,4.6c-0.8,3.1-2.6,3.5-4.4,3.5\n                c-0.7,0-1.5-0.1-2.5-0.2c-3.6-0.5-5-4.2-6.2-7.2C-722.6,958.9-722.8,958.2-723.1,957.7z M-751.7,960.9c0.6,0.8,0.9,1.7,1,2.9\n                c0.1,1.1-0.1,2.1-0.5,2.8c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.5,1.6-0.5l0.1,0c0.1,0,0.3,0,0.5,0.1c-0.3-0.5-0.6-1.1-0.9-1.7\n                c-0.6-1.1-1.1-2.1-1.6-2.7C-751.1,961.3-751.4,961.1-751.7,960.9z M-795.6,976.4c0,0.2,0.1,0.4,0.1,0.5c0,0.5,0,1.2-0.4,2\n                c1.4-0.4,3-0.9,4.4-1C-793,977.4-794.4,976.8-795.6,976.4z M-759.7,987.8c0,0.1,0,0.3,0.1,0.5c0.2,1.4,0.1,2.5-0.1,3.3\n                c0.3-0.1,0.6-0.4,0.9-0.7c0.5-0.5,0.9-1.3,1.4-2.3c-0.1,0-0.2,0-0.3,0C-758.5,988.6-759.1,988.3-759.7,987.8z M-723.6,989.1\n                c-1,0.8-2.3,1.4-3.4,1.7c0,0,0,0.1,0.1,0.1c0.4,0.9,0.4,1.7,0.2,2.2c0.4-0.4,0.8-0.8,1.2-1.3C-724.8,991-724.1,990-723.6,989.1z\" />\n                <path id=\"XMLID_112_\" class=\"st5\" d=\"M-708.7,960.6c0.2,1.1,0.3,2.2,0.1,3.3c-0.9,3.7-3.2,4.1-5,4.1c-0.7,0-1.5-0.1-2.5-0.2\n                c-0.8-0.1-1.5-0.4-2.2-0.8c0.4,1.2,0.5,2.6,0.2,3.8c-0.2,0.9-1,2.5-3.1,2.5c-0.3,0-0.7,0-1.1-0.1c-4-0.8-5-4.8-5.4-8\n                c-0.7,0.6-1.4,1.1-2.1,1.4c0.1,0.1,0.1,0.3,0.2,0.4c0.5,1.2,0.8,3.2,0,6.1c-0.5,1.5-1.4,2.4-2.7,2.4c-2.4,0-6.1-3.5-8.5-6\n                c-0.3,0.6-0.7,1.2-1.5,1.6c-0.3,0.1-0.6,0.2-0.9,0.2c0.2,1.5,0,3.7-1.9,6c-0.8,1-1.9,1.5-3.3,1.5c-0.4,0-0.8,0-1.2-0.1\n                c0.2,0.1,0.3,0.3,0.5,0.5c0.8,0.9,1.4,1.8,1.7,2.8c1.1-2.9,2.8-6.3,5.2-6.3c1.3,0,2.5,1,3.6,2.9c1.5,2.6,2.3,4.9,2.4,7\n                c0.1-0.2,0.1-0.3,0.2-0.5c2-4.2,4.4-9.5,8-9.5c1.5,0,3,1,4.5,2.9c0.9,1.1,1.5,2.2,1.9,3.3c0.5-1.6,0.7-2.7,0.8-2.8l0.4-1.8l1.2,0.5\n                c2.2,0.8,6.2,4.3,5.8,11.3c1.1-2.2,2.4-4.3,4.8-4.3c0.7,0,1.4,0.2,2.2,0.5c2,0.9,2.7,2.5,3,3.8c0.4-1.2,0.6-2.3,0.9-3.7\n                c0.3-1.6,0.6-3.3,1.3-5.2c0.9-2.3,2.3-3.7,3.4-4.6c-1-2.4-2.9-6.6-5.8-10.5C-705.3,962.9-707.2,961.5-708.7,960.6z M-766.1,973.3\n                c-0.1,0.7-0.3,1.3-0.5,1.7c-0.6,1.4-1.5,2.3-2.6,2.8c0.4,0.3,0.7,0.7,1,1.1c0.4,0.7,0.6,1.4,0.7,2c0.3-0.5,0.5-0.8,0.7-1.1l0.1-0.2\n                c1-1.3,2-2.4,3-3.2C-764.6,976-765.3,974.8-766.1,973.3z M-761,973.3c0,0.6-0.1,1.1-0.3,1.6c0.5-0.2,1-0.3,1.5-0.3\n                c0.4,0,0.7,0.1,1.1,0.2C-759.6,974.3-760.4,973.8-761,973.3z M-757.4,975.6c0.4,0.4,0.8,0.8,1.1,1.3c0.7,1.1,1.2,2.2,1.6,3.2\n                c0.6-1,1.4-1.8,2.3-2.1C-754,977.4-755.7,976.5-757.4,975.6z M-778.5,977.8c0.2,0.4,0.4,0.9,0.5,1.5c0.1,0.5,0.2,1,0.3,1.5\n                c0.9-0.7,1.9-1.4,2.9-2c-0.3,0-0.6-0.1-0.9-0.1C-776.7,978.5-777.6,978.2-778.5,977.8z\" />\n                <rect id=\"XMLID_111_\" x=\"-700.6\" y=\"952.8\" transform=\"matrix(0.9769 0.2136 -0.2136 0.9769 188.1969 170.5948)\" class=\"st0\" width=\"10.3\" height=\"7\" />\n                <rect id=\"XMLID_110_\" x=\"-686.5\" y=\"951.4\" transform=\"matrix(-8.865071e-02 0.9961 -0.9961 -8.865071e-02 206.5942 1718.5432)\" class=\"st1\" width=\"7.1\" height=\"4.8\" />\n                <rect id=\"XMLID_109_\" x=\"-691.8\" y=\"960.8\" transform=\"matrix(7.468222e-02 0.9972 -0.9972 7.468222e-02 325.7673 1577.672)\" class=\"st1\" width=\"9.2\" height=\"7.1\" />\n                <g id=\"XMLID_96_\">\n                    <polygon id=\"XMLID_108_\" class=\"st2\" points=\"-693.3,973 -675.6,964.9 -677.9,952.7 -703.2,959.2      \" />\n                    <line id=\"XMLID_107_\" class=\"st2\" x1=\"-707.4\" y1=\"959.8\" x2=\"-703.2\" y2=\"959.2\" />\n                    <path id=\"XMLID_106_\" class=\"st2\" d=\"M-670,970.6c0,0-1.8-0.8-2.8-0.5c-1,0.3-17.6,8.5-17.6,8.5s-3.4,1.7-4.5-0.7\n                    c-1.7-3.5,1.7-5,1.7-5\" />\n                    <circle id=\"XMLID_105_\" cx=\"-674.7\" cy=\"976.2\" r=\"2.2\" />\n                    <circle id=\"XMLID_104_\" cx=\"-687.7\" cy=\"982.1\" r=\"2.2\" />\n                    <line id=\"XMLID_103_\" class=\"st2\" x1=\"-698.2\" y1=\"957.9\" x2=\"-689.9\" y2=\"971.4\" />\n                    <line id=\"XMLID_102_\" class=\"st2\" x1=\"-692.9\" y1=\"956.6\" x2=\"-686.4\" y2=\"969.9\" />\n                    <line id=\"XMLID_101_\" class=\"st2\" x1=\"-687.4\" y1=\"955.2\" x2=\"-682.5\" y2=\"968\" />\n                    <line id=\"XMLID_100_\" class=\"st2\" x1=\"-682.1\" y1=\"953.8\" x2=\"-679\" y2=\"966.5\" />\n                    <line id=\"XMLID_99_\" class=\"st2\" x1=\"-700.8\" y1=\"962.5\" x2=\"-677.4\" y2=\"955.4\" />\n                    <line id=\"XMLID_98_\" class=\"st2\" x1=\"-676.8\" y1=\"958.5\" x2=\"-697.8\" y2=\"966.7\" />\n                    <line id=\"XMLID_97_\" class=\"st2\" x1=\"-695.3\" y1=\"970.1\" x2=\"-676.2\" y2=\"961.7\" />\n                </g>\n                <path id=\"XMLID_95_\" class=\"st3\" d=\"M-803.2,983.5c0.2-1-1.7-1.9-4.2-2.1s-7.8,2.1-7.8,2.1s5.1-0.6,6.8,0.6\n                C-806.8,985.3-803.4,984.5-803.2,983.5z\" />\n                <path id=\"XMLID_94_\" class=\"st5\" d=\"M-805.9,984.2c-0.5,0-1.1-0.1-1.6-0.4c-0.8-0.5-2-0.9-3.8-0.9c1.4-0.4,2.8-0.8,3.8-0.8\n                c0.1,0,0.1,0,0.2,0c2.1,0.2,3.5,0.9,3.5,1.5C-803.7,983.7-804.7,984.2-805.9,984.2C-805.9,984.2-805.9,984.2-805.9,984.2z\" />\n                <animate id=\"frame4\" attributeName=\"display\" values=\"none;none;none;inline\" keyTimes=\"0;0.33;0.66;1\" dur=\".3s\" begin=\"0s\" repeatCount=\"indefinite\" />\n            </g>\n        </svg>\n    </div>\n    \n    <div class=\"fire-cart--full\" ng-if=\"!fireCartChug.activated && !fireCartFlames.activated && cart.data.items.length > 0\">\n        <img src=\"/angular/images/fire-cart/full-fire-cart.svg\" />\n    </div>\n\n    <div class=\"fire-cart--chug\" ng-if=\"fireCartChug.activated && !fireCartFlames.activated && cart.data.items.length > 0\">\n        <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 40 40\" style=\"enable-background:new 0 0 40 40;\" xml:space=\"preserve\">\n            <style type=\"text/css\">\n            .st6 {\n                fill: #666699;\n            }\n            \n            .st7 {\n                fill: #333366;\n            }\n            \n            .st8 {\n                fill: none;\n                stroke: #000000;\n                stroke-miterlimit: 10;\n            }\n            \n            .st9 {\n                fill: #767676;\n            }\n            \n            .st10 {\n                fill: #D6D5D5;\n            }\n            </style>\n            <g id=\"chug-cart__frame-1\">\n                <rect id=\"XMLID_106_\" x=\"27.7\" y=\"7.7\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 43.3862 -22.0414)\" class=\"st6\" width=\"9.4\" height=\"4.8\" />\n                <rect id=\"XMLID_105_\" x=\"13.7\" y=\"8.6\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 34.2055 -9.0134)\" class=\"st6\" width=\"15.5\" height=\"7.1\" />\n                <rect id=\"XMLID_104_\" x=\"20.9\" y=\"14.6\" transform=\"matrix(1 1.039030e-03 -1.039030e-03 1 1.883102e-02 -2.707846e-02)\" class=\"st7\" width=\"10.3\" height=\"7\" />\n                <g id=\"XMLID_91_\">\n                    <polygon id=\"XMLID_103_\" class=\"st8\" points=\"16.8,22.7 36.2,22.6 39.2,10.6 13.5,6       \" />\n                    <line id=\"XMLID_102_\" class=\"st8\" x1=\"9.5\" y1=\"4.8\" x2=\"13.5\" y2=\"6\" />\n                    <path id=\"XMLID_101_\" class=\"st8\" d=\"M38.9,30.2c0,0-1.3-1.5-2.4-1.6C35.5,28.4,17.1,29,17.1,29s-3.8,0.1-3.9-2.5\n                        c-0.1-3.9,3.6-3.8,3.6-3.8\" />\n                    <circle id=\"XMLID_100_\" cx=\"32.4\" cy=\"33.3\" r=\"2.2\" />\n                    <circle id=\"XMLID_99_\" cx=\"18.1\" cy=\"33.3\" r=\"2.2\" />\n                    <line id=\"XMLID_98_\" class=\"st8\" x1=\"18.6\" y1=\"6.9\" x2=\"20.5\" y2=\"22.7\" />\n                    <line id=\"XMLID_97_\" class=\"st8\" x1=\"23.9\" y1=\"7.9\" x2=\"24.3\" y2=\"22.7\" />\n                    <line id=\"XMLID_96_\" class=\"st8\" x1=\"29.5\" y1=\"8.9\" x2=\"28.6\" y2=\"22.6\" />\n                    <line id=\"XMLID_95_\" class=\"st8\" x1=\"34.9\" y1=\"9.8\" x2=\"32.5\" y2=\"22.6\" />\n                    <line id=\"XMLID_94_\" class=\"st8\" x1=\"14.3\" y1=\"10.1\" x2=\"38.5\" y2=\"13.3\" />\n                    <line id=\"XMLID_93_\" class=\"st8\" x1=\"37.8\" y1=\"16.3\" x2=\"15.3\" y2=\"15.1\" />\n                    <line id=\"XMLID_92_\" class=\"st8\" x1=\"16.1\" y1=\"19.2\" x2=\"37\" y2=\"19.5\" />\n                </g>\n                <circle id=\"XMLID_90_\" class=\"st9\" cx=\"9.2\" cy=\"25.3\" r=\"2\" />\n                <circle id=\"XMLID_89_\" class=\"st9\" cx=\"10.7\" cy=\"23.9\" r=\"0.9\" />\n                <circle id=\"XMLID_88_\" class=\"st9\" cx=\"10.7\" cy=\"25.9\" r=\"1.7\" />\n                <path id=\"XMLID_87_\" class=\"st10\" d=\"M11,27c-0.2,0-0.5-0.1-0.7-0.3l-0.2-0.1l-0.2,0c-0.1,0-0.2,0-0.3,0c-0.8,0-1.4-0.7-1.4-1.6\n                    c0-0.8,0.7-1.5,1.5-1.5c0.1,0,0.3,0,0.5,0.1l0.4,0.1l0.2-0.3c0-0.1,0.2-0.2,0.4-0.2c0.2,0,0.4,0.2,0.4,0.5c0,0,0,0.1-0.1,0.2\n                    l-0.3,0.5l0.5,0.3c0.4,0.2,0.6,0.6,0.6,1.1C12.1,26.5,11.6,27.1,11,27z\" />\n                <animate id=\"frame1\" attributeName=\"display\" values=\"inline;none;none;none\" keyTimes=\"0;0.33;0.66;1\" dur=\".4s\" begin=\"0s\" repeatCount=\"indefinite\" />\n            </g>\n            <g id=\"chug-cart__frame-2\">\n                <circle id=\"XMLID_108_\" class=\"st9\" cx=\"10.6\" cy=\"23.1\" r=\"1.1\" />\n                <rect id=\"XMLID_107_\" x=\"27.7\" y=\"5\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 40.6973 -24.8053)\" class=\"st6\" width=\"9.4\" height=\"4.8\" />\n                <rect id=\"XMLID_20_\" x=\"13.7\" y=\"6.9\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 32.4986 -10.7679)\" class=\"st6\" width=\"15.5\" height=\"7.1\" />\n                <rect id=\"XMLID_19_\" x=\"20.9\" y=\"14.6\" transform=\"matrix(1 1.039030e-03 -1.039030e-03 1 1.883102e-02 -2.707846e-02)\" class=\"st7\" width=\"10.3\" height=\"7\" />\n                <g id=\"XMLID_6_\">\n                    <polygon id=\"XMLID_18_\" class=\"st8\" points=\"16.8,24.7 36.2,24.6 39.2,12.6 13.5,8        \" />\n                    <line id=\"XMLID_17_\" class=\"st8\" x1=\"9.5\" y1=\"6.8\" x2=\"13.5\" y2=\"8\" />\n                    <path id=\"XMLID_16_\" class=\"st8\" d=\"M38.9,30.2c0,0-1.3-1.5-2.4-1.6C35.5,28.4,17.1,29,17.1,29s-3.8,0.4-3.8-2s3.6-2.3,3.6-2.3\" />\n                    <circle id=\"XMLID_15_\" cx=\"32.4\" cy=\"33.3\" r=\"2.2\" />\n                    <circle id=\"XMLID_14_\" cx=\"18.1\" cy=\"33.3\" r=\"2.2\" />\n                    <line id=\"XMLID_13_\" class=\"st8\" x1=\"18.6\" y1=\"8.9\" x2=\"20.5\" y2=\"24.7\" />\n                    <line id=\"XMLID_12_\" class=\"st8\" x1=\"23.9\" y1=\"9.9\" x2=\"24.3\" y2=\"24.7\" />\n                    <line id=\"XMLID_11_\" class=\"st8\" x1=\"29.5\" y1=\"10.9\" x2=\"28.6\" y2=\"24.6\" />\n                    <line id=\"XMLID_10_\" class=\"st8\" x1=\"34.9\" y1=\"11.8\" x2=\"32.5\" y2=\"24.6\" />\n                    <line id=\"XMLID_9_\" class=\"st8\" x1=\"14.3\" y1=\"12.1\" x2=\"38.5\" y2=\"15.3\" />\n                    <line id=\"XMLID_8_\" class=\"st8\" x1=\"37.8\" y1=\"18.3\" x2=\"15.3\" y2=\"17.1\" />\n                    <line id=\"XMLID_7_\" class=\"st8\" x1=\"16.1\" y1=\"21.2\" x2=\"37\" y2=\"21.5\" />\n                </g>\n                <path id=\"XMLID_5_\" class=\"st9\" d=\"M11.6,25.5C11.6,25.5,11.5,25.5,11.6,25.5c-0.1-0.1-0.2-0.2-0.3-0.2c0,0,0,0,0,0\n                    c0-0.6-0.3-1.2-0.8-1.6c0-0.1,0.1-0.2,0.1-0.3c0-0.4-0.3-0.7-0.6-0.7c0-0.1,0-0.1,0-0.2c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5\n                    c0,0.5,0.3,1,0.7,1.3c0,0-0.1,0.1-0.1,0.1c0,0.1,0.1,0.2,0.1,0.2c-0.2,0.3-0.4,0.7-0.4,1.2c0,1.1,0.9,2,2,2c0.7,0,1.3-0.3,1.6-0.9\n                    c0.1,0.3,0.4,0.5,0.7,0.5c0.4,0,0.7-0.3,0.7-0.7C12.3,25.8,12,25.5,11.6,25.5z\" />\n                <path id=\"XMLID_3_\" class=\"st10\" d=\"M9.5,26.9c-0.9,0-1.6-0.7-1.6-1.6c0-0.3,0.1-0.6,0.3-0.9L8.5,24l-0.2-0.2l0.1-0.2L8,23.2\n                    c-0.3-0.2-0.5-0.5-0.5-0.9c0-0.6,0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1L9.6,23l0.5,0.1c0.1,0,0.2,0.1,0.2,0.2l-0.2,0.4l0.3,0.4\n                    c0.4,0.3,0.6,0.7,0.7,1.2l0,0.5l-0.3,0.4C10.5,26.6,10,26.9,9.5,26.9z\" />\n                <circle id=\"XMLID_2_\" class=\"st10\" cx=\"11.4\" cy=\"26.2\" r=\"0.7\" />\n                <circle id=\"XMLID_1_\" class=\"st10\" cx=\"10.5\" cy=\"23.4\" r=\"1\" />\n                <animate id=\"frame2\" attributeName=\"display\" values=\"none;inline;none;none\" keyTimes=\"0;0.33;0.66;1\" dur=\".4s\" begin=\"0s\" repeatCount=\"indefinite\" />\n            </g>\n            <g id=\"chug-cart__frame-3\">\n                <circle id=\"XMLID_112_\" class=\"st9\" cx=\"10.5\" cy=\"22.5\" r=\"1.4\" />\n                <rect id=\"XMLID_111_\" x=\"27.8\" y=\"7.1\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 42.8786 -22.6677)\" class=\"st6\" width=\"9.4\" height=\"4.8\" />\n                <rect id=\"XMLID_110_\" x=\"13.7\" y=\"8.5\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 34.1505 -9.0699)\" class=\"st6\" width=\"15.5\" height=\"7.1\" />\n                <rect id=\"XMLID_109_\" x=\"20.9\" y=\"15.8\" transform=\"matrix(1 1.039030e-03 -1.039030e-03 1 2.008935e-02 -2.709675e-02)\" class=\"st7\" width=\"10.3\" height=\"7\" />\n                <g id=\"XMLID_30_\">\n                    <polygon id=\"XMLID_42_\" class=\"st8\" points=\"16.8,26.7 36.2,26.6 39.2,14.6 13.5,10       \" />\n                    <line id=\"XMLID_41_\" class=\"st8\" x1=\"9.5\" y1=\"8.8\" x2=\"13.5\" y2=\"10\" />\n                    <path id=\"XMLID_40_\" class=\"st8\" d=\"M38.9,30.2c0,0-1.3-1.5-2.4-1.6C35.5,28.4,17.1,29,17.1,29s-3.8,0.6-3.8-1s3.6-1.4,3.6-1.4\" />\n                    <circle id=\"XMLID_39_\" cx=\"32.4\" cy=\"33.3\" r=\"2.2\" />\n                    <circle id=\"XMLID_38_\" cx=\"18.1\" cy=\"33.3\" r=\"2.2\" />\n                    <line id=\"XMLID_37_\" class=\"st8\" x1=\"18.6\" y1=\"10.9\" x2=\"20.5\" y2=\"26.7\" />\n                    <line id=\"XMLID_36_\" class=\"st8\" x1=\"23.9\" y1=\"11.9\" x2=\"24.3\" y2=\"26.7\" />\n                    <line id=\"XMLID_35_\" class=\"st8\" x1=\"29.5\" y1=\"12.9\" x2=\"28.6\" y2=\"26.6\" />\n                    <line id=\"XMLID_34_\" class=\"st8\" x1=\"34.9\" y1=\"13.8\" x2=\"32.5\" y2=\"26.6\" />\n                    <line id=\"XMLID_33_\" class=\"st8\" x1=\"14.3\" y1=\"14.1\" x2=\"38.5\" y2=\"17.3\" />\n                    <line id=\"XMLID_32_\" class=\"st8\" x1=\"37.8\" y1=\"20.3\" x2=\"15.3\" y2=\"19.1\" />\n                    <line id=\"XMLID_31_\" class=\"st8\" x1=\"16.1\" y1=\"23.2\" x2=\"37\" y2=\"23.5\" />\n                </g>\n                <path id=\"XMLID_29_\" class=\"st9\" d=\"M11.7,25.6C11.7,25.6,11.7,25.6,11.7,25.6c-0.1-0.2-0.2-0.3-0.4-0.3c0,0,0,0,0,0\n                    c0-0.8-0.4-1.6-1.1-2c0.1-0.1,0.1-0.3,0.1-0.4c0-0.5-0.4-0.8-0.8-0.9c0-0.1,0-0.2,0-0.2c0-1.1-0.9-2-2-2s-2,0.9-2,2\n                    c0,0.7,0.4,1.3,0.9,1.7c0,0.1-0.1,0.1-0.1,0.2c0,0.1,0.1,0.2,0.2,0.3c-0.3,0.4-0.5,0.9-0.5,1.5c0,1.4,1.2,2.6,2.6,2.6\n                    c0.9,0,1.7-0.4,2.1-1.1c0.1,0.4,0.5,0.6,0.9,0.6c0.5,0,0.9-0.4,0.9-0.9C12.6,26,12.2,25.6,11.7,25.6z\" />\n                <path id=\"XMLID_27_\" class=\"st10\" d=\"M9,27.3c-1.2,0-2.1-0.9-2.1-2c0-0.4,0.1-0.8,0.4-1.2l0.4-0.5l-0.3-0.2l0.2-0.3L7,22.7\n                    c-0.4-0.3-0.7-0.7-0.7-1.2c0-0.8,0.6-1.4,1.4-1.4s1.4,0.6,1.4,1.4l-0.1,0.8l0.7,0.1c0.1,0,0.3,0.1,0.3,0.3l-0.3,0.5l0.4,0.5\n                    c0.5,0.4,0.8,0.9,0.9,1.6l0,0.7l-0.4,0.6C10.3,27,9.7,27.3,9,27.3z\" />\n                <circle id=\"XMLID_26_\" class=\"st10\" cx=\"11.5\" cy=\"26.5\" r=\"0.9\" />\n                <circle id=\"XMLID_25_\" class=\"st10\" cx=\"10.4\" cy=\"22.8\" r=\"1.2\" />\n                <circle id=\"XMLID_24_\" class=\"st9\" cx=\"5.7\" cy=\"20.6\" r=\"1.8\" />\n                <circle id=\"XMLID_23_\" class=\"st10\" cx=\"6.1\" cy=\"20.3\" r=\"1.6\" />\n                <circle id=\"XMLID_22_\" class=\"st9\" cx=\"7.5\" cy=\"26.9\" r=\"1\" />\n                <circle id=\"XMLID_21_\" class=\"st10\" cx=\"7.7\" cy=\"26.7\" r=\"0.9\" />\n                <animate id=\"frame3\" attributeName=\"display\" values=\"none;none;inline;none\" keyTimes=\"0;0.33;0.66;1\" dur=\".4s\" begin=\"0s\" repeatCount=\"indefinite\" />\n            </g>\n            <g id=\"chug-cart__frame-4\">\n                <circle id=\"XMLID_72_\" class=\"st9\" cx=\"9.2\" cy=\"21.3\" r=\"0.9\" />\n                <rect id=\"XMLID_67_\" x=\"28.6\" y=\"13.9\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 49.6838 -15.6221)\" class=\"st6\" width=\"7.6\" height=\"4.8\" />\n                <rect id=\"XMLID_66_\" x=\"14.2\" y=\"15.6\" transform=\"matrix(-2.754349e-02 0.9996 -0.9996 -2.754349e-02 41.2186 -1.7777)\" class=\"st6\" width=\"14.6\" height=\"7.1\" />\n                <rect id=\"XMLID_65_\" x=\"20.9\" y=\"21\" transform=\"matrix(1 1.039030e-03 -1.039030e-03 1 2.455516e-02 -2.709382e-02)\" class=\"st7\" width=\"10.3\" height=\"5.3\" />\n                <g id=\"XMLID_52_\">\n                    <polygon id=\"XMLID_64_\" class=\"st8\" points=\"16.8,26.7 36.2,26.6 39.2,14.6 13.5,10       \" />\n                    <line id=\"XMLID_63_\" class=\"st8\" x1=\"9.5\" y1=\"8.8\" x2=\"13.5\" y2=\"10\" />\n                    <path id=\"XMLID_62_\" class=\"st8\" d=\"M38.9,30.2c0,0-1.3-1.5-2.4-1.6C35.5,28.4,17.1,29,17.1,29s-3.8,0.6-3.8-1s3.6-1.4,3.6-1.4\" />\n                    <circle id=\"XMLID_61_\" cx=\"32.4\" cy=\"33.3\" r=\"2.2\" />\n                    <circle id=\"XMLID_60_\" cx=\"18.1\" cy=\"33.3\" r=\"2.2\" />\n                    <line id=\"XMLID_59_\" class=\"st8\" x1=\"18.6\" y1=\"10.9\" x2=\"20.5\" y2=\"26.7\" />\n                    <line id=\"XMLID_58_\" class=\"st8\" x1=\"23.9\" y1=\"11.9\" x2=\"24.3\" y2=\"26.7\" />\n                    <line id=\"XMLID_57_\" class=\"st8\" x1=\"29.5\" y1=\"12.9\" x2=\"28.6\" y2=\"26.6\" />\n                    <line id=\"XMLID_56_\" class=\"st8\" x1=\"34.9\" y1=\"13.8\" x2=\"32.5\" y2=\"26.6\" />\n                    <line id=\"XMLID_55_\" class=\"st8\" x1=\"14.3\" y1=\"14.1\" x2=\"38.5\" y2=\"17.3\" />\n                    <line id=\"XMLID_54_\" class=\"st8\" x1=\"37.8\" y1=\"20.3\" x2=\"15.3\" y2=\"19.1\" />\n                    <line id=\"XMLID_53_\" class=\"st8\" x1=\"16.1\" y1=\"23.2\" x2=\"37\" y2=\"23.5\" />\n                </g>\n                <path id=\"XMLID_51_\" class=\"st9\" d=\"M10,24.1C10,24.1,10,24.1,10,24.1c-0.1-0.1-0.2-0.2-0.3-0.2c0,0,0,0,0,0c0-0.6-0.3-1.2-0.8-1.6\n                    c0-0.1,0.1-0.2,0.1-0.3c0-0.4-0.3-0.7-0.6-0.7c0-0.1,0-0.1,0-0.2c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5c0,0.5,0.3,1,0.7,1.3\n                    c0,0-0.1,0.1-0.1,0.1c0,0.1,0.1,0.2,0.1,0.2c-0.2,0.3-0.4,0.7-0.4,1.2c0,1.1,0.9,2,2,2c0.7,0,1.3-0.3,1.7-0.9\n                    c0.1,0.3,0.4,0.5,0.7,0.5c0.4,0,0.7-0.3,0.7-0.7C10.7,24.4,10.4,24.1,10,24.1z\" />\n                <path id=\"XMLID_49_\" class=\"st10\" d=\"M7.9,25.4c-0.9,0-1.6-0.7-1.6-1.6c0-0.3,0.1-0.6,0.3-0.9l0.3-0.4l-0.2-0.2l0.1-0.2l-0.4-0.3\n                    c-0.3-0.2-0.5-0.5-0.5-0.9c0-0.6,0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1L8,21.5l0.5,0.1c0.1,0,0.2,0.1,0.2,0.2l-0.2,0.4l0.3,0.4\n                    c0.4,0.3,0.6,0.7,0.7,1.2l0,0.5l-0.3,0.4C8.9,25.2,8.4,25.4,7.9,25.4z\" />\n                <circle id=\"XMLID_48_\" class=\"st10\" cx=\"9.9\" cy=\"24.7\" r=\"0.7\" />\n                <circle id=\"XMLID_47_\" class=\"st10\" cx=\"9.1\" cy=\"21.5\" r=\"0.8\" />\n                <circle id=\"XMLID_46_\" class=\"st9\" cx=\"4.1\" cy=\"19.5\" r=\"0.7\" />\n                <circle id=\"XMLID_45_\" class=\"st10\" cx=\"4.2\" cy=\"19.4\" r=\"0.7\" />\n                <circle id=\"XMLID_44_\" class=\"st9\" cx=\"6.7\" cy=\"25.1\" r=\"0.8\" />\n                <circle id=\"XMLID_43_\" class=\"st10\" cx=\"6.8\" cy=\"24.9\" r=\"0.7\" />\n                <animate id=\"frame4\" attributeName=\"display\" values=\"none;none;none;inline\" keyTimes=\"0;0.33;0.66;1\" dur=\".4s\" begin=\"0s\" repeatCount=\"indefinite\" />\n            </g>\n        </svg>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/header/header.html", "<div class=\"header-specials\" compile>\n    <div class=\"inner\">\n        <span ng-if=\"homepage\" class=\"header-specials__marketing-offer\">\n            <span class=\"header-specials__marketing-offer--bold\" ng-class=\"{\'show\':customer.data.loggedIn}\" ng-bind-html=\"homepage.bannerMessageLoggedIn | sanitize\" compile></span>\n            <span class=\"header-specials__marketing-offer--bold\" ng-class=\"{\'show\':!customer.data.loggedIn}\" ng-bind-html=\"homepage.bannerMessageLoggedOut | sanitize\" compile></span>\n        </span>\n        <div class=\"header-specials__meta\">\n            <a class=\"header-specials__refer\" ng-href=\"/referrals/landing/about\">Refer &amp; Get ${{referrals.settings.vanillaAdvocateReward}}</a>\n            <span class=\"phone-number\">800.694.9491</span>\n        </div>\n    </div>\n</div>\n\n<div class=\"header-sections\" my-tab=\"checkFocus(\'forward\')\" my-shift-tab=\"checkFocus(\'reverse\')\" my-escape=\"closeMenus()\">\n    <div class=\"inner\">\n        <div class=\"header__left\">\n            <nav class=\"header-nav\">\n                <li ng-repeat=\"menu in data.menus track by $index\" ng-class=\"{open: menu.open}\" ng-mouseenter=\"mouseEnterMenu($index)\" ng-mouseleave=\"mouseLeaveMenu($index)\" class=\"menu__{{menu.id}} menu--with-dropdown header-nav-item\" id=\"menu__{{menu.id}}\" ng-if=\"menu.id !== \'38\' && menu.id !== \'69\'\">\n                    <a ng-href=\"{{::menu.url}}\">\n                        <span>{{::menu.name}} <i class=\"fa fa-angle-down\"></i></span>\n                    </a>\n                    <div class=\"nav__dropdown nav__dropdown-left\">\n                        <div class=\"inner row\">\n                            <div ng-class=\"{column__6:menu.id !== \'69\', column__3:menu.id==\'69\'}\">\n                                <h5 class=\"nav-dropdown__title\">Shop by category</h5>\n                                <ul class=\"unstyled menu__{{menu.id}}\">\n                                    <li ng-repeat=\"child in menu.children\" role=\"presentation\">\n                                        <a class=\"nav__link {{::child.name}}\" ng-href=\"{{::child.url}}\" role=\"menuitem\">{{::child.name}}</a>\n                                    </li>\n                                    <li ng-if=\"menu.id == \'47\'\">\n                                        <a class=\"nav__link Mega\" ng-href=\"/collections/sale.html?gender=men\">Mega Deals!</a>\n                                    </li>\n                                    <li ng-if=\"menu.id == \'37\'\">\n                                        <a class=\"nav__link Mega\" ng-href=\"/collections/sale.html?gender=women\">Mega Deals!</a>\n                                    </li>\n                                    <li ng-if=\"menu.id == \'38\'\" class=\"nav-spacer\">\n                                        <a class=\"nav__link Mega\" ng-href=\"/submission/\">Submit a Design</a>\n                                    </li>\n                                    <li ng-if=\"menu.id == \'38\'\">\n                                        <a class=\"How\" ng-href=\"/how-it-works\">How It Works</a>\n                                    </li>\n                                </ul>\n                            </div>\n                            <div class=\"column__6\" ng-if=\"menu.id !== \'69\'\">\n                                <h5 class=\"nav-dropdown__title\">Featured Products</h5>\n                                <div class=\"nav-products row\">\n                                    <product-card class=\"nav-product column__4\" product=\"product\" index=\"{{$index}}\" state=\"{{product.state}}\" ng-repeat=\"product in data[menu.label] | limitTo:3\"></product-card>\n                                </div>\n                            </div>\n                            <div class=\"column__9\" ng-if=\"menu.id == \'69\'\">\n                                <h5 class=\"nav-dropdown__title\">Featured Products</h5>\n                                <div class=\"nav-products row\">\n                                    <product-card class=\"nav-product column__3\" product=\"product\" index=\"{{$index}}\" state=\"{{product.state}}\" ng-repeat=\"product in data[menu.label] | limitTo:4 \"></product-card>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n                <li class=\"header-nav-item\">\n                    <a ng-href=\"/crowdfunding.html\">\n                        <span>Crowdfunding</span>\n                    </a>\n                </li>\n            </nav>\n        </div>\n        <div class=\"header__center header-nav-item\">\n            <a id=\"brand\" itemprop=\"brand\" itemscope itemtype=\"http://schema.org/Brand\" ng-href=\"/\" class=\"header__logo\" ng-class=\"{cart__active: cart.quantity > 0}\" tabindex=\"-1\">\n                <img itemprop=\"logo\" src=\"/angular/images/bb-logo-text.svg\" alt=\"Betabrand\">\n                <meta itemprop=\"name\" content=\"Betabrand\" />\n            </a>\n        </div>\n        <div class=\"header__right\">\n            <nav class=\"header-nav\">\n                <li ng-repeat=\"menu in data.menus track by $index\" ng-class=\"{open: menu.open}\" ng-mouseenter=\"mouseEnterMenu($index)\" ng-mouseleave=\"mouseLeaveMenu($index)\" class=\"menu__{{menu.id}} menu--with-dropdown header-nav-item\" id=\"menu__{{menu.id}}\" ng-if=\"menu.id == \'38\'\">\n                    <a ng-href=\"{{::menu.url}}\">\n                        <span>{{::menu.name}} <i class=\"fa fa-angle-down\"></i></span>\n                    </a>\n                    <div class=\"nav__dropdown nav__dropdown-left\">\n                        <div class=\"inner row\">\n                            <div ng-class=\"{column__6:menu.id !== \'69\',column__3:menu.id == \'69\'}\">\n                                <h5 class=\"nav-dropdown__title\">What should we make next?</h5>\n                                <ul class=\"unstyled menu__{{menu.id}}\">\n                                    <li ng-repeat=\"child in menu.children\">\n                                        <a class=\"nav__link {{::child.name}}\" ng-href=\"{{::child.url}}\">{{::child.name}}</a>\n                                    </li>\n                                    <li ng-if=\"menu.id == \'38\' && data.thinkTankContests\">\n                                        <a ng-href=\"{{data.thinkTankContests.url}}\">{{data.thinkTankContests.label}}</a>\n                                    </li>            \n                                    <li ng-if=\"menu.id == \'38\'\">\n                                        <a class=\"submit-idea nav__link\" ng-href=\"/submission/\">Submit a Design</a>\n                                    </li>\n                                    <li ng-if=\"menu.id == \'38\'\">\n                                        <a class=\"How\" ng-href=\"/how-it-works\">How It Works</a>\n                                    </li>\n                                    <li ng-if=\"menu.id == \'38\'\">\n                                        &nbsp;\n                                    </li>\n                                    <li ng-if=\"menu.id == \'38\'\">\n                                        &nbsp;\n                                    </li>\n                                </ul>\n                            </div>\n                            <div ng-class=\"{column__6:menu.id !== \'69\',column__9:menu.id == \'69\'}\">\n                                <h5 class=\"nav-dropdown__title\">Featured Ideas</h5>\n                                <div ng-if=\"menu.id == \'38\'\">\n                                    <div class=\"nav-products row\">\n                                        <product-card class=\"nav-product column__4\" product=\"product\" index=\"{{$index}}\" state=\"{{product.state}}\" category=\"crowdfunding\" ng-repeat=\"product in data.thinktank | limitTo: 3\"></product-card>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n                <li class=\"header-nav-item\">\n                    <a ng-href=\"/modelcitizen\">\n                        <span>Model Citizen</span>\n                    </a>\n                </li>\n                <li class=\"header-nav-item\">\n                    <a ng-href=\"/search\">\n                        <span><i class=\"betabrand-search\"></i> Search</span>\n                    </a>\n                </li>\n                <li class=\"header-right__usermenu menu--with-dropdown header-nav-item\">\n                    <a href=\"#\" ng-show=\"!customer.data.loggedIn\" ng-click=\"customer.showLoginModal()\"><span class=\"login__link\">Sign In/Up</span></a>\n                    <a href=\"/account/dashboard\" ng-show=\"customer.data.loggedIn\"><span class=\"login__name\">{{customer.data.firstname | limitTo:10 || \"My Account\"}} <i class=\"fa fa-angle-down\"></i></span></a>\n                    <div class=\"nav__dropdown nav__dropdown-user\" ng-show=\"customer.data.loggedIn\">\n                        <ul>\n                            <li>\n                                <a ng-href=\"/account/dashboard\">Your Account</a>\n                            </li>\n                            <li>\n                                <a ng-href=\"/account/referrals\">Your Referrals</a>\n                            </li>\n                            <li>\n                                <a ng-href=\"/account/orders/\">Your Orders</a>\n                            </li>\n                            <li>\n                                <a href=\"#\" ng-click=\"customer.logout()\">Log Out</a>\n                            </li>\n                        </ul>\n                    </div>\n                </li>\n                <li class=\"nav__cart header-nav-item\" ng-class=\"{cart__active: cart.quantity > 0}\">\n                    <a href=\"#\" ng-click=\"toggleCart()\">\n                        <span>{{cart.getQuantity()}}</span>\n                        <fire-cart></fire-cart>\n                    </a>\n                </li>\n            </nav>\n        </div>\n        <button class=\"menu__button\" ng-click=\"toggleMobileMenu()\">Menu</button>\n        <span class=\"nav__cart--mobile\" ng-click=\"toggleCart()\" ng-class=\"{cart__active: cart.quantity > 0}\">\n            <span>{{cart.getQuantity()}}</span>\n        <fire-cart></fire-cart>\n        </span>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/header/mobile-menu.html", "<div class=\"close__menu\" ng-click=\"toggleMobileMenu()\"><span class=\"betabrand-close-circle\" ng-click=\"bannerService.hideBanner()\"></span></div>\n\n<a class=\"mobile-menu__link--home\" ng-href=\"/\">Home</a>\n\n<div class=\"mobile-menu__category\" ng-repeat=\"menu in HeaderService.menus\">\n    \n    <span class=\"mobile-menu__link\" ng-click=\"menuItemToggle(menu.name)\" ng-if=\"menu.id !== \'69\'\">{{menu.name}} <i class=\"fa fa-angle-down\"></i></span>\n\n    <span class=\"mobile-menu__link\" ng-if=\"menu.id == \'69\'\">\n        <a ng-href=\"/crowdfunding.html\">Crowdfunding</a>\n    </span>\n\n    <div class=\"nav__dropdown\" ng-class=\"{\'nav__dropdown-open\':menu.open}\" ng-if=\"menu.id !== \'69\'\">\n        <ul class=\"unstyled\">\n            <li ng-repeat=\"child in menu.children track by $index\" class=\"menu-link__{{child.id}}\">\n                <a class=\"nav__link {{::child.name}}\" ng-href=\"{{::child.url}}\">{{::child.name}}</a>\n            </li>\n            <li ng-if=\"menu.id == \'47\'\">\n                <a class=\"nav__link Mega\" ng-href=\"/collections/sale.html?gender=men\">Mega Deals!</a>\n            </li>\n            <li ng-if=\"menu.id == \'37\'\">\n                <a class=\"nav__link Mega\" ng-href=\"/collections/sale.html?gender=women\">Mega Deals!</a>\n            </li>\n            <li ng-if=\"menu.id == \'38\' && data.thinkTankContests\">\n                <a ng-href=\"{{data.thinkTankContests.url}}\">{{data.thinkTankContests.label}}</a>\n            </li>            \n            <li ng-if=\"menu.id == \'38\'\" class=\"nav-spacer\">\n                <submit-idea></submit-idea>\n            </li>\n            <li ng-if=\"menu.id == \'38\'\">\n                <a class=\"How\" ng-href=\"/how-it-works\">How It Works</a>\n            </li>\n        </ul>\n    </div>\n\n</div>\n\n<span class=\"mobile-menu__link\">\n    <a ng-href=\"/modelcitizen\">Model Citizen</a>\n</span>\n\n<span class=\"mobile-menu__link\">\n    <a href=\"/search\">Search</a>\n</span>\n\n<span class=\"mobile-menu__link\">\n    <a href=\"/referrals/landing/about\">Refer &amp; Get ${{referrals.settings.vanillaAdvocateReward}}</a>\n</span>\n\n<span class=\"mobile-menu__link\">\n    <a href=\"/contact\">Contact Us</a>\n</span>\n\n<span class=\"mobile-menu__link\" ng-show=\"!customer.data.loggedIn\" ng-click=\"customer.showLoginModal();toggleMobileMenu()\"><i class=\"fa fa-user\"></i> Sign In/Up</span>\n\n<div class=\"mobile-menu__acount\" ng-show=\"customer.data.loggedIn\">\n    <span class=\"mobile-menu__link\"><a href=\"/account/dashboard\">Your Account</a></span>\n    <span class=\"mobile-menu__link\" ng-click=\"customer.logout()\">Log Out</span>\n</div>\n");
  $templateCache.put("/angular/app/homepage/grid-item.html", "<a ng-href=\"{{url}}\" style=\"background-image: url(/media/homepage/config/images/{{image}})\">\n    <div class=\"featured__tab\" style=\"background-color:#{{color}}\">{{label}}</div>\n    <span class=\"center__wrap\">\n        <div class=\"featured__text\">{{label}}</div>\n    </span>\n    <span class=\"tab__overlay\" style=\"background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));\"></span>\n</a>    \n");
  $templateCache.put("/angular/app/homepage/homepage.html", "<div class=\"homepage category\">\n\n\n    <div ng-if=\"modelCitizenHijack && modelCitizenHijack.image\" class=\"homepage-modelcitizen-image\" ng-style=\"{\'padding-bottom\': \'58.51vw - 4.875em\', \'background-image\': \'url(\' + modelCitizenHijack.image + \')\'}\">\n        <div class=\"homepage-modelcitizen-share\"> \n            <div class=\"inner\">\n                <span>Share: </span>\n                <facebook-share callback-success=\'mcShareCallback\'><i class=\"fa fa-facebook\"></i></facebook-share> <twitter-share text=\'Betabrand unveils its next supermodel\' hashtags=\"modelcitizen\" callback-success=\'mcShareCallback\'><i class=\"fa fa-twitter\"></i></twitter-share>\n                <email-share subject=\"Betabrand unveils its next supermodel\" text=\"The fashion world is already abuzz over this dashing new sensation!\"><i class=\"fa fa-envelope\"></i></email-share>            \n            </div>\n        </div>\n    </div>\n\n     <div class=\"homepage-hero\" ng-if=\"homepage.enableCrowdfundingHero\">\n        <div class=\"homepage-hero__content\">\n            <h1><span>Crowdfunded</span> <span>Clothing</span> <span>Community</span></h1>\n            <div class=\"homepage-hero__stats\">\n                <div class=\"homepage-hero__stat\">\n                    <span class=\"number\">$9.1M+</span> <span class=\"text\">Crowdfunding<br>Revenue</span>\n                </div>                \n                <div class=\"homepage-hero__stat\">\n                    <span class=\"number\">466K+</span> <span class=\"text\">Community<br>Collaborators</span>\n                </div>                \n                <div class=\"homepage-hero__stat\">\n                    <span class=\"number\">302</span> <span class=\"text\">Successful<br>Crowdfunding Projects</span>\n                </div>                \n                <div class=\"homepage-hero__stat\">\n                    <span class=\"number\">42,055</span> <span class=\"text\">Customer<br>Photos</span>\n                </div>                \n            </div>\n        </div>\n        <img src=\"/angular/images/homepage/hero.svg\" alt=\"\" ng-if=\"!isPhone\">\n        <img src=\"/angular/images/homepage/hero-mobile.svg\" alt=\"\" ng-if=\"isPhone\">\n    </div>\n\n     <div class=\"homepage-hero\" ng-if=\"!homepage.enableCrowdfundingHero\">\n        <img ng-src=\"/media/homepage/config/images/{{homepage.heroImageDesktop}}\" alt=\"Sale\" ng-if=\"!isPhone\">\n        <img ng-src=\"/media/homepage/config/images/{{homepage.heroImageMobile}}\" alt=\"Sale\" ng-if=\"isPhone\">\n    </div>\n\n    <div class=\"homepage-section\">\n\n        <filter-sorter data=\"data\" filter-sorters=\"filterSorter\"></filter-sorter>\n        \n        <section class=\"category__products grid-container\" ng-if=\"!showCarousel\">\n\n            <product-card\n                class=\"category__product grid-item\"\n                product=\"product\"\n                category=\"data.filteredProducts\"\n                index=\"{{$index}}\"\n                is-think-tank-category=\"data.isThinkTankCategory\"\n                ng-repeat=\"product in data.filteredProducts track by product.id\"\n                ></product-card>\n\n                <p class=\"category-products__emptyresults\" ng-if=\"data.filteredProducts.length == 0\">\n                    Sorry, the filters you selected didn\'t match any products.\n                </p>\n\n        </section>\n\n        <div class=\"sections\">\n            \n            <section class=\"section-{{classification.key.replace(\'$\',\'\').replace(\'+\',\'\') | lowercase}}\" ng-repeat=\"classification in classifications | toArray: false \" ng-if=\"classification.filteredProducts.length && showCarousel\">\n\n                <h2 class=\"decorated\"><span><i class=\"betabrand-{{classification.key}}\"></i> {{classification.label | uppercase}} <i class=\"homepage-section-count\">({{classification.filteredProducts.length}})</i></span></h2>\n\n                <div class=\"homepage-products\">\n                    <button class=\"fa fa-angle-left auto\" ng-click=\"classification.calcIndex(\'right\')\" ng-disabled=\"classification.index == 0\" ng-show=\"classification.dots().length > 1\"></button>\n                    <button class=\"fa fa-angle-right auto\" ng-click=\"classification.calcIndex(\'left\')\" ng-disabled=\"(classification.filteredProducts.length / carouselCount) <= classification.index+1\" ng-show=\"classification.dots().length > 1\"></button>\n                    <div class=\"homepage-products-hidden\">\n                        <div class=\"homepage-products-scroll-area homepage-products-scroll-area-{{classification.key.replace(\'$\',\'\')}}\" ng-attr-style=\"transform:translateX(-{{classification.transformAmount}}px); ms-transform:translateX(-{{classification.transformAmount}}px); moz-transform:translateX(-{{classification.transformAmount}}px); -webkit-transform:translateX(-{{classification.transformAmount}}px);\" ng-swipe-left=\"((classification.filteredProducts.length / carouselCount) <= classification.index+1) ? null : classification.calcIndex(\'left\')\" ng-swipe-right=\"(classification.index == 0) ? null : classification.calcIndex(\'right\')\">\n                            <product-card\n                                class=\"category__product grid-item\"\n                                product=\"product\"\n                                category=\"classification.filteredProducts\"\n                                index=\"{{$index}}\"\n                                is-think-tank-category=\"false\"\n                                ng-repeat=\"product in classification.filteredProducts track by product.id\"\n                                ></product-card>\n                        </div>\n                        \n                    </div>\n                </div>\n                <div class=\"homepage-products-pagination\">\n                    <button ng-repeat=\"dot in classification.dots() track by $index\" ng-click=\"classification.setIndex($index)\" ng-class=\"{\'active\' : classification.index == $index}\" ng-show=\"classification.dots().length > 1\"></button>\n                </div>\n\n                <div class=\"homepage-products-view-more\">\n                    <a class=\"button\" ng-href=\"{{linkMap[classification[\'key\']][\'mens\']}}\" ng-if=\"linkMap[classification[\'key\']][\'mens\']\">View more Men\'s {{classification.label}}</a>\n                    <a class=\"button\" ng-href=\"{{linkMap[classification[\'key\']][\'womens\']}}\" ng-if=\"linkMap[classification[\'key\']][\'womens\']\">View more Women\'s {{classification.label}}</a>\n                </div>\n\n            </section>\n        </div>\n\n\n        <p class=\"homepage-empty-results\" ng-if=\"_.flatten(_.pluck(classifications, \'filteredProducts\')).length == 0\">You\'re really good at filtering. Perhaps too good. Please try another selection.</p>\n\n    </div>\n\n</div>\n");
  $templateCache.put("/angular/app/modal/account-benefits/benefits-modal.html", "<div class=\"benefits__modal modal__content\" ng-show=\"display\" ng-class=\"{closing: closing}\">\n    <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button>\n    </div>\n    <h3>Spends With Benefits</h3>\n    <div class=\"text\">\n        <h4>Betabrand account-holders get:</h4>\n        <ul>\n            <li>Free standard shipping worldwide on every order (no minimum purchase)</li>\n            <li>Early notice for sales and special events</li>\n            <li>Makes checkout approximately 500% faster, especially on a mobile device. Lets you save (securely!!) your credit-card numbers and other billing info, plus shipping addresses and order history</li>\n            <li>Makes voting and commenting simple and easy</li>\n            <li>Special surprises and upgrades (i.e., awesome stuff we can\'t tell you about just yet)</li>\n        </ul>\n    </div>\n\n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\"></div>\n");
  $templateCache.put("/angular/app/modal/add-to-cart/add-to-cart-modal.html", "<div class=\"modal__content add-to-cart-modal\" ng-show=\"display\" ng-class=\"{closing: closing}\">\n    <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button> \n    </div>\n\n    <div class=\"cart\">    \n        <div class=\"row add-to-cart-modal-top\">\n            <div class=\"column__6\">\n                <div class=\"productcard\">\n                    <div class=\"product__image\">\n                        <img ng-src=\"{{data.thumbnail}}?iopts=1150x\" alt=\"\">\n                    </div>\n                    <div class=\"details\">\n                        <h3 class=\"product__name\">{{::data.name}}</h3>\n                        <div class=\"product__price\" ng-if=\"data.prices.final > 0\">\n                            <span ng-show=\"data.state !== \'Out of Stock\'\">\n                                <span class=\"price__final\" ng-class=\"{\'product__price--discount\': data.prices.discount_amount > 0}\">{{data.prices.final | currency}}</span>\n                                <span class=\"price__old\" ng-if=\"data.prices.discount_amount > 0\">{{data.prices.old | currency}}</span>\n                                <span class=\"price__percentage\" ng-if=\"data.prices.discount_percentage > 0\">({{data.prices.discount_percentage}}% Off)</span>\n                                <span class=\"product-badge preorder\" ng-if=\"data.state.toLowerCase() == \'preorder\'\">Pre-Order</span>\n                            </span>\n                            <span class=\"product-badge out-of-stock\" ng-if=\"data.state == \'Out of Stock\'\">Out of Stock</span>\n                        </div>\n                        <div class=\"cart-products__preorder-shipping\" ng-if=\"data.preorder\">\n                            Pre-Order: Ships in {{data.shippingDate}}\n                        </div> \n                        <div class=\"cart-products__crowdfunding-shipping\" ng-if=\"data.crowdfunding\">\n                            Crowdfunding: Ships in {{data.shippingDate}}\n                        </div>                         \n                    </div>\n                </div>\n            </div>\n            <div class=\"column__6\">\n                <h5>Your cart has {{cart.getQuantity()}} <ng-pluralize count=\"cart.getQuantity()\" when=\"{\'1\': \'item\', \'other\': \'items\'}\"></ng-pluralize></h5>\n\n                <div class=\"cart-totals\" ng-if=\"cart.data.items.length\">\n                    <div class=\"row\">\n                        <div class=\"cart-totals__container\">\n\n                            <ul class=\"cart-totals__prices\" ng-show=\"!cart.calculatingTotals\">\n                                <li class=\"cart-totals__{{item.code}}\" ng-repeat=\"item in cart.data.totals | toArray : false | orderBy:\'position\'\" ng-if=\"item.code!=\'grand_total\' || cart.mostRecentPromise.promise.$$state.status\">\n                                    <div class=\"cart-totals__label line__{{item.title | lowercase}}\">{{item.title}}:</div>\n                                    <div class=\"cart-totals__price line__{{item.title | lowercase}}\">{{item.value | currency}}</div>\n                                </li>\n                            </ul>\n                            <ul class=\"cart-totals__prices--total\" ng-show=\"!cart.mostRecentPromise.promise.$$state.status\">\n                                <li>\n                                    <div class=\"cart-totals__label line__total\">Total:</div>\n                                    <div class=\"cart-totals__price line__total\"><span class=\"fa fa-refresh fa-spin\"></span></div>\n                                </li>\n                                \n                            </ul>\n                        </div>\n                    </div>\n                    \n                </div>\n\n                <div class=\"cart-message\" ng-if=\"cart.data.items.length\">\n                    <span ng-if=\"!customerService.data.loggedIn && cart.data.freeShippingOffer.freeShippingActive !== true\">\n                        Get <span class=\"cart-message__free-shipping\">free shipping</span> when you  <a href class=\"signin__link\" ng-click=\"customerService.showLoginModal()\">login</a>.\n                        <!-- Spend {{cart.data.freeShippingOffer.remainingAmount | currency}} more to get <strong>free shipping</strong>. -->\n                    </span>\n                    <span ng-if=\"customerService.data.loggedIn || cart.data.freeShippingOffer.freeShippingActive === true\">\n                        You qualify for <span class=\"cart-message__free-shipping\">free shipping!</span>\n                    </span>\n                </div>\n\n\n                <div class=\"cart-checkout\" ng-if=\"cart.data.items.length\">\n                    <div class=\"row\">\n                        <a ng-disabled=\"!cart.mostRecentPromise.promise.$$state.status\" ng-class=\"{disabled: !cart.mostRecentPromise.promise.$$state.status}\" class=\"cart-checkout__button button primary\" href ng-click=\"openCheckout()\">Checkout</a>\n                    </div>\n                    <div ng-if=\"!cart.hasCrowdfundingItems\" class=\"row\">\n                        <a ng-disabled=\"!cart.mostRecentPromise.promise.$$state.status\" class=\"button paypal tertiary\" target=\'_self\'  href=\'/betapaypal/index/initiate/\'><i class=\"fa fa-paypal\"></i> Checkout with Paypal</a>\n                    </div>\n                </div>                \n            </div>\n        </div>\n\n        <div class=\"cart-crosssells\" ng-if=\"cart.data.crosssells.length && cart.data.items.length\">\n            <div class=\"row\">\n                <h5 class=\"cart-crossells__title\">You might also like</h5>\n                <div\n                    class=\"cart-crosssells__product column__4\"\n                    ng-repeat=\"product in cart.data.crosssells track by $index\">\n                        <crosssell product=\"::product\" source=\"Lightbox\"></crosssell>\n                </div>\n            </div>\n        </div>\n        \n    </div>\n\n\n    \n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\"></div>\n");
  $templateCache.put("/angular/app/modal/how-it-works/how-it-works-modal.html", "<div class=\"how-it-works__modal modal__content\" ng-show=\"display\" ng-class=\"{closing: closing, modal__signin: showSignIn}\">\n    <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button> \n    </div>\n    <h3>How It Works</h3>\n    <div class=\"step\">\n        <img src=\"/angular/images/thinktank/steps/vote.svg\" alt=\"\">\n        <h4>Vote</h4>\n        <p>You decide what we should make next.</p>\n    </div>\n    <div class=\"step\">\n        <img src=\"/angular/images/thinktank/steps/fund-it.svg\" alt=\"\">\n        <h4>Fund it</h4>\n        <p>Voters get first dibs at the biggest savings when a concept goes in crowdfunding.</p>\n    </div>\n    <div class=\"step\">\n        <img src=\"/angular/images/thinktank/steps/get-it-first.svg\" alt=\"\">\n        <h4>Early Access</h4>\n        <p>When you fund a prototype, you get to wear it first.</p>\n    </div>\n        \n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\" ng-class=\"{closing: closing}\"></div>");
  $templateCache.put("/angular/app/modal/login/login-modal.html", "<div class=\"login__modal modal__content\" ng-show=\"display\" ng-class=\"{closing: closing, modal__signin: showSignIn}\">\n    <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button>\n    </div>\n    <div class=\"modal__flip\">\n        <div class=\"modal__front\" ng-if=\"showSignIn\">\n            <div ng-if=\"action==\'login\' || !action\" class=\"welcome-msg__signin\">\n                <h4>Welcome Back!</h4>\n                <span>How very nice to see you again.</span>\n            </div>\n            <div ng-if=\"action==\'vote\'\" class=\"welcome-msg__signin\">\n                <h4>Hey big voter!</h4>\n                <span>Sign in to vote for your favorite designs.</span>\n            </div>\n            <div ng-if=\"action==\'comment\'\" class=\"welcome-msg__signin\">\n                <h4>We\'re excited to hear what you have to say.</h4>\n                <span>Sign in to let us know what you think.</span>\n            </div>               \n            <form name=\"forms.loginForm\" class=\"login__form\" ng-submit=\"emailLogin()\" novalidate>\n                <div class=\"facebook__wrapper\">\n                    <button class=\"facebook__button\" type=\"button\" title=\"Connect with Facebook\" ng-click=\"facebookLogin()\" ng-disabled=\"loadingSpinnerSignIn\"><i class=\"facebook__loading-icon fa fa-refresh fa-spin\" ng-class=\"{\'facebook__loading-icon--show\' : loadingSpinnerFb}\"></i><i class=\"fa fa-facebook\" ng-show=\"!loadingSpinnerFb\"></i> Sign in with Facebook</button>\n                </div>\n                <p class=\"form__or\"><span>or</span></p>\n                <div class=\"emailLoginForm\">\n                    <span class=\"login__error-message\" ng-show=\"errorMsg\">{{ errorMsg }}</span>\n                    <div class=\"login__input-row\">\n                        <input class=\"login__email\" type=\"text\" name=\"email\" placeholder=\"Email\" tabindex=\"1\" required ng-model=\"loginData.email\" ng-disabled=\"loadingSpinnerFb\">\n                        <span class=\"login__error\" ng-show=\"forms.loginForm.email.$error.required && forms.loginForm.$submitted\">Email is required</span>\n                    </div>\n                    <div class=\"login__input-row\">\n                        <input class=\"login__password\" type=\"password\" name=\"password\" placeholder=\"Password\" title=\"Password\" tabindex=\"2\" required ng-model=\"loginData.password\" ng-disabled=\"loadingSpinnerFb\">\n                        <span class=\"login__error\" ng-show=\"forms.loginForm.password.$error.required && forms.loginForm.$submitted\">Password is required</span>\n                    </div>\n\n                    <a href class=\"password__forgot\" ng-click=\"forgotPassword()\">forgot?</a>\n\n                    <button type=\"submit\" class=\"button primary\"><i class=\"emailLoginForm__loading-icon fa fa-refresh fa-spin\" ng-class=\"{\'emailLoginForm__loading-icon--show\' : loadingSpinnerSignIn}\" ></i>Sign in with email</button>\n                    <div class=\"modal__toggle\" href ng-click=\"toggleSignIn()\">Don\'t have an account? <span>Sign up.</span></div>\n                </div>\n            </form>\n\n        </div>\n        <div class=\"modal__back\" ng-if=\"!showSignIn\">\n            <div ng-if=\"action==\'login\' || !action\" class=\"welcome-msg__signin\">\n                <h4><span class=\"responsive_break\">Create A Betabrand</span> <span class=\"responsive_break\"> Account &amp; Get:</span></h4>\n\n                    <ul>\n                        <li>Free standard shipping on every order</li>\n                        <li>10% back in store credit on all purchases&#42;</li>\n                        <li>Much, much more!</li>\n                    </ul>\n\n            </div>\n            <div ng-if=\"action==\'vote\'\" class=\"welcome-msg__signin\">\n                <h4>Better Than An â€œI Votedâ€ Sticker!</h4>\n                <span>Create an account so you can vote for your favorite designs.</span>\n            </div>\n            <div ng-if=\"action==\'comment\'\" class=\"welcome-msg__signin\">\n                <h4>We\'re excited to hear what you have to say.</h4>\n                <span>Create an account so you can tell us what you think.</span>\n            </div>            \n            <div class=\"facebook__wrapper\" ng-show=\"!signupWithEmail\">\n                <button class=\"facebook__button\" type=\"button\" title=\"Connect with Facebook\" ng-click=\"facebookLogin()\" ng-disabled=\"loadingSpinnerSignIn\"><i class=\"facebook__loading-icon fa fa-refresh fa-spin\" ng-class=\"{\'facebook__loading-icon--show\' : loadingSpinnerFb}\"></i><i class=\"fa fa-facebook\" ng-show=\"!loadingSpinnerFb\"></i> Sign up with Facebook</button>\n            </div>\n            <p class=\"form__or\" ng-show=\"!signupWithEmail\"><span>or</span></p>\n            <button class=\"signup-email-button\" ng-click=\"switchSignupMethod()\" ng-show=\"!signupWithEmail\">Sign up with Email</button>\n            <form name=\"forms.signupForm\" class=\"signup__form\" ng-submit=\"emailCreateAccount()\" novalidate ng-show=\"signupWithEmail\">\n                <span class=\"login__error-message\" ng-show=\"errorSignupMsg\">{{ errorSignupMsg }}</span>\n                <input type=\"text\" name=\"firstname\" placeholder=\"First Name\" tabindex=\"1\" ng-model=\"createAccountData.firstname\" required>\n                <span class=\"login__error\" ng-show=\"forms.signupForm.firstname.$error.required && forms.signupForm.$submitted\">First name is required</span>\n\n                <input type=\"text\" name=\"lastname\" placeholder=\"Last Name\" tabindex=\"2\" ng-model=\"createAccountData.lastname\" required>\n                <span class=\"login__error\" ng-show=\"forms.signupForm.lastname.$error.required && forms.signupForm.$submitted\">Last name is required</span>\n\n                <input type=\"email\" name=\"email\" placeholder=\"Email\" tabindex=\"3\" ng-model=\"createAccountData.email\" required>\n                <span class=\"login__error\" ng-show=\"forms.signupForm.email.$error.required && forms.signupForm.$submitted\">Email is required</span>\n                <span class=\"login__error\" ng-show=\"forms.signupForm.email.$invalid && forms.signupForm.email.$dirty\">Email is invalid</span>\n\n                <input type=\"password\" name=\"password\" placeholder=\"Password\" title=\"Password\" tabindex=\"4\" ng-model=\"createAccountData.password\" required>\n                <span class=\"login__error\" ng-show=\"forms.signupForm.password.$error.required && forms.signupForm.$submitted\">Password is required</span>\n\n                <input type=\"password\" name=\"confirmPassword\" placeholder=\"Confirm Password\" title=\"Password\" tabindex=\"5\" ng-model=\"createAccountData.passwordConf\" required>\n                <span class=\"login__error\" ng-show=\"forms.signupForm.confirmPassword.$error.required && forms.signupForm.$submitted\">Confirm password is required</span>\n\n                <button type=\"submit\" class=\"signup__button\"><i class=\"signup__loading-icon fa fa-refresh fa-spin\" ng-show=\"loadingSpinnerSignup\"></i>Sign Up for an account</button>\n\n            </form>\n\n            <div class=\"modal__toggle\" href ng-click=\"toggleSignIn()\">Already have an account? <span>Sign in.</span></div>\n            <span class=\"signup-fb-link\" ng-click=\"switchSignupMethod()\" ng-show=\"signupWithEmail\">Sign up with Facebook</span>\n        </div>\n        <div class=\"newsletter-agreement\">\n            <span>By joining Betabrand through email or Facebook, you agree to our <a href=\"/terms_of_use\" ng-click=\"close()\">Terms of Use</a>.</span>\n            <div>&#42;Full details <a href=\"/account-benefits\" ng-click=\"close()\">here</a>.</div>\n\n        </div>\n    </div>\n\n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\" ng-class=\"{closing: closing}\"></div>\n");
  $templateCache.put("/angular/app/modal/newsletter/newsletter-modal.html", "<div class=\"modal__content newsletter\" ng-show=\"display\" ng-class=\"{closing: closing}\"ng-style=\"{\'background-image\': \'url(\' + customModal.imageUrl + \')\'}\">\n	<div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button> \n    </div>\n\n    <!-- DEFAULT POPUP -->\n	<div class=\"newsletter-modal\" ng-if=\"!customModal\">\n		<div class=\"newsletter-modal__header\">\n			<div class=\"inner\">\n				<img class=\"newsletter-modal__text-logo\" src=\"/angular/images/bb-logo-text.svg\" alt=\"\">				\n			</div>\n		</div>\n		<div class=\"newsletter-modal__incentive\" ng-show=\"!successView\">\n			<h1>10% OFF</h1>\n			<span>Your First Purchase</span>\n		</div>\n		<div class=\"newsletter-modal__success-message\" ng-show=\"successView\">\n			<h3 class=\"newsletter-modal__welcome\">WELCOME TO BETABRAND!</h3>\n			<h3 class=\"newsletter-modal__discount-phrase\" ng-if=\"discountCode\">Here\'s your discount code.*</h3>\n		</div>\n		<div class=\"newsletter-modal__form\" ng-show=\"!successView\">\n			<div class=\"newsletter-modal__facebook\">\n	            <button class=\"newsletter-modal__facebook-btn\" ng-click=\"submitFacebook()\" ng-disabled=\"loadingSpinnerFb\"><i class=\"facebook__loading-icon fa fa-refresh fa-spin\" ng-class=\"{\'facebook__loading-icon--show\' : loadingSpinnerFb}\"></i><i class=\"fa fa-facebook\" ng-show=\"!loadingSpinnerFb\"></i>Connect with Facebook for Discount</button>\n				<p class=\"form__or\">\n					<span>or</span>\n				</p>\n			</div>\n			<form name=\"newsletter\" ng-submit=\"submitEmail(email)\">\n				<span class=\"newsletter-modal__form--error\" ng-show=\"errorMessage\">{{errorMessage}}</span>\n				<input type=\"email\" name=\"email\" placeholder=\"Enter your email\" ng-model=\'email\'>\n				<button class=\"button primary newsletter-modal__submit-btn\" ng-disabled=\"loadingSpinner\"><i class=\"newsletter-modal__loading-icon fa fa-refresh fa-spin\" ng-class=\"{\'newsletter-modal__loading-icon--show\' : loadingSpinner}\"></i> Get My Discount</button>\n			</form>\n		</div>\n		<div class=\"newsletter-modal__offer-code\" ng-show=\"successView\">\n			<span class=\"copy-text\" ng-if=\"discountCode\">{{ copyResponseText }}</span>\n			<span class=\"code\" clip-copy=\"discountCode\" ng-click=\"codeCopied()\" ng-if=\"discountCode\">{{ discountCode }}</span>\n			<button class=\"shop-now\" ng-click=\"close()\">Shop Now</button>\n		</div>\n		<div class=\"newsletter-modal__close\" ng-show=\"!successView\">\n			<a ng-show=\"display\" ng-click=\"close()\" ng-class=\"{closing: closing}\">No thanks, I\'ll just pay full price</a>\n		</div>		\n\n		<div class=\"newsletter-modal__success-details\" ng-show=\"successView\">\n			<p>DISCOUNT AUTOMATICALLY APPLIED TO CART.</p>\n			<span class=\"fine-print\">*Tiny Bummer: 1) Cannot be combined with other discount codes and 2) not valid on previous purchases.</span>\n		</div>\n	</div>\n\n	<!-- CUSTOM POPUP -->\n	<div class=\"newsletter-modal\" ng-if=\"customModal\" ng-class=\"{\'hide-facebook\': !customModal.showFacebook}\">\n		<div class=\"newsletter-modal__header\">\n			<div class=\"inner\">\n				<img class=\"newsletter-modal__text-logo\" src=\"/angular/images/bb-logo-text.svg\" alt=\"\">				\n			</div>\n		</div>\n		<div class=\"newsletter-modal__incentive\" ng-show=\"!successView\">\n			<h1>{{customModal.headline || \"10% OFF\"}}</h1>\n			<span>{{customModal.subHeadline || \"Your First Purchase\"}}</span>\n		</div>\n		<div class=\"newsletter-modal__success-message\" ng-show=\"successView\">\n			<h3 class=\"newsletter-modal__welcome\">{{customModal.successHeadline || \"WELCOME TO BETABRAND!\"}}</h3>\n			<h3 class=\"newsletter-modal__discount-phrase\" ng-if=\"discountCode\">{{customModal.successSubHeadline || \"Here\'s your discount code.*\"}}</h3>\n		</div>\n		<div class=\"newsletter-modal__form\" ng-show=\"!successView\">\n			<form name=\"newsletter\" ng-submit=\"submitEmail(email)\">\n				<span class=\"newsletter-modal__form--error\" ng-show=\"errorMessage\">{{errorMessage}}</span>\n				<input type=\"email\" name=\"email\" placeholder=\"Enter your email\" ng-model=\'email\'>\n				<button class=\"button primary newsletter-modal__submit-btn\" ng-disabled=\"loadingSpinner\"><i class=\"newsletter-modal__loading-icon fa fa-refresh fa-spin\" ng-class=\"{\'newsletter-modal__loading-icon--show\' : loadingSpinner}\"></i>{{customModal.ctaText || \"Get My Discount\"}}</button>\n			</form>\n			<div class=\"newsletter-modal__facebook\">\n				<p class=\"form__or\">\n					<span>or</span>\n				</p>\n	            <button class=\"newsletter-modal__facebook-btn\" ng-click=\"submitFacebook()\" ng-disabled=\"loadingSpinnerFb\"><i class=\"facebook__loading-icon fa fa-refresh fa-spin\" ng-class=\"{\'facebook__loading-icon--show\' : loadingSpinnerFb}\"></i><i class=\"fa fa-facebook\" ng-show=\"!loadingSpinnerFb\"></i>Connect with Facebook</button>\n			</div>\n		</div>\n		<div class=\"newsletter-modal__offer-code\" ng-show=\"successView\">\n			<div ng-class=\"{\'hidden\': !customModal.showOffer}\">\n				<span class=\"copy-text\" ng-if=\"discountCode\">{{ copyResponseText }}</span>\n				<span class=\"code\" clip-copy=\"discountCode\" ng-click=\"codeCopied()\" ng-if=\"discountCode\">{{ discountCode }}</span>\n			</div>\n			<button class=\"shop-now\" ng-click=\"close()\">{{customModal.successCtaText || \"Shop Now\"}}</button>\n		</div>\n		<div class=\"newsletter-modal__close\" ng-show=\"!successView\">\n			<a ng-show=\"display\" ng-click=\"close()\" ng-class=\"{closing: closing}\">No thanks, I\'ll just pay full price</a>\n		</div>		\n\n		<div class=\"newsletter-modal__success-details\" ng-show=\"successView\">\n			<p>DISCOUNT AUTOMATICALLY APPLIED TO CART. YOU ALSO GET FREE SHIPPING ON ORDERS OF $99 OR MORE</p>\n			<span class=\"fine-print\">*Tiny Bummer: 1) Cannot be combined with other discount codes and 2) not valid on previous purchases.</span>\n		</div>\n	</div>\n\n    \n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\"></div>\n");
  $templateCache.put("/angular/app/modal/newsletter/newsletter-modal-mobile.html", "<div class=\"modal__content newsletter-mobile\" ng-show=\"display\" ng-class=\"{closing: closing}\">\n    <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button>\n    </div>\n    <div ng-if=\"!customModal\">\n        <img src=\"/angular/images/bb-logo-text.svg\" alt=\"\" class=\"newsletter-mobile__logo\">\n        <div class=\"newsletter-mobile__offer\" ng-show=\"!successView\">\n            <h1>10% OFF</h1>\n            <span>Your First Purchase</span>\n        </div>\n        <div class=\"newsletter-mobile__offer\" ng-show=\"successView\">\n            <h1>WELCOME!</h1>\n            <span class=\"newsletter-mobile__sub\" ng-if=\"discountCode\">Here\'s your discount code.*</span>\n        </div>\n        <div ng-show=\"!successView\">\n            <div class=\"newsletter-mobile__facebook\">\n                <button class=\"newsletter-mobile__facebook-btn\" ng-click=\"submitFacebook()\" ng-disabled=\"loadingSpinnerFb\"><i class=\"facebook__loading-icon fa fa-refresh fa-spin\" ng-class=\"{\'facebook__loading-icon--show\' : loadingSpinnerFb}\"></i><i class=\"fa fa-facebook\" ng-show=\"!loadingSpinnerFb\"></i>Connect FB for Discount</button>\n                <p class=\"form__or\">\n                    <span>or</span>\n                </p>\n            </div>\n            <form name=\"newsletter\" ng-submit=\"submitEmail(email)\">\n                <h3 class=\"newsletter-mobile__error\" ng-show=\"errorMessage\">{{errorMessage}}</h3>\n                <input type=\"email\" name=\"email\" placeholder=\"Enter your email\" ng-model=\'email\'>\n                <button class=\"button newsletter-mobile__submit-btn\" ng-disabled=\"loadingSpinner\"><i class=\"newsletter-mobile__loading-icon fa fa-refresh fa-spin\" ng-class=\"{\'newsletter-mobile__loading-icon--show\' : loadingSpinner}\"></i> Get My Discount</button>\n            </form>\n        </div>\n        <div ng-show=\"successView\">\n            <span class=\"newsletter-mobile__code\" ng-if=\"discountCode\">{{ discountCode }}</span>\n            <button ng-click=\"close()\" class=\"newsletter-mobile__submit-btn\">Shop Now</button>\n        </div>\n        <div class=\"newsletter-mobile__cancel\" ng-show=\"!successView\">\n            <a ng-show=\"display\" ng-click=\"close()\">No thanks, I\'ll just pay full price</a>\n        </div>\n        <div class=\"newsletter-mobile__success\" ng-show=\"successView\">\n            <p>DISCOUNT AUTOMATICALLY APPLIED TO CART.</p>\n            <span>*Tiny Bummer: 1) Cannot be combined with other discount codes and 2) not valid on previous purchases.</span>\n        </div>\n    </div>\n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\"></div>\n");
  $templateCache.put("/angular/app/modal/pre-order/pre-order-modal.html", "<div class=\"pre-order__modal modal__content\" ng-show=\"display\" ng-class=\"{closing: closing, modal__signin: showSignIn}\">\n    <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button> \n    </div>\n	\n	<div class=\"pre-order__overview\" ng-show=\"!questionsForm\">	\n	    <h3 class=\"pre-order__title\">What is Pre-Order?</h3>\n	    <img src=\"/angular/images/pre-order/modal-icon.svg\" alt=\"\">\n	    <p class=\"pre-order__description\">Pre-order indicates the item is currently in production and will ship in the near future. Please check the product page for the estimated ship date. If you purchase this item, weâ€™ll email you updates as production progresses.</p>\n    </div>\n    \n    <questions-form ng-show=\"questionsForm\"></questions-form>\n\n    <span class=\"pre-order__questions\">{{ questionsForm ? \"What is Pre-Order?\" : \"Still have questions?\" }} <a href ng-click=\"showQuestionsForm()\" data-track-event=\"Click Ask a Question\">{{ questionsForm ? \"Go Back\" : \"Contact Us\"}}</a></span>\n\n\n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\" ng-class=\"{closing: closing}\"></div>");
  $templateCache.put("/angular/app/modal/product/out-of-stock-modal.html", "<div class=\"out-of-stock__modal modal__content\" ng-show=\"display\" ng-class=\"{closing: closing, modal__signin: showSignIn}\">\n    <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button> \n    </div>\n    <out-of-stock-form product=\"product\" attributes=\"attributes\"></out-of-stock-form>\n\n\n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\" ng-class=\"{closing: closing}\"></div>\n");
  $templateCache.put("/angular/app/modal/product/questions-modal.html", "<div class=\"questions__modal modal__content\" ng-show=\"display\" ng-class=\"{closing: closing, modal__signin: showSignIn}\">\n    <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button> \n    </div>\n\n    <questions-form></questions-form>\n\n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\" ng-class=\"{closing: closing}\"></div>\n");
  $templateCache.put("/angular/app/modal/quicklook/quick-look.html", "<div class=\"quicklook modal__content\" ng-show=\"display\" ng-class=\"{closing: closing}\">\n    <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button> \n    </div>\n    <span class=\"modal__next fa fa-angle-right\" ng-click=\"getNextProduct()\"></span>\n    <span class=\"modal__previous fa fa-angle-left\" ng-click=\"getPreviousProduct()\"></span>\n\n    <div class=\"quicklook__left\">\n        <div class=\"product__gallery\">\n            <div \n                afkl-lazy-image=\"{{formatImage([{screenWidth:320, imageWidth:320}, {screenWidth:672, imageWidth:672}], currentImage)}}\" class=\"afkl-lazy-wrapper afkl-img-ratio-1-1\" \n                afkl-lazy-image-options=\"::{className: \'gallery_image\'}\" \n                ng-if=\"data.media[currentIndex].type != \'video\'\"\n                ></div>\n                <bb-video name=\"{{data.media[currentIndex].name}}\" description=\"{{data.media[currentIndex].description}}\" url=\"{{data.media[currentIndex].url}}\" play=\"data.media[currentIndex].play\" ng-if=\"data.media[currentIndex].type == \'video\' && data.media[currentIndex].videoType == \'gallery\'\"></bb-video>\n            <div class=\"gallery__thumbs\" ng-if=\"data.media.length > 1\">\n                <div class=\"gallery__thumb\" ng-repeat=\"image in data.media | limitTo:8\" ng-class=\"{\'active\' : $index == currentIndex, \'video-thumbnail\':image.type == \'video\' && image.videoType == \'gallery\' }\">\n                    <div class=\"thumb__pad\">\n                        <div \n                            afkl-lazy-image=\"{{::formatImage([{screenWidth:0, imageWidth:165}], image.url)}}\" class=\"afkl-lazy-wrapper afkl-img-ratio-1-1\" \n                            afkl-lazy-image-options=\"::{className: \'gallery_image\', \'alt\': data.name}\"\n                            ng-click=\"changeGalleryImage(image.url, $index)\"\n                            ng-if=\"image.type != \'video\'\"\n                            ></div>\n                        <div \n                            afkl-lazy-image=\"{{::(image.url | videoDefaultImage)}}\" class=\"afkl-lazy-wrapper afkl-img-ratio-1-1\" \n                            afkl-lazy-image-options=\"::{className: \'gallery_image\', \'alt\': data.name}\"\n                            ng-click=\"changeGalleryImage(image.url, $index)\"\n                            ng-if=\"image.type == \'video\'\"\n                            ></div>\n                        <i class=\"video-thumbnail__icon ng-scope\" ng-if=\"image.type == \'video\' && image.videoType == \'gallery\'\"><i class=\"fa fa-play-circle-o\"></i></i>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"quicklook__right\">\n        \n        <h1 class=\"product__name\">{{data.name}}</h1>\n        <div class=\"product__price\" ng-if=\"data.state !== \'voting\' && data.prices.final > 0\">\n            <span class=\"price__final\" ng-class=\"{\'product__price--discount\': data.prices.discount_amount > 0}\">{{data.prices.final | currency}}</span>\n            <span class=\"price__old\" ng-if=\"data.prices.discount_amount > 0\">{{data.prices.old | currency}}</span>\n        </div>\n\n        <div class=\"product__description\">{{data.seoFriendlyTagline}}</div>\n\n        <div class=\"crowdfunding\" ng-if=\"data.state == \'crowdfunding\'\">\n            <!-- <h5><div class=\"designer-image\" style=\"background-image: url(\'{{data.designerImageUrl}}\')\"></div><span>By {{data.designer}}</span></h5> -->\n            <div class=\"meta-data crowdfunding\">\n                <div class=\"progress-bar-wrapper\">\n                    <div class=\"progress-bar\" style=\"width:{{ data.thinktankCounts.crowdfunding.percent_to_goal >= 100 ? 100 : data.thinktankCounts.crowdfunding.percent_to_goal }}%\"></div>\n                </div>\n                <div class=\"meta-data-inner\">\n                    <div class=\"votes\">\n                        <div class=\"count\"><span>{{data.thinktankCounts.crowdfunding.percent_to_goal}}</span>%</div>\n                        <div class=\"description\">to goal</div>\n                    </div>\n                    <div class=\"comments\">\n                        <div class=\"count\"><span><fb:comments-count  xfbml data-href=\"{{data.canonicalUrl | socialCurrencyUrl}}\"></fb:comments-count></span></div>\n                        <div class=\"description\">comments</div>\n                    </div>\n                    <div class=\"time\">\n                        <div class=\"count\">{{data.thinktankCounts.crowdfunding.days_remaining}}</div>\n                        <div class=\"description\">days left</div>\n                    </div>\n                </div>\n            </div>\n            \n        </div>\n\n        <div class=\"voting\" ng-if=\"data.state == \'voting\'\">\n\n            <div class=\"meta-data voting\">\n                <div class=\"meta-data-inner\">\n                    <div class=\"votes\">\n                        <div class=\"count\"><span>{{data.thinktankCounts.voting.count}}</span></div>\n                        <div class=\"description\">votes</div>\n                    </div>\n                    <div class=\"comments\">\n                        <div class=\"count\"><span><fb:comments-count xfbml data-href=\"{{data.canonicalUrl | socialCurrencyUrl}}\"></fb:comments-count></span></div>\n                        <div class=\"description\">comments</div>\n                    </div>\n                </div>\n            </div>\n            \n        </div>\n        <colorselector product=\"data\"></colorselector>\n\n        <div ng-if=\"isQuickLookLoaded\">\n    \n            <div class=\"product__actions\"  ng-if=\"data.state !==\'voting\'\">\n                <buybar product=\"data\" quicklook=\"close()\"></buybar>\n            </div>\n            <vote-button class=\"btn primary auto\" product=\"data\" ng-if=\"data.state ==\'voting\'\"></vote-button>\n\n            <div class=\"modal__divider\" ng-if=\"data.vitalStatistics.length && data.isSalable\"></div>\n\n            <ul class=\"product__stats\" ng-if=\"data.isSalable\">\n                <li ng-repeat=\"statistic in data.vitalStatistics\" ng-bind-html=\"::statistic.value\" ng-if=\"::statistic.value.length\"></li>\n            </ul>\n            \n            <div class=\"modal__divider\" ng-if=\"data.vitalStatistics.length && data.isSalable\"></div>\n\n            <a class=\"details__link\" ng-href=\"{{useCanonical ? data.canonicalUrl : data.url}}\" ng-click=\"close()\">View Product Details</a>\n            \n        </div>\n\n\n    </div>\n</div>\n\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\" ng-class=\"{closing: closing}\"></div>\n");
  $templateCache.put("/angular/app/modal/referrals/referral-modal.html", "<div class=\"referrals__modal modal__content\" ng-show=\"display\" ng-class=\"{closing: closing, addReferral: showReferralForm}\">\n	<div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button> \n    </div>\n      <referrals-form product-id=\"productId\"></referrals-form>\n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\"></div>\n");
  $templateCache.put("/angular/app/modal/review/review-modal.html", "<div class=\"review__modal modal__content\" ng-show=\"display\" ng-class=\"{closing: closing, addReview: showReviewForm}\">\n      <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button> \n      </div>\n\n      <h3>Your Review</h3>\n\n      <form validate name=\"myForm\" class=\"review__form\">\n            <label>Overall Rating:</label> \n            <input type=\"radio\" ng-model=\"review.rating\" value=\"poor\" ng-required=\"!review.rating\" />Poor\n            <input type=\"radio\" ng-model=\"review.rating\" value=\"fair\" ng-required=\"!review.rating\" />Fair\n            <input type=\"radio\" ng-model=\"review.rating\" value=\"average\" ng-required=\"!review.rating\" />Average\n            <input type=\"radio\" ng-model=\"review.rating\" value=\"good\" ng-required=\"!review.rating\" />Good\n            <input type=\"radio\" ng-model=\"review.rating\" value=\"excellent\" ng-required=\"!review.rating\" />Excellent\n\n            <label>Your Review:</label> \n            <textarea ng-model=\"review.review\" class=\"review__form--textfield\" ng-model=\"review.review\" name=\"myReview\" ng-minlength=\"5\" required></textarea>\n\n            <div ng-messages=\"myForm.myReview.$error\" style=\"color:maroon\">\n                  <div ng-message=\"required\">Required field</div>\n                  <div ng-message=\"minlength\">Your review is too short</div>\n            </div>\n\n            <label>Would you recommend this product? </label>\n            <input type=\"radio\" ng-model=\"review.recommend\" value=\"yes\" ng-required=\"!review.recommend\" />Yes\n            <input type=\"radio\" ng-model=\"review.recommend\" value=\"no\" ng-required=\"!review.recommend\" />No\n\n            <button type=\"submit\" ng-click=\"upate(review)\"><i class=\"fa fa-envelope\"></i> Submit Review</button>\n\n\n  </form>\n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\"></div>\n");
  $templateCache.put("/angular/app/modelcitizen/modelcitizen.html", "<div class=\"modelcitizen\" when-scrolled=\"loadMore()\">\n\n    <div class=\"walloffame__header\">\n        <div class=\"intro__content\">\n            <h1>Model Citizen</h1>\n            <h3>Be a star. Get a deal.</h3>\n        </div>\n        <img ng-src=\"/angular/images/modelcitizen/Model_Citizen-Hero_00.jpg\" alt=\"\">\n    </div>\n\n    <div class=\"walloffame__actions\">\n        <div class=\"action__section\">\n            <h2>New to Betabrand?</h2>\n            <button ng-disabled=\"photoType == \'bglasses\'\" ng-click=\"showUploader(\'bglasses\')\">\n                <span>Upload a photo for a <span>10% DISCOUNT</span></span>\n            </button>\n            <p>Upload any ol\' photo and add some B-Glasses. You\'ll become our homepage superstar and get a <span>10% discount</span></p>\n        </div>\n        <div class=\"action__section\">\n            <h2>Existing Customer?</h2>\n            <button ng-disabled=\"photoType == \'model\'\" ng-click=\"showUploader(\'model\')\">\n                <span>Upload a photo for a <span>20% DISCOUNT</span></span>\n            </button>\n            <p>Upload a photo of yourself in anything from Betabrand. You\'ll become a superstar and get a <span>20% discount.</span></p>\n        </div>\n    </div>\n\n    <div id=\"scroll__target\"></div>\n\n    <model-citizen-uploader id=\"modelcitizen__uploader\" photo-type-object=\"photoType\" ng-show=\"ModelCitizenService.showUploader\"></model-citizen-uploader>\n\n    <section class=\"walloffame__images\">\n        <div class=\"wof__image\" ng-repeat=\"image in images\">\n            <a href ng-click=\"showImageModal({image:image})\" style=\"background-image: url({{image.thumbnail}})\"></a>\n        </div>\n    </section>\n    \n    <div class=\"loading__images\" ng-show=\"loadingPhotos\"><span class=\"fa fa-refresh fa-spin\"></span> Loading More Models</div>\n\n</div>\n");
  $templateCache.put("/angular/app/modelcitizen/modelcitizen-modal.html", "<div class=\"modelcitizen-modal modal__content\" ng-show=\"display\" ng-class=\"{closing: closing}\">\n    <div class=\"modal__close\">\n        <span class=\"pe-7s-close-circle\" ng-click=\"close()\"></span> \n    </div>\n\n    \n\n<!--     <img ng-src=\"{{data.image}}\" alt=\"{{data.comment}}\"> -->\n    <img class=\"modelcitizen-modal__image\" ng-class=\"{\'modelcitizen-modal__image--sidebar\' : data.comment || data.product}\" ng-src=\"{{data.image}}\" alt=\"{{data.image.name}}\">\n\n    <div class=\"modelcitizen-modal__sidebar\" ng-show=\"data.comment || data.product\">\n        <p ng-if=\"data.comment.length\" class=\"modelcitizen-modal__caption\" ng-class=\"{\'modelcitizen-modal__caption--shop\' : data.product}\">{{data.comment}}</p>\n    \n        <div ng-if=\"data.product\" class=\"modelcitizen-modal__shop\">\n            <h6>Shop:</h6>\n            <a ng-click=\"goToProductPage()\">\n                <img ng-src=\"{{data.product.image.url}}\" height=\"100\" width=\"150\" ng-alt=\"{{data.product.image.label}}\">\n                \n                <span class=\"modelcitizen-modal__product-name\">{{data.product.name}}</span>\n            </a>\n        </div>\n    </div>\n    <div class=\"modelcitizen-modal__nav\">\n        <span class=\"modal__previous fa fa-angle-left\" ng-click=\"getPreviousImage()\"></span>\n        <span class=\"modal__next fa fa-angle-right\" ng-click=\"getNextImage()\"></span>        \n    </div>\n\n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\" ng-class=\"{closing: closing}\"></div>\n");
  $templateCache.put("/angular/app/modelcitizen/modelcitizen-uploader.html", "<section class=\"modelcitizen__uploader\">\n    <div class=\"uploader__pad\">\n        <!-- <span class=\"close__uploader pe-7s-close-circle\" ng-click=\"close()\"></span>  -->\n        <div class=\"uploader__wrapper\">\n            <div class=\"uploader__left\">\n                <div id=\"uploader__canvas\" class=\"uploader__canvas\">\n                    <div class=\"centered__content\" ng-hide=\"hasPhoto\">\n                        <div class=\"upload__instructions\">Drag and drop a photo here</div>\n                        <div class=\"upload__hint\">Hint: Horizontal photos work better!</div>\n                    </div>\n                    <canvas id=\"fabric__canvas\"></canvas>\n                </div>\n                <div class=\"modelcitizen-uploader__controls\" ng-show=\"hasPhoto\">\n                    \n                    <label for=\"scale-control\">Scale Image:</label>\n                    <input type=\"range\" id=\"scale-control\" value=\"1\" min=\"0.1\" max=\"2\" step=\"0.01\" ng-change=\"scaleControlChange()\" ng-model=\"scaleAmount\">\n\n                    <span ng-show=\"photoType==\'bglasses\'\">\n                        <label for=\"rotate-control\">Rotate Glasses:</label>\n                        <input type=\"range\" id=\"angle-control\" value=\"0\" min=\"-180\" max=\"180\" ng-change=\"rotateControlChange()\" ng-model=\"rotateAmount\">\n                    </span>\n                    \n                </div>\n\n                <div class=\"modelcitizen-uploader__mobile\">\n                    <div class=\"decorated\"><span>Upload a photo</span></div>\n                    <input type=\"file\" name=\"file\" onchange=\"angular.element(this).scope().uploadFile(this.files)\"/>\n                    <div class=\"clear__image\" ng-click=\"clearImage()\"><span class=\"pe-7s-close\"></span> <span>Remove Image</span></div>\n                </div>\n\n            </div>\n            <div class=\"uploader__right\">\n                <h2>Model Citizen</h2>\n                <h3>Be a star. Get a deal.</h3>\n                <p ng-if=\"photoType==\'bglasses\'\">Upload a photo, add a pair of B-Glasses, and get <strong>10% off</strong> any order in the next 24 hours!</p>\n                <p ng-if=\"photoType==\'model\'\">Upload a photo of yourself in anything from Betabrand and get <strong>20% off</strong> any order in the next 24 hours!</p>\n                <form>\n                    <input class=\"uploader__email\" type=\"email\" placeholder=\"Enter your email\" ng-model=\"userEmail\" required>\n                    <input class=\"uploader__caption\" type=\"text\" placeholder=\"Enter a caption\" ng-model=\"caption\">\n                    <div class=\"agreement-wrapper\">\n                        <li class=\"agreement-wrapper__checkbox\">\n                            <input type=\"checkbox\" name=\"newsletter\" ng-change=\"trackingService.trackEvent(\'Newsletter Opt-out\', {\'Source\':\'Modelcitizen\'})\" ng-model=\"ModelCitizenService.joinNewsletter\">\n                        </li>\n                        <li class=\"agreement-wrapper__label\">\n                            <span>Sign up for the Betabrand newsletter.</span>  \n                        </li>\n                    </div>\n                    <a class=\"button\" href ng-click=\"saveImage($event)\" download=\"saved_image\" ng-disabled=\"!hasPhoto || !ModelCitizenService.submitDefer.promise.$$state.status\"><i class=\"fa fa-refresh fa-spin\" ng-show=\"ModelCitizenService.isUploading\"></i> {{photoType == \'bglasses\' ? \'Get Your 10% Discount\' : \'Get Your 20% Discount\'}}</a>\n                </form>\n                <p class=\"upload__disclaimer\">By clicking \"{{photoType == \'bglasses\' ? \'Get Your 10% Discount\' : \'Get Your 20% Discount\'}},\" I agree to the Model Citizen <a ng-href=\"/submission-guidelines/\" target=\"_blank\">submission guidelines</a>.</p>\n            </div>\n        </div>        \n    </div>\n</section>\n");
  $templateCache.put("/angular/app/optimizely/dpyp/dpyp.html", "<div>\n\n    <ready-to-wear-page ng-if=\"data.id && !(data.state == \'voting\' || data.state == \'crowdfunding\' || isConfigurator)\"></ready-to-wear-page>\n\n    <voting-page ng-if=\"data.id && (data.state == \'voting\' && !isConfigurator)\"></voting-page>\n\n    <crowdfunding-page ng-if=\"data.id && (data.state == \'crowdfunding\'  && !isConfigurator)\"></crowdfunding-page>\n    \n    <product-configurator-page ng-if=\"data.id && isConfigurator\"></product-configurator-page>\n\n</div>\n");
  $templateCache.put("/angular/app/optimizely/steppedAddress/old.html", "<div ng-show=\"!model.hide\" recompile>\n\n    <h5 ng-if=\"model.isDefaultBilling\">Default Billing Address</h5>\n\n    <h5 ng-if=\"model.isDefaultShipping\">Default Shipping Address</h5>\n    \n    <div ng-show=\"mode == \'preview\'\" class=\"address__preview {{formName}}\">\n        <span class=\'name\'>{{model.name}}</span>\n        <span ng-show=\"model.email\">{{model.email}}</span>\n        <span class=\"address\">{{model[\'street-address\']}}</span>\n        <span class=\"address\">{{model[\'street-address2\']}}</span>\n        <span class=\"region\"><span class=\"city\">{{model.locality}}</span>, <span class=\"state\">{{model.region}}</span>, <span class=\"postal-code\">{{model[\'postal-code\']}}</span> <span class=\"country\">{{model.country}}</span></span>\n        \n        <ul class=\"address__actions\">\n            <li><a href ng-click=\"edit()\">Edit</a></li>\n            <li ng-if=\"accountAddress\"><a href ng-click=\"delete()\" ng-show=\"loggedIn && !model.isDefaultBilling && !model.isDefaultShipping\">Delete</a></li>\n        </ul>\n        <ul class=\"address__defaults\" ng-if=\"accountAddress\" ng-show=\"loggedIn\">\n            <li><a href ng-click=\"model.isDefaultShipping=true;submit()\" ng-show=\"!model.isDefaultBilling && !model.isDefaultShipping\" >Set as default shipping address</a></li>\n            <li><a href ng-show=\"!model.isDefaultBilling && !model.isDefaultShipping\" ng-click=\"model.isDefaultBilling=true;submit()\">Set as default billing address</a></li>\n        </ul> \n    </div>\n\n\n    <div ng-show=\"mode == \'default\' || mode == \'edit\'\" class=\"address__form\" ng-class=\"{\'edit\': mode==\'edit\', \'default\': mode==\'default\' }\">\n        \n        <form name=\"{{formName}}\" id=\"address-{{formName}}\" class=\"{{formName}}\" novalidate ng-submit=\"submit()\">\n\n            <div class=\"address-form\">\n    \n                <div class=\"address-form__container\">\n                    \n                    <div class=\"row\">\n                        <div class=\"address-form__name column__12\">\n                            \n                            <label for=\"{{formName}}_address_name\">Full Name *</label>\n\n                            <div class=\"input-validate\">\n                                <input id=\"{{formName}}_address_name\" name=\"{{formName}}_address_name\" type=\"text\" value=\"\" ng-model=\"model.name\" required ng-class=\"{\'required--focus\':!{{formName}}Valid && showErrors}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"!{{formName}}Valid && showErrors\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_name.$error.required\">\n                                        Your name is required.\n                                    </small>\n                                </div>\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class=\"row\">\n                        <div ng-if=\"!accountAddress\" class=\"column__12\">\n\n                            <label for=\"{{formName}}_address_email\">Email *</label>\n                            \n                            <div class=\"input-validate\">\n                                <input id=\"{{formName}}_address_email\" name=\"{{formName}}_address_email\" type=\"email\" value=\"\" ng-model=\"model.email\" required ng-class=\"{\'required--focus\':!{{formName}}Valid && showErrors}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"!{{formName}}Valid && showErrors\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_email.$error.required\">\n                                        Your email is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_email.$error.email\">\n                                        Your email is invalid.\n                                    </small>\n                                </div>\n                            </div>\n\n\n                        </div>\n                        \n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"column__12\">\n                            <label for=\"{{formName}}_street_address\">Street Address *</label>\n\n                            <div class=\"input-validate\">\n                                <input id=\"{{formName}}_street_address\" name=\"{{formName}}_street_address\" type=\"text\" value=\"\" ng-model=\"model[\'street-address\']\" required ng-minlength=\"8\" ng-class=\"{\'required--focus\':!{{formName}}Valid && showErrors}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"!{{formName}}Valid && showErrors\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_street_address.$error.required\">\n                                        Your address is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_street_address.$error.minlength\">\n                                        Your address needs to be at least 8 characters\n                                    </small>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"column__12\">\n                            <label for=\"{{formName}}_street_address2\">Street Address (optional)</label>\n\n                            <div class=\"input-validate\">\n                                <input id=\"{{formName}}_street_address2\" name=\"{{formName}}_street_address2\" type=\"text\" value=\"\" ng-model=\"model[\'street-address2\']\" ng-class=\"{\'required--focus\':!{{formName}}Valid && showErrors}\">\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"column__12\">\n                            <label for=\"{{formName}}_tel\">Phone *</label>\n\n                            <div class=\"input-validate\">\n                                <input id=\"{{formName}}_tel\" name=\"{{formName}}_tel\" type=\"tel\" value=\"\" ng-model=\"model.tel\" required ng-class=\"{\'required--focus\':!{{formName}}Valid && showErrors}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"!{{formName}}Valid && showErrors\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_tel.$error.required\">\n                                        Your phone number is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_tel.$error.pattern\">\n                                        Your phone number is invalid.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_tel.$error.minlength\">\n                                        Your phone number needs to be at least 7 characters\n                                    </small>\n                                </div>\n                            </div>\n\n\n\n                        </div>\n\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"column__12\">\n                            <label for=\"{{formName}}_address_country\">Country *</label>\n\n                            <div class=\"input-validate\">\n                                <select id=\"{{formName}}_address_country\" name=\"{{formName}}_address_country\" ng-options=\"country.country_id as country.country_name for country in regions | orderBy: \'position\'\" ng-model=\"model.country\" ng-change=\"updateSubregions()\" required ng-class=\"{\'required--focus\':!{{formName}}Valid && showErrors}\">\n                                    <option value=\"\">Select</option>\n                                </select>                                 \n                                <div class=\"error-container\" ng-show=\"!{{formName}}Valid && showErrors\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_country.$error.required\">\n                                        Your country is required.\n                                    </small>\n                                </div>\n                                \n                            </div>\n\n\n                        </div>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"column__12\">\n                            <label for=\"{{formName}}_address_locality\">City *</label>\n                            <div class=\"input-validate\">\n                                <input id=\"{{formName}}_address_locality\" name=\"{{formName}}_address_locality\" type=\"text\" value=\"\" ng-model=\"model.locality\" required ng-minlength=\"3\" ng-class=\"{\'required--focus\':!{{formName}}Valid && showErrors}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"!{{formName}}Valid && showErrors\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_locality.$error.required\">\n                                        Your city is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_locality.$error.minlength\">\n                                        Your city needs to be at least 3 characters.\n                                    </small>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                    <div class=\"row\">\n\n                        <div class=\"column__12\">\n                            <label for=\"{{formName}}_address_region_select\">State / Region *</label>\n                            <div class=\"input-validate\">\n                                <select ng-if=\"subRegions.length\" id=\"{{formName}}_address_region_select\" name=\"{{formName}}_address_region_select\" ng-options=\"region.region_id as region.name for region in subRegions\" ng-model=\"model.region_id\" ng-change=\"updateRegion(model.region_id)\" required ng-class=\"{\'required--focus\':!{{formName}}Valid && showErrors}\">\n                                    <option value=\"\">Select</option>\n                                </select>                            \n                                \n                                <input ng-if=\"!subRegions.length\" type=\'text\' name=\"{{formName}}.{{formName}}_region\" id=\"{{formName}}_address_region\" ng-model=\"model.region\" required>\n                                \n                                <div class=\"error-container\" ng-show=\"!{{formName}}Valid && showErrors\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_region_select.$error.required\">\n                                        Your state/region is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_region.$error.required\">\n                                        Your state/region is required.\n                                    </small>\n                                </div>\n                            </div>\n                            \n                        </div>\n                    </div>\n                    <div class=\"row\">\n\n                        <div class=\"column__12\">\n                        <label for=\"{{formName}}_address_postal\">Postal Code *</label>\n                            <div class=\"input-validate\">\n                                <input id=\"{{formName}}_address_postal\" name=\"{{formName}}_address_postal\" type=\"text\" value=\"\" ng-model=\"model[\'postal-code\']\" required ng-minlength=\"3\" ng-class=\"{\'required--focus\':!{{formName}}Valid && showErrors}\">\n                                <i class=\"fa fa-check\"></i>\n                                <div class=\"error-container\" ng-show=\"!{{formName}}Valid && showErrors\">\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_postal.$error.required\">\n                                        Your zip code is required.\n                                    </small>\n                                    <small class=\"error\" ng-show=\"{{formName}}.{{formName}}_address_postal.$error.minlength\">\n                                        Your zip code needs to be at least 3 characters.\n                                    </small>\n                                </div>\n                            </div>\n\n\n                        </div>\n                    </div>\n\n                </div>\n                \n                <button type=\"submit\" class=\"primary\" ng-disabled=\"{{formName}}.$invalid\">Save</button>                \n\n            </div>\n            \n        </form>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/pages/404.html", "<div class=\"error-page category\">\n	<div class=\"error-page__headline\">\n		<h3>Oops! We couldn\'t find the page you wanted.</h3>\n		<span>Maybe it\'s here somewhere?</span>\n	</div>\n	<product-gallery category-id=\"categoryId\" ng-if=\"categoryId\" limit=\"12\"></product-gallery>\n</div>\n");
  $templateCache.put("/angular/app/product/breadcrumbs.html", "<ul class=\"product__breadcrumbs\">\n    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n        <a itemprop=\"url\" ng-href=\"/\"><span itemprop=\"title\">Home</span></a>\n    </li>\n    <li itemscope itemtype=\"http://data-vocabulary.org/Breadcrumb\" ng-repeat=\"crumb in breadcrumbs()\">\n        <a itemprop=\"url\" ng-href=\"{{crumb.link}}\"><span itemprop=\"title\">{{crumb.label}}</span></a>\n    </li>\n</ul>");
  $templateCache.put("/angular/app/product/crowdfundingPage.html", "<div id=\"product\" class=\"product\" itemscope itemtype=\"http://schema.org/Product\" itemref=\"name brand\">\n    <div id=\"product__sidebar\" check-sidebar-height product=\"{{data.id}}\" class=\"product__sidebar\" itemprop=\"offers\" itemscope itemtype=\"http://schema.org/Offer\">\n\n        <meta itemprop=\"availability\" content=\"http://schema.org/{{microdata.availability}}\"/>\n        <meta itemprop=\"priceCurrency\" content=\"USD\"/>\n        <meta itemprop=\"itemCondition\" content=\"http://schema.org/NewCondition\"/>\n        <meta itemprop=\"sku\" content=\"{{data.sku}}\"/>\n        <meta itemprop=\"category\" content=\"{{microdata.category}}\"/>\n\n        <div class=\"product__mobile-buybar\" ng-class=\"{\'product__mobile-buybar--open\': mobileBuybar, \'out-of-stock\': !data.isSalable}\">\n            <div class=\"inner\">\n                <div class=\"mobile-buybar__top\">\n                    <button class=\"product__mobile-buybar__close button auto\" ng-click=\"hideMobileBuybar()\">Back</button>\n                    <h4>Choose Size</h4>\n                </div>\n                <div class=\"product__actions\">\n                    <colorselector product=\"data\"></colorselector>\n                    <buybar product=\"data\"></buybar>\n                </div>\n\n                <div class=\"mobile-buybar__bottom\">\n                    <div class=\"product__thinktank-meta-info--mobile\" ng-show=\"data.crowdfundingActivated\">\n                        <div class=\"product__payment\">\n                            <div class=\"icon\">\n                                <i class=\"fa fa-credit-card\"></i>\n                            </div>\n                            <div class=\"text\">\n                                <p ng-show=\"!data.thinktankCounts.successfullyFunded\">If you fund this product, we\'ll pre-authorize the amount on your credit card. We\'ll only charge your card at the end of the funding period, if the product reaches its goal.</p>\n                                <p ng-show=\"data.thinktankCounts.successfullyFunded\">Save 10% when you order this product before its funding deadline. Your card will be charged at the end of the funding period.</p>\n                            </div>\n                        </div>\n                        <div class=\"shipping-wrapper\">\n                            <div class=\"icon\">\n                                <i class=\"fa fa-truck\"></i>\n                            </div>\n                            <div class=\"text\">\n                                <p>Estimated Shipping: <span class=\"highlight\">{{data.shippingDate}}</span><span class=\"not-funded\"> if this product reaches its funding goal</span>.\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"product__mobile-buybar-btn\" ng-show=\"!mobileBuybar\">\n            <button ng-if=\"data.attributes\" class=\"mobile__buy\" ng-click=\"showMobileBuybar()\">Choose size & Fund It</button>\n            <button ng-if=\"!data.attributes\" ng-click=\"addSimpleProductToCart(data)\">Fund It</button>\n            <button ng-if=\"!data.isSalable\" class=\"mobile__buy out-of-stock\" ng-click=\"showMobileBuybar()\">Get Stock Updates</button>\n        </div>\n\n        <div id=\"product__top\" class=\"product__top\">\n            <h1 itemprop=\"name\" id=\"name\" class=\"product__name\">{{data.name}}</h1>\n\n            <div class=\"product__price\">\n                <span class=\"price__final\" ng-class=\"{\'product__price--discount\': data.prices.discount_amount > 0}\" itemprop=\"price\">{{data.prices.final | currency}}</span>\n                <span class=\"price__old\" ng-if=\"data.prices.discount_amount > 0\">{{data.prices.old | currency}}</span>\n                <span class=\"price__percentage\" ng-if=\"data.prices.discount_percentage > 0\">({{data.prices.discount_percentage}}% Off)</span>\n                <!-- <span class=\"product-badge crowdfunding\" ng-if=\"data.crowdfundingActivated\">Fund It</span> -->\n                <span class=\"product-badge preorder\" ng-if=\"data.preorder\">Pre-Order</span>\n            </div>\n\n            <div class=\"product__desktop-buybar\">\n                <div class=\"product__thinktank-info\" ng-show=\"data.crowdfundingActivated\">\n                    <div class=\"progress-bar-wrapper\">\n                        <div class=\"progress-bar\" style=\"width:{{ data.thinktankCounts.crowdfunding.percent_to_goal >= 100 ? 100 : data.thinktankCounts.crowdfunding.percent_to_goal }}%\" ng-class=\"{\'successful\' : data.thinktankCounts.successfullyFunded}\">{{data.thinktankCounts.crowdfunding.percent_to_goal}}% to goal</div>\n                    </div>\n                    <div class=\"cf-tiers\">\n                        <div class=\"tier\" ng-repeat=\"tier in data.thinktankCounts.crowdfunding.tiers\" ng-if=\"$index < 3\" ng-class=\"{\'tier--inactive\':tier.number_remaining == 0}\">\n                            <span class=\"discount\">{{ tier.discount }}% Off</span>\n                            <hr>\n                            <span class=\"backers\">{{tier.number_remaining == 0 ? tier.real_quantity : (tier.real_quantity - tier.number_remaining)}}/{{ tier.real_quantity }} Backers</span>\n                        </div>\n                    </div>\n                    <div class=\"meta-data\">\n                        <span class=\"time\">\n                            <span class=\"count\">{{data.thinktankCounts.crowdfunding.days_remaining}}</span>\n                            <span class=\"description\">days left</span>\n                        </span>\n                        <span class=\"comments\">\n                            <a href ng-click=\"scrollToSection(\'comments\')\">\n                                <span class=\"count\">{{data.commentsCount.count}}</span>\n                                <span class=\"description\">comments</span>\n                            </a>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"product__actions\">\n                    <colorselector product=\"data\"></colorselector>\n                    <buybar product=\"data\"></buybar>\n                </div>\n                <div class=\"product__cf-free-shipping\">\n                    <span>Free Domestic Shipping</span>\n                </div>\n                <ul class=\"product__stats\">\n                    <li ng-repeat=\"statistic in data.vitalStatistics\" ng-bind-html=\"::statistic.value\" ng-if=\"::statistic.value.length\"></li>\n                    <li ng-if=\"data.madeInSf\">Made in San Francisco.</li>\n                </ul>\n                <div class=\"product__thinktank-meta-info\" ng-show=\"data.crowdfundingActivated\">\n                    <div class=\"product__payment\">\n                        <tool-tip label=\"Payment\" icon=\"betabrand-payment\">\n                            <p ng-show=\'!data.thinktankCounts.successfullyFunded\'>If you fund this product, we\'ll pre-authorize the amount on your credit card. We\'ll only charge your card at the end of the funding period, if the product reaches its goal.</p>\n                            <p ng-show=\'data.thinktankCounts.successfullyFunded\'>Save 10% when you order this product before its funding deadline. Your card will be charged at the end of the funding period.</p>\n                        </tool-tip>\n                    </div>\n                    <div class=\"shipping-wrapper\">\n                        <tool-tip label=\"Shipping\" icon=\"betabrand-shipping-1\">\n                            <p>Estimated Shipping: <span class=\'highlight\'>{{data.shippingDate}}</span><span class=\'not-funded\'> if this product reaches its funding goal</span>.<br>\n                        </tool-tip>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    </div>\n    <div class=\"product__body\">\n        <!-- Breadcrumbs -->\n        <div class=\"product__breadcrumbs-wrapper\" ng-include=\"\'angular/app/product/breadcrumbs.html\'\"></div>\n\n        <gallery media=\'data.media\'></gallery>\n\n        <!-- CF Mobile Info -->\n        <div class=\"product__thinktank-info product__thinktank-info--mobile\" ng-show=\"data.crowdfundingActivated\">\n            <div class=\"progress-bar-wrapper\">\n                <div class=\"progress-bar\" style=\"width:{{ data.thinktankCounts.crowdfunding.percent_to_goal >= 100 ? 100 : data.thinktankCounts.crowdfunding.percent_to_goal }}%\" ng-class=\"{\'successful\' : data.thinktankCounts.successfullyFunded}\">{{( 100 / data.thinktankCounts.crowdfunding.min) * data.thinktankCounts.crowdfunding.count | floor }}% to goal</div>\n            </div>\n            <div class=\"cf-tiers\">\n                <div class=\"tier\" ng-repeat=\"tier in data.thinktankCounts.crowdfunding.tiers\" ng-if=\"$index < 3\" ng-class=\"{\'tier--inactive\':tier.number_remaining == 0}\">\n                    <span class=\"discount\">{{ tier.discount }}% Off</span>\n                    <hr>\n                    <span class=\"backers\">{{tier.number_remaining == 0 ? tier.real_quantity : (tier.real_quantity - tier.number_remaining)}}/{{ tier.real_quantity }} Backers</span>\n                </div>\n            </div>\n            <div class=\"meta-data\">\n                <span class=\"time\">\n                    <span class=\"count\">{{data.thinktankCounts.crowdfunding.days_remaining}}</span>\n                    <span class=\"description\">days left</span>\n                </span>\n                <span class=\"comments\">\n                    <a ng-href=\"#comments--scrolljs\" offset=\"145\" du-smooth-scroll du-scrollspy>\n                        <span class=\"count\">{{data.commentsCount.count}}</span>\n                        <span class=\"description\">comments</span>\n                    </a>\n                </span>\n            </div>\n\n            <div class=\"product__cf-free-shipping\">\n                <span>Free Domestic Shipping</span>\n                <span class=\"fund-date\" ng-if=\"!data.attributes\">Will ship in {{data.shippingDate}} if this reaches its funding goal.</span>\n            </div>\n\n        </div>\n\n\n        <div class=\"product__color-selector\" ng-show=\"data.colorProducts\">\n            <h4>Colors</h4>\n            <colorselector product=\"data\"></colorselector>\n        </div>\n\n        <div class=\"product__fit\" ng-show=\"data.fit.length\">\n            <h3>Make, Care, &amp; Fit</h3>\n            <div class=\"content\" ng-bind-html=\"data.fit | sanitize\" compile recompile=\"data.fit\"></div>\n        </div>\n\n        <div id=\"video\" class=\"product__story-video\" anchor-scroll>\n             <div ng-repeat=\"item in data.videos track by $index\">\n                <bb-video name=\"{{item.name}}\" description=\"{{item.description}}\" url=\"{{item.url}}\" play=\"item.play\"></bb-video>\n            </div>\n        </div>\n\n        <div class=\"product__story\">\n            <h3 itemprop=\"description\">{{data.seoFriendlyTagline}}</h3>\n            <div class=\"content\" ng-bind-html=\"data.story | sanitize\"></div>\n        </div>\n\n        <div class=\"product-designers product-designers--long\" ng-include=\"\'/angular/app/thinktank/designers.html\'\" ng-if=\"data.designers.length > 0\"></div>\n\n        <div class=\"product__questions\">\n            <p>Questions? If there\'s anything else you want to know about this product, please <a href ng-click=\"showQuestionsModal()\">contact us</a>.</p>\n        </div>\n\n        <nav class=\"tabs\" id=\"comments--scrolljs\">\n            <button ng-click=\"scrollToSection(\'related\')\" ng-class=\"{ \'active\' : activeTab == \'related\' }\">Related Products</button>\n            <button ng-click=\"scrollToSection(\'comments\')\" ng-class=\"{ \'active\' : activeTab == \'comments\' }\">Comments</button>\n        </nav>\n\n        <div class=\"product-comments\" ng-show=\"activeTab == \'comments\'\">\n            <comments-thread highlights=\"commentHighligts\" thread-id=\"\'product-\'+data.id\" customer=\"customer.data\"></comments-thread>\n        </div>\n\n        <product-gallery class=\"related__products\" collection=\"relatedProducts\" ng-show=\"relatedProducts.length && activeTab == \'related\'\" in-stock=\"true\" limit=\"12\"></product-gallery>\n\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/product/dpyp/product-dpyp.html", "<div class=\"dpyp-product\" id=\"product\" itemscope itemtype=\"http://schema.org/Product\" itemref=\"name brand\">\n\n    <div class=\"dpyp-product__scroll-to-buy\" du-scrollspy=\"add-to-cart-trigger\" offset=\"{{isMobile ? 0 : 200}}\">\n        <div class=\"dpyp-product__scroll-to-buy-inner dpyp-product__scroll-to-buy-inner--mobile\">\n            <button ng-click=\"scrollToSection(\'top\')\">Choose Size &amp; Buy</button>\n        </div>\n        <div class=\"dpyp-product__scroll-to-buy-inner dpyp-product__scroll-to-buy-inner--desktop\">\n            <div class=\"dpyp-product__scroll-to-buy-title\">Dress Pant <img src=\"/media/configurator/dpyp/icons/lotus.svg\"> Yoga Pants</div>\n            <div class=\"configurator-buybar\">\n                <div class=\"buybar\">\n                    <div class=\"select\">\n                        <span>\n                            <i>Style:</i> {{configurator.selectedStyle.label[0]}}\n                        </span>\n                        <select name=\"configurator[styles]\" ng-options=\"key for (key, value) in configurator.styles\" ng-model=\"configurator.selectedStyle\" ng-change=\"onStyleChange()\"></select>\n                    </div>\n                    <div class=\"select\">\n                        <span>\n                            <i>Color:</i> {{configurator.selectedColor}}\n                        </span>\n                        <select name=\"configurator[colors]\" ng-options=\"color for color in configurator.selectedStyle.colors\" ng-model=\"configurator.selectedColor\" ng-change=\"onStyleChange()\"></select>\n                    </div>\n                    <div class=\"select\">\n                        <span>\n                            <i>Size:</i> {{configurator.selectedSimpleProduct.Size}}\n                        </span>\n                        <select name=\"configurator[sizes]\" ng-options=\"value.Size for value in configurator.selectedProduct.simpleProducts\" ng-model=\"configurator.selectedSimpleProduct\">{{value.group}}</select>\n                    </div>\n                </div>                        \n                <button class=\"add-to-cart\" ng-click=\"addToCart()\" ng-class=\"{ \'pre-order\': configurator.selectedSimpleProduct.preorder == true }\" ng-disabled=\"!configurator.selectedSimpleProduct.in_stock\" title=\"{{configurator.addToCartText | uppercase}}\">\n                    <span ng-if=\"configurator.selectedSimpleProduct.in_stock\">{{configurator.selectedSimpleProduct.preorder ? \'Pre-Order\' : \'Add to Cart\'}}</span>\n                    <span ng-if=\"!configurator.selectedSimpleProduct.in_stock\">That Size is Out of Stock</span>\n                    <span class=\"add-to-cart__price\"> - <span class=\"dpyp-product__price-final\" ng-class=\"{\'dpyp-product__price-discount\': configurator.selectedSimpleProduct.prices.discount_amount > 0}\" itemprop=\"price\">{{configurator.selectedSimpleProduct.prices.final | currency}}</span>\n                    <span class=\"dpyp-product__price-old\" ng-if=\"configurator.selectedSimpleProduct.prices.discount_amount > 0\">{{configurator.selectedSimpleProduct.prices.old | currency}}</span></span>\n                    <span class=\"add-to-cart__shipping\" ng-show=\"configurator.selectedSimpleProduct.preorder\"><i class=\"betabrand-shipping-1\"></i> Estimated shipping in <span class=\"dpyp-product__ship-date\">{{configurator.selectedProduct.shippingDate}}</span>.</span>\n                </button>                \n            </div>\n        </div>\n    </div>\n\n    <div class=\"dpyp-product__enlarged-image hidden\" ng-class=\"{\'show\': enlarged}\" ng-swipe-left=\"changeAngle(\'right\')\" ng-swipe-right=\"changeAngle(\'left\')\">\n        <button ng-click=\"changeAngle(\'right\')\" class=\"dpyp-product__rotate-image-right\">\n            <img src=\"/media/configurator/dpyp/icons/rotate-circle.svg\" alt=\"Rotate\">\n        </button>\n        <button ng-click=\"closeEnlarged()\" class=\"dpyp-product__enlarge-image\">\n            <img src=\"/media/configurator/dpyp/icons/close.svg\" alt=\"Close\">\n        </button>\n        <img ng-src=\"{{configurator.currentImage}}\" alt=\"Large Image\" class=\"dpyp-product__enlarged-img\" ng-pinch-zoom max-scale=\"4\">\n    </div>\n\n    <div class=\"dpyp-product__section dpyp-product__section--configurator\" ng-class=\"{\'show\': !enlarged}\">\n        <div class=\"dpyp-product__breadcrumbs-wrapper\" ng-include=\"\'angular/app/product/breadcrumbs.html\'\"></div>\n        <div class=\"dpyp-product__gallery\">\n            <div class=\"dpyp-product__gallery-left\" ng-swipe-left=\"changeAngle(\'right\')\" ng-swipe-right=\"changeAngle(\'left\')\">\n                <button ng-click=\"changeAngle(\'right\')\" class=\"dpyp-product__rotate-image-right\">\n                    <img src=\"/media/configurator/dpyp/icons/rotate-circle.svg\" alt=\"Rotate\">\n                    <span>Rotate</span>\n                </button>\n                <button ng-click=\"openEnlarged()\" class=\"dpyp-product__enlarge-image\">\n                    <img src=\"/media/configurator/dpyp/icons/enlarge.svg\" alt=\"Enlarge\">\n                    <span>Zoom</span>\n                </button>\n                <div>\n                    <img class=\"dpyp-product__image\" ng-src=\"{{configurator.currentImage}}?iopts=807x\" alt=\"{{configurator.selectedStyle.label[0]}}\">\n                </div>\n            </div>\n            <div class=\"dpyp-product__gallery-right\" itemprop=\"offers\" itemscope itemtype=\"http://schema.org/Offer\">\n                <meta itemprop=\"availability\" content=\"http://schema.org/{{microdata.availability}}\" />\n                <meta itemprop=\"priceCurrency\" content=\"USD\" />\n                <meta itemprop=\"itemCondition\" content=\"http://schema.org/NewCondition\" />\n                <meta itemprop=\"sku\" content=\"{{data.sku}}\" />\n                <meta itemprop=\"category\" content=\"{{microdata.category}}\" />\n                <div class=\"dpyp-product__title\">\n                    <h1 itemprop=\"name\">Dress Pant <img src=\"/media/configurator/dpyp/icons/lotus.svg\"> Yoga Pants</h1>\n                </div>\n                <div class=\"configurator-buybar\">\n                    <h4>{{configurator.selectedStyle.label[0]}} : {{configurator.selectedColor}}</h4>\n                    <h4 class=\"dpyp-product__price\" ng-if=\"configurator.selectedSimpleProduct.prices.final > 0\">\n                        <span class=\"dpyp-product__price-final\" ng-class=\"{\'dpyp-product__price-discount\': configurator.selectedSimpleProduct.prices.discount_amount > 0}\" itemprop=\"price\">{{configurator.selectedSimpleProduct.prices.final | currency}}</span>\n                        <span class=\"dpyp-product__price-old\" ng-if=\"configurator.selectedSimpleProduct.prices.discount_amount > 0\">{{configurator.selectedSimpleProduct.prices.old | currency}}</span>\n                    </h4>\n                    <div class=\"styles-wrapper styles-wrapper--desktop\">\n                        <button ng-repeat=\"style in configurator.styles | toArray : false | orderBy:\'position\'\" class=\"{{style.label[0] | lowercase}} styles\" ng-class=\"{\'selected\' : style.label[0] == configurator.selectedStyle.label}\" ng-click=\"configurator.selectedStyle = style; onStyleChange();\">{{style.label[0]}} - {{style.position}}</button>\n                    </div>\n                    <div class=\"colors-wrapper colors-wrapper--desktop\">\n                        <button ng-repeat=\"product in configurator.selectedStyle.products\" class=\"colors\" ng-class=\"{\'selected\' : product.swatchLabel == configurator.selectedColor}\" ng-click=\"configurator.selectedColor = product.swatchLabel; onStyleChange();\" ng-style=\"{\'background-image\': \'url(\' + product.swatch + \')\'}\">{{color}}</button>\n                    </div>\n                    <div class=\"buybar\">\n                        <div class=\"select\">\n                            <span>\n                                {{configurator.selectedStyle.label[0]}}\n                            </span>\n                            <select name=\"configurator[styles]\" ng-options=\"key for (key, value) in configurator.styles\" ng-model=\"configurator.selectedStyle\" ng-change=\"onStyleChange()\"></select>\n                        </div>\n                        <div class=\"select\">\n                            <span>\n                                {{configurator.selectedColor}}\n                            </span>\n                            <select name=\"configurator[colors]\" ng-options=\"color for color in configurator.selectedStyle.colors\" ng-model=\"configurator.selectedColor\" ng-change=\"onStyleChange()\"></select>\n                        </div>\n                        <div class=\"select\">\n                            <span>\n                                {{configurator.selectedSimpleProduct.Size}}\n                            </span>\n                            <select name=\"configurator[sizes]\" ng-options=\"value.Size for value in configurator.selectedProduct.simpleProducts\" ng-model=\"configurator.selectedSimpleProduct\">{{value.group}}</select>\n                        </div>\n                    </div>\n                    <button class=\"add-to-cart\" ng-click=\"addToCart()\" ng-class=\"{ \'pre-order\': configurator.selectedSimpleProduct.preorder == true }\" ng-disabled=\"!configurator.selectedSimpleProduct.in_stock\" title=\"{{configurator.addToCartText | uppercase}}\">\n                        <span ng-if=\"configurator.selectedSimpleProduct.in_stock\">{{configurator.selectedSimpleProduct.preorder ? \'Pre-Order\' : \'Add to Cart\'}}</span>\n                        <span ng-if=\"!configurator.selectedSimpleProduct.in_stock\">That Size is Out of Stock</span>\n                        <span class=\"add-to-cart__price\"> - <span class=\"dpyp-product__price-final\" ng-class=\"{\'dpyp-product__price-discount\': configurator.selectedSimpleProduct.prices.discount_amount > 0}\" itemprop=\"price\">{{configurator.selectedSimpleProduct.prices.final | currency}}</span>\n                        <span class=\"dpyp-product__price-old\" ng-if=\"configurator.selectedSimpleProduct.prices.discount_amount > 0\">{{configurator.selectedSimpleProduct.prices.old | currency}}</span></span>\n                        <span class=\"add-to-cart__shipping\" ng-show=\"configurator.selectedSimpleProduct.preorder\"><i class=\"betabrand-shipping-1\"></i> Estimated shipping in <span class=\"dpyp-product__ship-date\">{{configurator.selectedProduct.shippingDate}}</span>.</span>\n                    </button>\n                    <div class=\"dpyp-product__buybar-subactions\">\n                        <a href ng-click=\"scrollToSection(\'sizing\')\">Sizing Guide</a><a href ng-if=\"configurator.selectedProduct.reviews.length\" ng-click=\"scrollToSection(\'reviews\')\">Testimonials ({{configurator.selectedProduct.reviews.length}})</a><a href ng-click=\"scrollToSection(\'faqs\')\">FAQs</a><a href ng-click=\"showReferralModal()\">Refer &amp; Get ${{referrals.settings.vanillaAdvocateReward}}</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"scroll-arrow fade\" ng-show=\"!scrolled()\">\n            <span>\n                <button ng-click=\"scrollToSection(\'details\')\">Product Details</button>\n                <i class=\"fa fa-angle-down\" ng-class=\"{\'bounce\' : !scrolled()}\" ng-click=\"scrollToSection(\'gallery\')\"></i>\n                <button ng-click=\"scrollToSection(\'gallery\')\">{{configurator.selectedProduct.media.length}} More Images</button>\n            </span>\n        </div>\n        <div class=\"dpyp-product__sharing-methods\">\n            <a target=\"_blank\" class=\"fa fa-facebook\" ng-href=\"http://facebook.com/sharer.php?u={{configurator.selectedProduct.canonicalUrl | encodeURIComponent}}\"></a>\n            <a target=\"_blank\" class=\"fa fa-twitter\" ng-href=\"http://twitter.com/intent/tweet?text={{configurator.selectedProduct.name | encodeURIComponent}}%20{{configurator.selectedProduct.canonicalUrl | encodeURIComponent}}\"></a>\n            <a data-pin-do=\"buttonPin\" target=\"_blank\" class=\"fa fa-pinterest\" ng-href=\"http://pinterest.com/pin/create/button/?url={{configurator.selectedProduct.canonicalUrl | encodeURIComponent}}&description={{configurator.selectedProduct.name | encodeURIComponent}}&media={{configurator.selectedProduct.thumbnail}}\"></a>\n            <script async defer src=\"//assets.pinterest.com/js/pinit.js\"></script>\n        </div>\n\n    </div>\n    <div id=\"add-to-cart-trigger\" class=\"dpyp-product__bottom-sections\" ng-class=\"{\'show\': !enlarged}\">\n        <div class=\"dpyp-product__section dpyp-product__section--gallery\">\n            <gallery media=\'configurator.selectedProduct.media\'></gallery>\n        </div>\n        <div>\n            <h4 class=\"decorated\"><span>Details</span></h4>\n            <div class=\"dpyp-product__flex-row\">\n                <div class=\"dpyp-product__section dpyp-product__section--make\">\n                    <!-- make -->\n                    <h4>Make</h4>\n                    <ul class=\"dash\">\n                        <li>Fabric: stretchy rayon blend (65% rayon, 32% nylon, 3% spandex). </li>\n                        <li>Faux zipper and pockets (two side &amp; two rear) for dress pants styling.</li>\n                        <li>1.5-inch elastic waistband. </li>\n                        <li>Button at waist (non-functional).</li>\n                        <li>Belt loops. </li>\n                        <li ng-if=\"configurator.selectedProduct.madeInSf\">Made in San Francisco.</li>\n                    </ul>\n                    <h4>Care</h4>\n                    <p>Machine wash cold, lay flat to dry or line dry. If you plan on altering the length, you should wash the yoga pants beforehand.</p>\n                    <h4>Fit</h4>\n                    <p>Like most yoga pants, they have lots of stretch. However, if you\'re in between sizes, we recommend ordering a size up.</p>\n                </div>\n                <div class=\"dpyp-product__section dpyp-product__section--fit\">\n                    <img ng-src=\"{{configurator.currentFitImage}}\" alt=\"Fit Image\">\n                </div>\n            </div>\n            <div class=\"dpyp-product__flex-row\">\n                <div class=\"dpyp-product__section dpyp-product__section--sizing\">\n                    <!-- sizing -->\n                    <h4>Sizing Guide <span ng-class=\"{\'active\':unit==\'cm\'}\" ng-click=\"unit = \'cm\'\">CM</span><span ng-class=\"{\'active\' : unit == \'inches\'}\" ng-click=\"unit = \'inches\'\">IN</span></h4>\n                    <div class=\"product-sizing\" ng-if=\"configurator.selectedStyle.label[0] !== \'cropped-leg\'\">\n                        <sizing-chart title=\'Size\' size=\'6\' row-labels=\'Waist|Hip\' column-labels=\'X-Small|Small|Medium|Large|X-Large|2X-Large\' waist-values=\'24.5-25.5|26-27|28-29|30-31.5|33|35\' hip-values=\'33.5-34.5|36-37|38-39|40-41.5|43|45\' unit=\'{{unit}}\'>\n                        </sizing-chart>\n                        <sizing-chart title=\'Length\' size=\'6\' row-labels=\'Inseam\' column-labels=\'Petite|Regular|Long\' inseam-values=\'30|32|34\' unit=\'{{unit}}\'>\n                        </sizing-chart>\n                    </div>\n                    <div class=\"product-sizing\" ng-if=\"configurator.selectedStyle.label[0] == \'cropped-leg\'\">\n                        <sizing-chart title=\'Size\' size=\'6\' row-labels=\'Waist|Hip\' column-labels=\'X-Small|Small|Medium|Large|X-Large|2X-Large\' waist-values=\'24.5-25.5|26-27|28-29|30-31.5|33|35\' hip-values=\'33.5-34.5|36-37|38-39|40-41.5|43|45\' unit=\'{{unit}}\'>\n                        </sizing-chart>\n                        <sizing-chart title=\'Length\' size=\'6\' row-labels=\'Inseam\' column-labels=\'Regular\' inseam-values=\'23\' unit=\'{{unit}}\'>\n                        </sizing-chart>\n                    </div>\n                    <div class=\"product-sizing\">\n                        <ol>\n                            <li><strong>Waist:</strong> Measure your waistline, which is located above your belly button and below your rib cage.</li>\n                            <li><strong>Hip:</strong> Start at one hip and wrap the tape measure around your rear, around the other hip, and back to where you started.</li>\n                            <li><strong>Inseam:</strong> If you have a pair of pants that fit you, measure the inseam of the pants, from the crotch to the hem.</li>\n                        </ol>\n                    </div>\n                </div>\n                <div class=\"dpyp-product__section dpyp-product__section--measure\">    \n                    <img src=\"/media/configurator/dpyp/fit-images/measure.svg\" alt=\"Measuring Guidelines\">\n                </div>\n            </div>\n        </div>\n        <div id=\"video\" class=\"dpyp-product__section dpyp-product__section--video\" anchor-scroll ng-if=\"_.where(configurator.selectedProduct.media, {\'videoType\':\'story\'}).length\">\n            <div ng-repeat=\"item in configurator.selectedProduct.media | filter: {\'videoType\':\'story\'} track by $index\">\n                <bb-video name=\"{{item.name}}\" description=\"{{item.description}}\" url=\"{{item.url}}\" play=\"item.play\"></bb-video>\n            </div>\n        </div>\n        <div class=\"dpyp-product__section dpyp-product__section--story\">\n            <h4 class=\"decorated\" itemprop=\"description\"><span>{{configurator.selectedProduct.seoFriendlyTagline}}</span></h4>\n            <div class=\"content\" ng-bind-html=\"configurator.selectedProduct.story | sanitize\"></div>\n        </div>\n        <div class=\"dpyp-product__section dpyp-influence\">\n            <h6>As featured in:</h6>\n            <div class=\"category-header__influence-logos\">\n                <span><img src=\"/media/configurator/dpyp/logos/the-verge-logo.png\" alt=\"The Verve\"></span>\n                <span><img src=\"/media/configurator/dpyp/logos/glamour-logo.png\" alt=\"Glamour\"></span>\n                <span><img src=\"/media/configurator/dpyp/logos/daily-mail-logo.png\" alt=\"Daily Mail\"></span>\n                <span><img src=\"/media/configurator/dpyp/logos/abc-news-logo.png\" alt=\"ABC News\"></span>\n                <span><img src=\"/media/configurator/dpyp/logos/washington-post-logo.png\" alt=\"Washington Post\"></span>\n            </div>\n        </div>\n        <div class=\"dpyp-product__section dpyp-product__section--reviews\" ng-if=\"configurator.selectedProduct.reviews\">\n            <!-- reviews -->\n            <h4 class=\"decorated\"><span>Testimonials ({{configurator.selectedProduct.reviews.length}})</span></h4>\n            <ul>\n                <li class=\"review-{{$index}}\" ng-repeat=\"review in configurator.selectedProduct.reviews\">\n                    <div itemprop=\"review\" itemscope itemtype=\"https://schema.org/Review\">\n                        <div class=\"review__text\" itemprop=\"reviewBody\">{{review.detail}}</div>\n                        <div class=\"review__header\">\n                            <div itemprop=\"author\" itemscope itemtype=\"http://schema.org/Person\" class=\"left\">\n                                <div itemprop=\"name\" class=\"review__reviewer\">{{review.nickname}}</div>\n                                <div class=\"review__location\">{{review.title}}</div>\n                            </div>\n                            <!-- <div itemprop=\"datePublished\" class=\"review__date\">{{review.createdAt}}</div> -->\n                        </div>\n                    </div>\n                </li>\n            </ul>\n        </div>\n        <div class=\"dpyp-product__section dpyp-product__section--questions\">\n            <div class=\"dpyp-product__section--questions\">\n                <h3>Questions?</h3>\n                <p>If there\'s anything else you want to know about {{configurator.selectedStyle.label[0] | titlecase }} Dress Pant Yoga Pants, please <a href ng-click=\"showQuestionsModal()\" data-track-event=\"Click Ask a Question\">contact us</a>.</p>\n                <h3>FAQs</h3>\n                <div class=\"faqs\">\n                    <button class=\"fa fa-angle-left\" ng-click=\"showFaq(question - 1, \'left\')\" ng-show=\"question > -1\"></button>\n                    <button class=\"fa fa-angle-right\" ng-click=\"showFaq(question + 1, \'right\')\" ng-show=\"question > -1\"></button>\n                    <div>\n                        \n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 0}\" ng-click=\"showFaq(0)\">\n                            <div class=\"flex-pad\">\n                                <h4>How do Dress Pant Yoga Pants run?</h4>\n                                <p>Our Dress Pant Yoga Pants run smaller in most styles, and if you\'re in-between sizes we recommend you size up. This is with the exception of the Glen-Plaid and Herringbone styles, which run slightly larger, and we recommend you size down.</p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 1}\" ng-click=\"showFaq(1)\">\n                            <div class=\"flex-pad\">\n                                <h4>What is the fabric like?</h4>\n                                <p>Plush, soft, flexible - yet sturdy; our yoga pants are constructed out of a stretchy, rayon blend. While they are as comfortable as regular yoga pants they hold their shape and retain their build thanks to our perfect performance fabric.</p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 2}\" ng-click=\"showFaq(2)\">\n                            <div class=\"flex-pad\">\n                                <h4>What brands do they fit similarly to?</h4>\n                                <p>Ours! Our Dress Pant Yoga Pants pants are truly a unique marrying of worlds: work pants that are as comfortable as yoga pants. Their construction is unique, and there\'s no other brand with a product quite like ours. That said, we know online shopping can be frustrating so that\'s why we offer free returns and exchanges.</p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 3}\" ng-click=\"showFaq(3)\">\n                            <div class=\"flex-pad\">\n                                <h4>Where are Dress Pant Yoga Pants made?</h4>\n                                <p>We make every effort to make our clothing in SF, but due to high demand have had to move some batch production of these overseas. All Dress Pant Yoga Pants, if made in SF, will have a \"Made in SF\" indicator on the product page.</p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 4}\" ng-click=\"showFaq(4)\">\n                            <div class=\"flex-pad\">\n                                <h4>What does pre-order mean?</h4>\n                                <p>Pre-order means that the product is currently in production, and that it\'s not ready-to-ship. These items are very likely successfully crowdfunded items or new colorways of existing products. The best part of pre-ordering is that you get a 10% discount as a thank you for waiting on us to make your fine product. All shipping estimates are located on the right hand side of the product page. </p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 5}\" ng-click=\"showFaq(5)\">\n                            <div class=\"flex-pad\">\n                                <h4>What\'s your shipping policy?</h4>\n                                <p>If expedited shipment is not selected your items will be shipped out within 2 business days via standard USPS, UPS, or Fedex shipment. Expedited shipping orders are shipped via UPS and should be placed by 2pm PST if you want your package to arrive by the next business day, and please bear in mind that UPS does not deliver on Saturday or Sundays. If you have a preference for shipper please call Customer Service as soon as your order is placed. Items, once shipped, cannot be redirected to a new address. If your domestic order contains pre-order or crowdfunded product(s), they will ship separately when the product is available, at no additional cost to you.</p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 6}\" ng-click=\"showFaq(6)\">\n                            <div class=\"flex-pad\">\n                                <h4>Do you ship internationally?</h4>\n                                <p>Yes! If you are logged into your Betabrand account your order has free shipping - otherwise it\'s $25 for standard shipment. Expedited shipment is determined at check-out by weight of items and location of shipment. International orders ship when all items are in stock. If you want to receive your in-stock items before the pre-ordered items, we recommend placing separate orders, or writing\n                                    <a href=\"mailto:info@betabrand.com\"></a> to request that we ship the items separately. Please note that additional taxes and duties may be required upon delivery of international orders and we are unable to augment the values to zero to bypass any customs duties. Can\'t select your country? Please call our customer service line for assistance. </p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 7}\" ng-click=\"showFaq(7)\">\n                            <div class=\"flex-pad\">\n                                <h4>What\'s your return policy?</h4>\n                                <p>We offer free return shipping for domestic customers (see below for return label instructions). We have a 60-day return/exchange policy (from the day you received your product). Items can be returned for 110% store credit or a refund to the purchasing payment method. Exchanges can be made for the same item in a different size only. Item(s) must be unworn and unwashed â€” and returned with tags still attached. Please note that exchanges can take up to two weeks to process. (We\'ll do our best to expedite this process. Items bought from the Mega Deals collection are not eligible for return.</p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 8}\" ng-click=\"showFaq(8)\">\n                            <div class=\"flex-pad\">\n                                <h4>How long will it take to get my refund?</h4>\n                                <p>Please allow up to two weeks for refunds or store credits to post or replacements to ship out, although we make every effort to keep that at a minimum. If your exchange needs are dire, please call customer service and they can help expedite the process.</p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 9}\" ng-click=\"showFaq(9)\">\n                            <div class=\"flex-pad\">\n                                <h4>How does your referral program work?</h4>\n                                <p>The best practice for referrals is to create a Betabrand account and refer people via the referrals section of your account. This will help you track who used your referral credit and make it much easier to use your advocate credit for referring them! If you receive a referral email from someone all you need do is click through the email \"shop now\" button and the discount will automatically apply at check-out. Your cart must be at least $75 or higher (after % off discounts) for referral credits to apply (not applicable to advocate credit, which operates like store credit once accrued).</p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 10}\" ng-click=\"showFaq(10)\">\n                            <div class=\"flex-pad\">\n                                <h4>What are the Customer Service hours?</h4>\n                                <p>Customer Service is open 8am - 6pm PST Monday - Friday and are available via chat, phone, or email. The number for customer service is 1(800) 694-9491. The Betabrand Brick and Mortar (located at 780 Valencia Street) is open 7 days a week (save for holiday closures) and is open 11am - 8pm Monday - Saturday and 12pm - 6pm on Sundays. They can be reached by phone at 1(415) 692-7433 or by email at <a href=\"mailto:retail@betabrand.com\">retail@betabrand.com</a></p>\n                            </div>\n                        </div>\n                        <div class=\"product-faq\" ng-class=\"{\'animate-show\':question == 11}\" ng-click=\"showFaq(11)\">\n                            <div class=\"flex-pad\">\n                                <h4>Still don\'t have your answer?</h4>\n                                <p>Our customer service folks can also assist with any additional questions. Our hours are Monday - Friday, 8am - 6pm and you can reach us at 1(800) 694-9491.</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"dpyp-product__section\">\n            <h4 class=\"decorated\"><span>Related Products</span></h4>\n            <product-gallery class=\"related__products\" collection=\"configurator.relatedProducts\" in-stock=\"true\" limit=\"12\"></product-gallery>\n        </div>\n        <button class=\"button back-to-top auto\" ng-click=\"scrollToSection(\'configurator\')\"><i class=\"fa fa-long-arrow-up\"></i> Back to Top</button>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/product/product.html", "<div optimizely=\"dpyp\">\n\n    <ready-to-wear-page ng-if=\"data.id && !(data.state == \'voting\' || data.state == \'crowdfunding\') && !isConfigurator\"></ready-to-wear-page>\n\n    <voting-page ng-if=\"data.id && (data.state == \'voting\') && !isConfigurator\"></voting-page>\n\n    <crowdfunding-page ng-if=\"data.id && (data.state == \'crowdfunding\') && !isConfigurator\"></crowdfunding-page>\n    \n</div>\n");
  $templateCache.put("/angular/app/product/productCard.html", "<div class=\"category__product productcard {{::product.state}}\" data-product-id=\"{{::product.id}}\" ng-class=\"::{\'isThinkTankCategory\':isThinkTankCategory, \'graduate\': (product.crowdfundingGraduate == true && isThinkTankCategory == true) }\" >\n    <div class=\"product__pad\">\n        <div class=\"product__image\">\n            <div class=\"product__actions\">\n                <button class=\"product__quicklook button secondary\" ng-click=\"showQuickLook()\">Quick Look</button>\n            </div>\n            <a ng-href=\'{{::useCanonical ? product.canonicalUrl : product.url}}\' data-track-event=\"Click Product Card\" data-track-data=\"::getTrackingData\">\n                <div afkl-lazy-image=\"{{::product.formattedThumbnails([{screenWidth:480, imageWidth:480}, {screenWidth:680, imageWidth:680}], product.thumbnail)}}\" class=\"afkl-lazy-wrapper afkl-img-ratio-1-1\" afkl-lazy-image-options=\"::{alt: product.name, className: \'product__img\'}\" title=\"{{::product.name}}\"></div>\n                <span class=\"tab__overlay\" style=\"background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));\"></span>\n            </a>\n        </div>\n        <div class=\"details {{::product.state}}\" ng-class=\"::{\'successful\' : product.thinktankCounts.successfullyFunded}\">\n            <div ng-switch on=\"::product.state\">\n                <div ng-switch-when=\"voting\">\n                    <div class=\"designer-image\" style=\"background-image: url(\'{{::(product.designerImageUrl || product.designers[0].image)}}\')\"></div>\n                    <h5>By {{::(product.designers[0].label || product.designer || product.designers[0].name)}}</h5>\n                    <a ng-href=\'{{::useCanonical ? product.canonicalUrl : product.url}}\' tabindex=\"-1\">\n                        <h3 class=\"product__name\">{{::product.name}}</h3>\n                    </a>\n                    <div class=\"meta-data voting\">\n                        <div class=\"meta-data-inner\">\n                            <div class=\"votes\">\n                                <i class=\"fa fa-check\"></i>\n                                <span id=\"vote-count-{{::product.id}}\">{{::product.thinktankCounts.voting.count | number:0}}</span>\n                            </div>\n                            <vote-button class=\"btn productcard\" product=\"::product\"></vote-button>\n                            <div class=\"comments\">\n                                <i class=\"fa fa-comment-o\"></i> {{::product.commentsCount.count | number:0}}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div ng-switch-when=\"undefined\">\n                    <a ng-href=\'{{::useCanonical ? product.canonicalUrl : product.url}}\' class=\"product__link\">\n                        <h3 class=\"product__name\">{{::product.name}}</h3>\n                    </a>\n                    <div class=\"product__price\" ng-if=\"::product.prices.final > 0\">\n                        <span ng-show=\"::product.state !== \'Out of Stock\'\">\n                            <span class=\"price__final\" ng-class=\"::{\'product__price--discount\': product.prices.discount_amount > 0}\">{{::product.prices.final | currency}}</span>\n                            <span class=\"price__old\" ng-if=\"::product.prices.discount_amount > 0\">{{::product.prices.old | currency}}</span>\n                            <span class=\"price__percentage\" ng-if=\"::product.prices.discount_percentage > 0\">({{::product.prices.discount_percentage}}% Off)</span>\n                            <span class=\"product-badge preorder\" ng-if=\"::product.state.toLowerCase() == \'preorder\'\">Pre-Order</span>\n                        </span>\n                        <span class=\"product-badge out-of-stock\" ng-if=\"::product.state == \'Out of Stock\'\">Out of Stock</span>\n                    </div>\n                </div>\n                <div ng-switch-default>\n                    <div ng-show=\"::isThinkTankCategory\">\n                        <a ng-href=\'{{::useCanonical ? product.canonicalUrl : product.url}}\' class=\"product__link\">\n                            <h3 class=\"product__name\">{{::product.name}}</h3>\n                        </a>\n                        <div class=\"product__price\" ng-if=\"::product.prices.final > 0\">\n                            <span ng-show=\"::product.state !== \'Out of Stock\'\">\n                                <span class=\"price__final\" ng-class=\"::{\'product__price--discount\': product.prices.discount_amount > 0}\">{{::product.prices.final | currency}}</span>\n                                <span class=\"price__old\" ng-if=\"::product.prices.discount_amount > 0\">{{::product.prices.old | currency}}</span>\n                                <span class=\"price__percentage\" ng-if=\"::product.prices.discount_percentage > 0\">({{::product.prices.discount_percentage}}% Off)</span>\n                                <span class=\"product-badge preorder\" ng-if=\"::product.state.toLowerCase() == \'preorder\'\">Pre-Order</span>\n                            </span>\n                            <span class=\"product-badge out-of-stock\" ng-if=\"::product.state == \'Out of Stock\'\">Out of Stock</span>\n                        </div>\n                        <div class=\"meta-data crowdfunding\">\n                            <div class=\"progress-bar-wrapper\">\n                                <div class=\"progress-bar\" style=\"width:{{::product.thinktankCounts.crowdfunding.percent_to_goal >= 100 ? 100 : product.thinktankCounts.crowdfunding.percent_to_goal }}%\"></div>\n                            </div>\n                            <div class=\"meta-data-inner\">\n                                <div class=\"votes\">\n                                    <div class=\"count\"><span>{{::product.thinktankCounts.crowdfunding.percent_to_goal}}</span>%</div>\n                                    <div class=\"description\">to goal</div>\n                                </div>\n                                <div class=\"comments\">\n                                    <div class=\"count\"><span>{{::product.commentsCount.count}}</span></div>\n                                    <div class=\"description\">comments</div>\n                                </div>\n                                <div class=\"time\">\n                                    <div class=\"count\">{{::product.thinktankCounts.crowdfunding.days_remaining}}</div>\n                                    <div class=\"description\">day{{::product.thinktankCounts.crowdfunding.days_remaining == 1 ? \'\' : \'s\'}} left</div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div ng-show=\"::!isThinkTankCategory\">\n                        <a ng-href=\'{{::useCanonical ? product.canonicalUrl : product.url}}\' class=\"product__link\"  tabindex=\"-1\">\n                            <h3 class=\"product__name\">{{::product.name}}</h3>\n                        </a>\n                        <div class=\"product__price\" ng-if=\"::product.prices.final > 0\">\n                            <span ng-show=\"::product.state !== \'Out of Stock\'\">\n                                <span class=\"price__final\" ng-class=\"::{\'product__price--discount\': product.prices.discount_amount > 0}\">{{::product.prices.final | currency}}</span>\n                                <span class=\"price__old\" ng-if=\"::product.prices.discount_amount > 0\">{{::product.prices.old | currency}}</span>\n                                <span class=\"price__percentage\" ng-if=\"::product.prices.discount_percentage > 0\">({{::product.prices.discount_percentage}}% Off)</span>\n                                <span class=\"product-badge preorder\" ng-if=\"::product.state.toLowerCase() == \'preorder\'\">Pre-Order</span>\n                            </span>\n                            <span class=\"product-badge out-of-stock\" ng-if=\"::product.state == \'Out of Stock\'\">Out of Stock</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <!-- <colorselector product=\"product\" ng-show=\"product.colorProducts\"></colorselector> -->\n        </div>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/product/productGallery.html", "<section>\n	<div class=\"product__cards grid-container\">\n	    <product-card\n            class=\"category__product grid-item\"\n	        product=\"product\"\n            index=\"{{$index}}\"\n            is-think-tank-category=\"collection.isThinkTankCategory\"\n	        ng-repeat=\"product in collection | limitTo : productLimit track by $index\"\n	        ></product-card>\n	</div>\n</section>\n\n\n");
  $templateCache.put("/angular/app/product/questions-form.html", "<div class=\"questions-form\">\n    <form class=\"questions-form\" name=\"productQuestion\">\n        <h2>Have a question?</h2>\n        \n        <p>If there\'s anything you\'d like to know about this product, please let us know!</p>\n\n        <label for=\"email\">Email</label>\n        <input class=\"questions-form__email\" type=\"email\" name=\"email\" placeholder=\"me@email.com\" ng-model=\"data.email\" required ng-model-options=\"{ updateOn: \'default blur\', debounce: {\'default\': 700, \'blur\': 0} }\" ng-class=\"{\'questions-form__email--error\' : productQuestion.email.$touched && productQuestion.email.$error.required}\">\n        <span class=\"questions-form--error\" ng-show=\"productQuestion.email.$touched && productQuestion.email.$error.required\">Please enter a valid email</span>\n\n\n\n        <label for=\"comment\">Question</label>\n        <textarea class=\"questions-form__comment\" name=\"comment\" ng-model=\"data.comment\" placeholder=\"My question is...\" required ng-class=\"{\'questions-form__comment--error\' : productQuestion.comment.$error.required && productQuestion.comment.$touched}\"></textarea>\n        <span class=\"questions-form--error\" ng-show=\"productQuestion.comment.$touched &&productQuestion.comment.$error.required\">Please enter a question</span>\n\n        <button type=\"submit\" class=\"questions__button\" ng-click=\"submitQuestion()\" ng-disabled=\"productQuestion.$invalid\">Send your question</button>\n    </form>\n    \n</div>");
  $templateCache.put("/angular/app/product/readyToWearPage.html", "<div id=\"product\" class=\"product\" itemscope itemtype=\"http://schema.org/Product\" itemref=\"name brand\">\n    <div class=\"product__mobile-buybar\" ng-class=\"{\'product__mobile-buybar--open\': mobileBuybar, \'out-of-stock\': !data.isSalable, \'buybar--preorder\':data.preorder || data.preorderSelected}\">\n        <div class=\"inner\"> \n            <div class=\"mobile-buybar__top\">\n                <button class=\"product__mobile-buybar__close button auto\" ng-click=\"hideMobileBuybar()\">Go Back</button>\n                <h4 ng-if=\"data.isSalable\">Choose Size</h4>\n                <h4 ng-if=\"!data.isSalable\">Get Stock Updates</h4>\n            </div>\n            <div class=\"product__actions\">\n                <colorselector product=\"data\"></colorselector>\n                <buybar product=\"data\"></buybar>\n            </div>\n\n        </div>        \n    </div>\n\n    <div class=\"product__mobile-buybar-btn\" ng-show=\"!mobileBuybar\">\n        <button ng-if=\"data.isSalable && data.attributes\" class=\"mobile__buy\" ng-click=\"showMobileBuybar()\">Choose size & Buy</button>\n        <button ng-if=\"data.isSalable && !data.attributes\" ng-click=\"addSimpleProductToCart(data)\">Add to Cart</button>\n        <button ng-if=\"!data.isSalable\" class=\"mobile__buy out-of-stock\" ng-click=\"showMobileBuybar()\">Get Stock Updates</button>\n    </div>\n\n    <div id=\"product__sidebar\" check-sidebar-height product=\"{{data.id}}\" class=\"product__sidebar\" itemprop=\"offers\" itemscope itemtype=\"http://schema.org/Offer\">\n\n        <meta itemprop=\"availability\" content=\"http://schema.org/{{microdata.availability}}\"/>\n        <meta itemprop=\"priceCurrency\" content=\"USD\"/>\n        <meta itemprop=\"itemCondition\" content=\"http://schema.org/NewCondition\"/>\n        <meta itemprop=\"sku\" content=\"{{data.sku}}\"/>\n        <meta itemprop=\"category\" content=\"{{microdata.category}}\"/>\n\n        <div id=\"product__top\" class=\"product__top\">\n            <h1 itemprop=\"name\" id=\"name\" class=\"product__name\">{{data.name}}</h1>\n            \n            <div class=\"product__price\" ng-if=\"data.prices.final > 0\">\n                <span class=\"price__final\" ng-class=\"{\'product__price--discount\': data.prices.discount_amount > 0}\" itemprop=\"price\">{{data.prices.final | currency}}</span>\n                <span class=\"price__old\" ng-if=\"data.prices.discount_amount > 0\">{{data.prices.old | currency}}</span>\n                <span class=\"price__percentage\" ng-if=\"data.prices.discount_percentage > 0\">({{data.prices.discount_percentage}}% Off)</span>\n                <span class=\"product-badge preorder\" ng-if=\"data.preorder || data.preorderSelected\">Pre-Order</span>\n            </div>\n            \n            <a class=\"product__reviews-link\" data-track-event=\"Click Reviews\" ng-show=\"data.reviews\" ng-href=\"#product__reviews--scrolljs\" offset=\"145\" du-smooth-scroll du-scrollspy>{{ data.reviews.length }} Review<span ng-if=\"data.reviews.length > 1\">s</span></a>\n\n            <div class=\"product__desktop-buybar\">\n                <div class=\"product__actions\">\n                    <colorselector product=\"data\"></colorselector>\n                    <buybar product=\"data\"></buybar>\n                </div>\n                \n                <a href class=\"reviews__add\" ng-click=\"showReferralModal(data.id)\">Refer &amp; Get ${{referrals.settings.vanillaAdvocateReward}}</a>\n\n                <ul class=\"product__stats\">\n                    <li ng-repeat=\"statistic in data.vitalStatistics\" ng-bind-html=\"::statistic.value\" ng-if=\"::statistic.value.length\"></li>\n                    <li ng-if=\"data.madeInSf\">Made in San Francisco.</li>\n                    <li ng-if=\"data.isFinalSale\" class=\'final-sale\'>Final sale, no returns or exchanges</li>\n                </ul>\n\n                <!-- tweak suggestion for product -->\n                <tweaksuggestion product=\"data\"></tweaksuggestion>\n\n            </div>\n            \n\n        </div>        \n    </div>\n    <div class=\"product__body\">\n        <!-- Breadcrumbs -->\n        <div class=\"product__breadcrumbs-wrapper\" ng-include=\"\'angular/app/product/breadcrumbs.html\'\"></div>\n    \n        <gallery media=\"data.media\"></gallery>\n\n        <div class=\"product__color-selector\" ng-show=\"data.colorProducts\">\n            <h4>Colors</h4>\n            <colorselector product=\"data\"></colorselector>\n        </div>\n\n        \n        <div class=\"product__fit\" ng-show=\"data.fit.length\">\n            <h3>Make, Care, &amp; Fit</h3>\n            <div class=\"content\" ng-bind-html=\"data.fit | sanitize\" compile recompile=\"data.fit\"></div>\n        </div>\n\n        <div id=\"video\" class=\"product__story-video\" anchor-scroll>\n            <div ng-repeat=\"item in data.videos track by $index\">\n                <bb-video name=\"{{item.name}}\" description=\"{{item.description}}\" url=\"{{item.url}}\" play=\"item.play\"></bb-video>\n            </div>\n        </div>\n        \n        <div class=\"product__story\">\n            <h3 itemprop=\"description\">{{data.seoFriendlyTagline}}</h3>\n            <div class=\"content\" ng-bind-html=\"data.story | sanitize\"></div>\n        </div>\n\n        <div id=\"product__reviews--scrolljs\" class=\"product__reviews\" ng-show=\"data.reviews\">\n            <h3>Reviews</h3>\n            <ul>\n                <li class=\"review-{{$index}}\" dir-paginate=\"review in data.reviews | itemsPerPage: 2\">\n                    <div itemprop=\"review\" itemscope itemtype=\"https://schema.org/Review\">\n                        <div class=\"review__header\">\n                            <div itemprop=\"author\" itemscope itemtype=\"http://schema.org/Person\" class=\"left\">\n                                <div itemprop=\"name\" class=\"review__reviewer\">{{review.nickname}}</div>\n                                <div class=\"review__location\">{{review.title}}</div>\n                            </div>\n                            <div class=\"right\">\n                                <div itemprop=\"datePublished\" class=\"review__date\">{{review.createdAt}}</div>\n                            </div>\n                        </div>\n                        <div class=\"review__text\" itemprop=\"reviewBody\">{{review.detail}}</div>\n                    </div>\n                </li>\n            </ul>\n            <dir-pagination-controls class=\"reviews__pagination ng-isolate-scope\"></dir-pagination-controls>\n        </div>\n        \n        <div class=\"product-designers product-designers--long\" ng-include=\"\'/angular/app/thinktank/designers.html\'\" ng-if=\"data.designers.length > 0\"></div>\n\n        <div class=\"product__questions\">\n            <p>Questions? If there\'s anything else you want to know about this product, please <a href ng-click=\"showQuestionsModal()\" data-track-event=\"Click Ask a Question\">contact us</a>.</p>\n        </div>\n\n        <nav class=\"tabs\" id=\"comments--scrolljs\">\n            <button ng-click=\"scrollToSection(\'related\')\" ng-class=\"{ \'active\' : activeTab == \'related\' }\">Related Products</button>\n            <button ng-click=\"scrollToSection(\'comments\')\" ng-class=\"{ \'active\' : activeTab == \'comments\' }\">Comments</button>\n        </nav>\n\n        <div class=\"product-comments\" ng-show=\"activeTab == \'comments\'\">\n            <comments-thread highlights=\"commentHighligts\" thread-id=\"\'product-\'+data.id\" customer=\"customer.data\"></comments-thread>\n        </div>\n\n        <product-gallery class=\"related__products\" collection=\"relatedProducts\" ng-show=\"relatedProducts.length && activeTab == \'related\'\" in-stock=\"true\" limit=\"12\"></product-gallery>\n\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/referrals/advocate.html", "<banner-message type=\"referralAdvocate\"></banner-message>\n<div class=\"category\">\n    <div class=\"category__intro\">\n        <div class=\"intro__content\">\n            <div class=\"branding\" ng-switch on=\"collectionLogo\">\n                <img class=\"logo\" ng-src=\"{{::data.logo}}\" alt=\"\" ng-switch-when=\"true\">\n                <h1 ng-switch-default>SHOP OUR MOST POPULAR DESIGNS</h1>\n            </div>\n        </div>\n\n        <img ng-src=\"{{::data.image}}\" alt=\"{{::data.name}}\" class=\"category__image\">\n                \n        <div class=\"category__imageoverlay\"></div>\n\n\n    </div>\n\n    <filter-sorter data=\"data\" filter-sorters=\"filterSorter\" ng-show=\"::data.products\"></filter-sorter>\n\n    <section class=\"category__products grid-container\">\n        <product-card\n            class=\"category__product grid-item\"\n            product=\"product\"\n            category=\"data.filteredProducts\"\n            index=\"{{$index}}\"\n            is-think-tank-category=\"data.isThinkTankCategory\"\n            ng-repeat=\"product in data.filteredProducts track by product.id\"\n            ></product-card>\n\n            <p class=\"category-products__emptyresults\" ng-if=\"data.filteredProducts.length == 0\">\n                Sorry, the filters you selected didn\'t match any products.\n            </p>\n\n    </section>\n\n\n</div>\n");
  $templateCache.put("/angular/app/referrals/landing.html", "<div class=\"referrals-landing__main\">\n    <div class=\"referrals-vanilla\">\n        <referrals-form product-id=\'productId\' email=\'email\'></referrals-form>\n	</div>\n</div>");
  $templateCache.put("/angular/app/referrals/landing-return.html", "<banner-message type=\"referralFriend\"></banner-message>\n<div class=\"category\">\n    <div class=\"category__intro\">\n\n        <div class=\"intro__content\">\n            <div class=\"branding\" ng-switch on=\"collectionLogo\">\n                <img class=\"logo\" ng-src=\"{{::data.logo}}\" alt=\"\" ng-switch-when=\"true\">\n                <h1 ng-switch-default>Welcome To Betabrand</h1>\n            </div>\n        </div>\n\n                <img ng-src=\"{{::data.image}}\" alt=\"{{::data.name}}\" class=\"category__image\">\n                 <div class=\"category__imageoverlay\"></div>\n\n    </div>\n\n\n    <filter-sorter data=\"data\" filter-sorters=\"filterSorter\" ng-show=\"::data.products\"></filter-sorter>\n\n    <section class=\"category__products grid-container\">\n        <product-card\n            class=\"category__product grid-item\"\n            product=\"product\"\n            category=\"data.filteredProducts\"\n            index=\"{{$index}}\"\n            is-think-tank-category=\"data.isThinkTankCategory\"\n            ng-repeat=\"product in data.filteredProducts track by product.id\"\n            ></product-card>\n\n            <p class=\"category-products__emptyresults\" ng-if=\"data.filteredProducts.length == 0\">\n                Sorry, the filters you selected didn\'t match any products.\n            </p>\n\n    </section>\n\n</div>\n");
  $templateCache.put("/angular/app/referrals/referrals-form.html", "<div class=\"referrals-form\">\n	<h1>{{settings.shareContainerTitle}}</h1>\n	<p>{{settings.shareContainerDescription}}</p>\n\n	<form name=\"referralForm\" novalidate>\n		<div class=\"referrals-form__line\">\n			<div class=\"referrals-form__input-wrapper advocate-email\">\n				<label>Your Email: *</label>\n				<input type=\"email\" name=\"advocateEmail\" ng-model=\"advocateEmail\" placeholder=\"myEmail@mail.com\" ng-blur=\"generateLink()\" ng-pattern=\"emailCheck\" ng-disabled=\"customer.data.loggedIn\" class=\"referrals-form__advocate-email\" ng-class=\"{\'referrals-form__advocate-email--error\' : referralForm.advocateEmail.$error.email, \'referrals-form__advocate-email--disabled\':customer.data.loggedIn}\" required>\n				<span class=\"referrals-form__error-message\" ng-show=\"referralForm.advocateEmail.$invalid && referralForm.advocateEmail.$dirty\">Email address must contain @ symbol.</span>    \n				<span class=\"referrals-form__error-message\" ng-show=\"referralForm.advocateEmail.$error.required && referralForm.$submitted\">Email address is required.</span>   \n				<span class=\"referrals-form__error-message\" ng-show=\"!linkGenerated && clickedSocial\">Email address is required for sharing.</span>                 \n			</div>\n			<div class=\"referrals-form__input-wrapper friend-email\">\n				<label>Friend\'s Email: *</label>\n				<input type=\"email\" name=\"friendEmail\" placeholder=\"friend@email.com\" ng-model=\"friendEmail\" ng-pattern=\"emailCheck\" ng-class=\"{\'referrals-form__friend-email--error\' : referralForm.friendEmail.$error.email || invalidEmail }\" ng-blur=\"validateEmail()\" required>\n\n				<span class=\"referrals-form__error-message\" ng-show=\"friendEmail && invalidEmail && advocateEmail!=friendEmail\">Offer is only valid for new customers.</span>\n				<span class=\"referrals-form__error-message\" ng-show=\"friendEmail && referralForm.friendEmail.$invalid && referralForm.friendEmail.$dirty\">Email address must contain @ symbol.</span>\n				<span class=\"referrals-form__error-message\" ng-show=\"referralForm.friendEmail.$error.required && referralForm.$submitted\">Friend\'s email address is required.</span> \n				<span class=\"referrals-form__error-message\" ng-show=\"friendEmail && advocateEmail==friendEmail\">You can not refer yourself.</span> \n			</div>	            		\n		</div>\n\n		<label>Message:</label>\n		<textarea class=\"referrals-form__message-box\" name=\"referralMessage\" ng-class=\"{\'referrals-form__message-box--error\' : referralForm.referralMessage.$error.required && referralForm.referralMessage.$touched}\" ng-model=\"settings.emailText\" required></textarea>\n\n		<span class=\"referrals-form__error-message\" ng-show=\"referralForm.referralMessage.$error.required && referralForm.referralMessage.$touched\">Message is required for email sharing.</span>  \n\n		<div ng-hide=\"true\" class=\"referrals-form__reminder\">\n			<input type=\"checkbox\" name=\"vehicle\" value=\"Car\" checked> <span class=\"reminder-text\">Send my friend a reminder email in 3 days</span>\n		</div>\n		\n		<div class=\"referrals-form__reCaptcha\" vc-recaptcha theme=\"light\" on-success=\"setCaptchaResponse(response)\" key=\"reCatpchaKey\">			\n		</div>\n		<span class=\"referrals-form__successMsg\" ng-show=\"referSuccess\">Email successfully sent.</span>\n		<span class=\"referrals-form__reCaptcha--error\" ng-show=\"errorResponse\">{{errorResponse}}</span>\n		<button class=\"referrals-form__submit-btn\" type=\"submit\" ng-click=\"referralShare()\"><span class=\"referrals-form__submit-loading-icon fa fa-refresh fa-spin\" ng-class=\"{\'fa-spin\' : submitClicked , \'referrals-form__submit-loading-icon--show\' : submitClicked}\"></span><span class=\"referrals-form__submit-text\">SEND EMAIL</span></button>\n	</form>\n	<div class=\"or-text\">\n		<span>Or share with:</span>\n	</div>    \n	<div class=\"referrals-share-alt\">\n		<div class=\"referrals-share-alt__link\">\n			<label>Link: <span class=\"referrals-share-alt__link-message\" ng-show=\"showCopyMessage\">Copied link to clipboard</span></label>\n			<i class=\"fa fa-paperclip referrals-share-alt__paperclip\" clip-copy=\"url\" ng-show=\"url\"></i>\n			<input class=\"referrals-share-alt__share-link\" type=\"text\" ng-model=\"url\" clip-copy=\"url\" ng-click=\"showCopiedMessage()\" />\n		</div>\n\n		<div class=\"referrals-share-alt__social-media\" ng-click=\"clickSocial()\">\n			<facebook-share class=\"refer__facebook\" valid=\"linkGenerated\" callback-success=\'fbShareSuccess\' url=\"{{url}}{{referrals.settings.fbUtmCodes}}\" image=\"{{referrals.settings.shareImage}}\" description=\"{{referrals.settings.facebookDescription}}\" caption=\"{{referrals.settings.facebookCaption}}\" name=\"{{referrals.settings.facebookName}}\">\n				<i class=\"betabrand-facebook\"></i><span>Facebook</span>\n			</facebook-share> \n\n			<twitter-share class=\"refer__twitter\" url=\"{{url}}{{referrals.settings.twUtmCodes}}\" valid=\"linkGenerated\" text=\'{{referrals.settings.twitterText}}\' callback-success=\'twitterShareSuccess\'>\n				<i class=\"betabrand-twitter\"></i><span>Twitter</span>\n			</twitter-share>\n\n		</div>              \n	</div>\n	<div class=\"terms\"><a ng-href=\"/referral-program-terms\" target=\"_blank\">Terms</a></div>\n</div>\n");
  $templateCache.put("/angular/app/returns/returns.html", "<div class=\"cms\">\n    <section class=\"section returns\">\n        <div class=\"inner\">\n            <h1>Returns &amp; Exchanges</h1>\n\n            <div ng-if=\"returnData.url\">\n                <iframe class=\"returns__iframe\" frameborder=\"0\" ng-src=\"{{returnData.url}}\"></iframe>\n            </div>\n\n            <div class=\"returns__modules\">\n            \n                <div class=\"returns__module\">\n                    <h3>Return/Exchange Policy</h3>\n                    <ul>\n                        <li>We offer free return shipping for domestic customers (see below for return label instructions).</li>\n                        <li>We have a 60-day return/exchange policy (from the day you received your product).</li>\n                        <li>Items can be returned for store credit or a refund to the purchasing payment method.</li>\n                        <li>Exchanges can be made for the same item in a different size only.</li>\n                        <li>Item(s) must be unworn and unwashed â€” and returned with tags still attached.</li>\n                        <li>Please note that exchanges can take up to two weeks to process. (We\'ll do our best to expedite this process.)</li>\n                        <li>We do not accept returns on items bought from the Mega Deals collection.</li>\n                    </ul>                \n                </div>\n\n                <div ng-if=\"!returnData.url && !customerService.data.loggedIn\" class=\"returns__module return__content\">\n                    <form ng-submit=\"startRMA()\">\n                        <h3>Start a return</h3>\n                        <div class=\"form-row\">\n                            <label for=\"returnIncrementId\">Order ID:</label>\n                            <div class=\"input-pre-container\">\n                                <span class=\"input-pre\">XXXXXX &mdash;</span>\n                                <input id=\'returnIncrementId\' name=\"returnIncrementId\" type=\'text\' ng-model=\"returnData.incrementId\" required placeholder=\"e.g. 100000000\">\n                            </div>\n                        </div>\n                        <div class=\"form-row\">\n                            <label for=\"returnEmail\">Email:</label>\n                            <input id=\'returnEmail\' name=\"returnEmail\" type=\'text\' ng-model=\'returnData.customerEmail\' required>\n                        </div>\n                        <div class=\"form-row\">\n                            <button type=\'submit\' class=\"button primary auto blue\">Start Return</button>\n                        </div>\n                        \n                    </form>\n                </div>\n\n                <div ng-if=\"!returnData.url && customerService.data.loggedIn\" class=\"returns__module return__content\">\n                    <h3>Need to return an item?</h3>\n                    <p>Select one of your orders and then start the return process there.</p>\n                    <a href=\"/account/orders/\" class=\"button blue auto\">View Your Orders</a>\n                </div>\n\n                <div class=\"returns__module\">\n                    <h3>Return Address</h3>\n                    <p>Betabrand Returns/Exchanges\n                        <br> 3435 Cesar Chavez St. #225\n                        <br> San Francisco, CA 94110</p>\n                    <h3>In San Francisco?</h3>\n                    <p>So are we. Feel free to come by our store (780 Valencia St.) with your return or exchange, and weâ€™ll take care of you. </p>\n                    \n                </div>\n                <div class=\"returns__module\">\n                    <h3>Questions?</h3>\n                    <p>If you have any questions, by all means, write us. We like mail. Our address: <a href=\"mailto:info@betabrand.com\">info@betabrand.com</a></p>\n                    <h3>Call Us</h3>\n                    <p>Not a fan of email? Give us a call:\n                        <br> Domestic: <a href=\"tel:(800)694-9491\">(800) 694-9491</a> | International: <a href=\"tel:(415)400-5995\">(415) 400-5995</a> | Retail Store: <a href=\"tel:(415)692-7433\">(415) 692-7433</a>\n                        <br>\n                        <br> Customer service hours: Monday - Friday, 8:00 a.m. - 6:00 p.m. PST\n                    </p>\n                    \n                </div>\n    \n\n            </div>\n        </div>\n    </section>\n</div>\n");
  $templateCache.put("/angular/app/search/search.html", "<search class=\"search\" itemprop=\"potentialAction\" itemtype=\"http://schema.org/SearchAction\" itemscope>\n    <meta itemprop=\"target\" content=\"https://query.example.com/search?q={search-term}\"/>\n	<div class=\"search__content\">\n		<div class=\"close__search\" ng-click=\"closeSearch()\"><span class=\"pe-7s-close-circle\"></span></div>\n\n		<h1 class=\"search__title\">Product Search</h1>\n\n		<form class=\"search__form\" ng-submit=\"searchSubmit($event)\">\n            <input itemprop=\"query-input\" type=\"text\" name=\"search-term\" class=\"search__input text__input--button\" ng-keyup=\"handleSearchInput($event)\" autofocus=\"true\" ng-model=\"query\"/>\n            <button class=\"button primary input__button\" type=\"submit\">Search</button>\n		</form>\n\n		<div class=\"search__count\" ng-show=\"products.length > 0 || (query.length && data)\" count=\"products.length\" ng-pluralize when=\"{\'0\':\'0 Results\', \'1\': \'1 Result\', \'other\': \'{} results\'}\"></div>\n\n		<div class=\"search__results category grid-container\">\n            <product-card\n                class=\"category__product\"\n                ng-class=\"{\'successful\' : product.successfullyFunded()}\"\n                product=\"product\"\n                index=\"{{$index}}\"\n                state=\"{{product.state}}\"\n                category=\"category\"\n                is-think-tank-category=\"products.isThinkTankCategory\"\n                ng-repeat=\"product in products | outOfStockToEnd: \'state\'\"></product-card>\n		</div>\n\n	</div>\n</search>\n");
  $templateCache.put("/angular/app/shared/spinner.html", "<img ng-if=\"showLoadingContent\" src=\"/angular/images/bb_loading_2x.gif\" alt=\"\">\n<div ng-if=\"showLoadingContent\" class=\"spinner__message\">{{loadingMessage}}</div>");
  $templateCache.put("/angular/app/thinktank/designers.html", "<h5>Designed by:</h5>\n<div ng-repeat=\"designer in data.designers\" class=\"product-designer\" id=\"designer--scrolljs\">\n	<img ng-src=\"{{designer.image ? designer.image : \'/angular/images/user/user.png\'}}\" alt=\"{{designer.name}}\">\n	<div class=\"product-designer__name\">{{designer.label || designer.name}}</div>\n	<div class=\"product-designer__bio\" ng-bind-html=\"designer.bio\"></div>\n</div>\n");
  $templateCache.put("/angular/app/thinktank/how-it-works.html", "<div class=\"how-it-works category\" ng-controller=\"HowItWorksController\">\n	<div class=\"welcome-section\">\n		<h1>Think Tank</h1>\n\n		<div class=\"image\">\n			<div class=\"jump-link\">\n				<a ng-href=\"#submit--scrolljs\" offset=\"100\" du-smooth-scroll du-scrollspy class=\"jump-link__submit\">Submit</a>\n				<a ng-href=\"#vote--scrolljs\" offset=\"100\" du-smooth-scroll du-scrollspy class=\"jump-link__vote\">Vote</a>\n				<a ng-href=\"#wear--scrolljs\" offset=\"100\" du-smooth-scroll du-scrollspy class=\"jump-link__wear\">Wear</a>\n				<a ng-href=\"#fund--scrolljs\" offset=\"100\" du-smooth-scroll du-scrollspy class=\"jump-link__fund\">Fund</a>\n			</div>			\n		</div>\n	</div>\n\n	<div class=\"submit-section section\" id=\"submit--scrolljs\">\n		<div class=\"number\"><span>1</span></div>\n		<div class=\"inner\">\n			<div class=\"submit-section__image\">\n				<img src=\"/angular/images/thinktank/think-tank-submit.png\" alt=\"\">\n			</div>\n			<div class=\"submit-section__text\">\n				<h3 class=\"section-title\">Submit your own idea</h3>\n				<p>Whether you\'re a professional designer or just have a burning idea in your head, Betabrand can help you turn it into a reality and earn you money along the way. It can be a few words on a napkin, a sketch, or a fully developed design. Take your notebook out and start sketching!</p>\n				<a href=\"/submission\" class=\"button primary\">Submit an Idea</a>\n				<div class=\"submit-section__fun-fact\">\n					<h4>More than 2000 ideas submitted</h4>\n					<p>from San Francisco, New York, Seattle, Chicago, Florida, London (UK), Aarhus (Denmark) and other exotic locations.</p>\n				</div>\n				\n			</div>\n		</div>\n	</div>\n\n	<div class=\"vote-section section\" id=\"vote--scrolljs\">\n		<div class=\"number\"><span>2</span></div>\n		<div class=\"inner\">\n			<div class=\"vote-section__image\">\n				<img src=\"/angular/images/thinktank/think-tank-vote.png\" alt=\"\">\n			</div>\n			<div class=\"vote-section__text\">\n				<h3 class=\"section-title\">Vote for your favorite design</h3>\n				<p>With new ideas being submitted every day, you\'re the one deciding which ones are the best. Vote for your favorite designs, and help decide which get turned into clothing prototypes.</p>\n				<a ng-href=\"/think-tank/vote.html\" class=\"button primary auto\">Vote Now</a>\n			</div>		\n		</div>\n	</div>\n\n	<div class=\"fund-section section\" id=\"fund--scrolljs\">\n		<div class=\"number\"><span>3</span></div>\n		<div class=\"inner\">\n			<h3 class=\"section-title\">Fund clothing prototypes</h3>\n			<p>These are the designs that got the most votes by the Betabrand community. We turned them into clothing prototypes that you can now fund. Be among the first to fund to get the biggest discount - 30%! You also get bragging rights of being the first to wear it. If enough people fund the prototype, we produce the garment and ship it to you.</p>\n			<a ng-href=\"/think-tank/crowdfunding.html\" class=\"button primary auto\">Fund Now</a>\n		</div>\n		<section class=\"category__section\">\n			<div class=\"thinktank__products category__products grid-container\">				\n				<product-card\n	                class=\"category__product\"\n	                product=\"product\"\n	                category=\"crowdfunding.products\"\n	                index=\"{{$index}}\"\n	                is-think-tank-category=\"crowdfunding.isThinkTankCategory\"\n	                ng-repeat=\"product in crowdfunding.products track by product.id\"\n	                ></product-card>\n			</div>\n		</section>\n	</div>\n\n	<div class=\"successfully-funded-section section\" id=\"wear--scrolljs\">\n		<div class=\"number\"><span>4</span></div>\n		<div class=\"inner\">\n			<h3 class=\"section-title\">Wear Successfully Funded Products</h3>\n			<p>These are the success stories that YOU determined we\'d make. All of our best sellers have gone through this process. Betabrand and the designers of ideas like the Wholester, Space Jacket, Dress Pant Yoga Pants and Monster Dress thank you for bringing these ideas to life. Let\'s build a brand together.</p>\n			<a ng-href=\"/think-tank/funded.html\" class=\"button primary auto\">Shop Now</a>\n		</div>\n		<section class=\"category__section\">\n			<div class=\"thinktank__products category__products grid-container\">\n				<product-card\n		                class=\"category__product\"\n		                product=\"product\"\n		                category=\"funded.products\"\n		                index=\"{{$index}}\"\n		                is-think-tank-category=\"funded.isThinkTankCategory\"\n		                ng-repeat=\"product in funded.products track by product.id\"\n		                ></product-card>\n		    </div>\n	    </section>\n	</div>\n</div>\n");
  $templateCache.put("/angular/app/thinktank/submission/submission-landing.html", "<!--\n	Idea: \n		Title // name\n		Short Description // short_description\n		Detailed Description // story\n		Who is the target customer?  // target_customer\n		What problem are you solving? // problem\n		Whatâ€™s our retail price? // msrp\n		Provide writing tips per step\n		Link to submission sample 						\n	Media:\n		Upload images \n		Add links to videos, other pictures, media online \n		Provide image guidelines\n	Designer:\n		Short Description \n		Profile Picture \n		Profile Preview \n		Link to social media profiles\n		Provide writing tips \n-->\n<div class=\"submission-form\" ng-switch on=\"submission.activeTab\">\n    <div class=\"submission-form__content\" ng-class=\"{\'submission-active\':submission.upperBound >= \'2\', \'submission-attempted\':submission.submissionAttempted, \'submission-completed\':submission.successMessageFinal}\">\n        <div class=\"jumbotron\">\n            <h1>Have an idea?</h1>\n        </div>\n        <div class=\"submission-form__wrapper\" ng-class=\"{\'submission-form__wrapper--full\':submission.upperBound == \'2\'}\">\n            <form name=\"submission.submissionForm\" class=\"submissionForm\" id=\"submissionForm\" offset=\"100\" novalidate ng-submit=\"submission.$valid && submission.validateForm($event)\" ng-class=\"{\'submissionForm--full\':submission.upperBound == \'2\'}\">\n                <fieldset>\n                    <div id=\"submission-1\" class=\"submission-panel\" ng-class=\"{\'submission-panel--active\':submission.upperBound == \'1\'}\">\n                        <div class=\"submission-panel--inner\">\n                            <h3 class=\"visuallyhidden\">Your Idea</h3>\n                            <p class=\"lead\">Bring your super sweet idea to life. Tell us a little bit more about what you want to make. Have questions about Betabrand\'s Think Tank? Let us show you <a href=\"/how-it-works\">how it works.</a></p>\n                            <div class=\"form-row\">\n                                <label for=\"title\">Name your product idea: <span class=\"required-text\">*Required</span></label>\n                                <input type=\"text\" name=\"name\" ng-model=\"submission.ideaName\" ng-change=\"submission.storeIdea()\" placeholder=\"Something catchy and informative\" ng-disabled=\"submission.successMessageFinal\" required>\n                                <span class=\"submission-form__error\">What should we call this wondrous design?</span>\n                            </div>\n                            <div class=\"form-row\">\n                                <label for=\"short_description\">Describe your idea in one brief sentence: <span class=\"required-text\">*Required</span></label>\n                                <input type=\"text\" name=\"short_description\" ng-model=\"submission.ideaShortDescription\" ng-change=\"submission.storeIdea()\" placeholder=\"30 words or less\" ng-disabled=\"submission.successMessageFinal\" required>\n                                <span class=\"submission-form__error\">Just 30 words or less, please.</span>\n                            </div>\n                            <div class=\"form-row\">\n                                <label for=\"story\">Write a couple short paragraphs to sell your idea to the audience! This is what will appear on your product page: <span class=\"required-text\">*Required</span></label>\n                                <trix-editor angular-trix ng-model=\"submission.ideaStory\" placeholder=\"What made you think of it? Who would want it and why? How is it so much better than what\'s already out there? What problem does it solve? What features does it have? Have fun with it!\" ng-disabled=\"submission.successMessageFinal\" ng-change=\"submission.storeIdea()\" required></trix-editor>\n                                <span class=\"submission-form__error\">Tell us the story, there\'s always a story.</span>\n                            </div>\n                            <div class=\"form-row hidden\">\n                                <label for=\"audience\">Where or when would someone wear this product? </label>\n                                <textarea class=\"submission-form__textarea--short\" name=\"ideaAudience\" ng-model=\"submission.ideaAudience\" ng-change=\"submission.storeIdea()\" placeholder=\"When traveling for business? On a night out?\" cols=\"30\" rows=\"10\" ng-disabled=\"submission.successMessageFinal\"></textarea>\n                                <span class=\"submission-form__error\">Help us figure out who your ideal customers are.</span>\n                            </div>\n                            <div class=\"form-row\">\n                                <label for=\"msrp\">What do you think a customer would pay for this product?</label>\n                                <input type=\"text\" name=\"msrp\" ng-model=\"submission.ideaMsrp\" ng-change=\"submission.storeIdea()\" placeholder=\"Enter a price range\" ng-disabled=\"submission.successMessageFinal\">\n                                <span class=\"submission-form__error\">Let us know what someone will pay for this fine product.</span>\n                            </div>\n                            <div class=\"form-row\">\n                                <label for=\"gender\">This product is intended for:</label>\n                                <div class=\"select\">\n                                    <select name=\"gender\" ng-model=\"submission.ideaGender\" ng-change=\"submission.storeIdea()\" ng-disabled=\"submission.successMessageFinal\">\n                                        <option value=\"\" disabled>Please select:</option>\n                                        <option value=\"unisex\">Unisex</option>\n                                        <option value=\"women\">Women</option>\n                                        <option value=\"men\">Men</option>\n                                    </select>\n                                    <span>{{submission.ideaGender || \'Please Select:\'}}</span>\n                                </div>\n                            </div>\n                            <div class=\"form-row\">\n                                <label for=\"fabric\">Suggested fabric / materials:</label>\n                                <input type=\"text\" name=\"fabric\" ng-model=\"submission.ideaFabric\" ng-change=\"submission.storeIdea()\" placeholder=\"ex: A stretchy, lightweight knit / Ponte Knit\" ng-disabled=\"submission.successMessageFinal\">\n                                <span class=\"submission-form__error\">Let us know what you would like this product to be made out of.</span>\n                            </div>\n                            <div class=\"form-row\">\n                                <label class=\"upload-label\">Submit Images (10 MB max)</label>\n                                <ul class=\"submission-form__upload-previews\" ng-if=\"submission.idea.media.images.length > 0\">\n                                    <li ng-repeat=\"(index,image) in submission.idea.media.images track by $index\" class=\"submission-form__upload-previews__image\"><img ng-src=\"{{image}}\" />\n                                        <button class=\"use-as-preview\" ng-click=\"submission.previewImage(index, $event)\">Use as Preview Image</button>\n                                        <button class=\"delete fa fa-close\" ng-click=\"submission.deleteImage(index, $event)\"><span class=\"visuallyhidden\">Delete this image</span></button>\n                                    </li>\n                                </ul>\n                                <div id=\"cover-upload\" ng-file-drop ng-file-select my-enter=\"submission.summonCoverUpload()\" ng-model=\"files\" class=\"submission-form__drop-box\" drag-over-class=\"dragover\" ng-multiple=\"true\" allow-dir=\"true\" accept=\"image/*,application/pdf,application/postscript\" tabindex=\"0\" ng-class=\"{\'submission-form__drop-box--disabled\':submission.successMessageFinal}\">\n                                    <div class=\"submission-form__drop-box__icons\">\n                                        <i class=\"fa fa-camera camera\"></i>\n                                        <i class=\"fa fa-file-photo-o file\"></i>\n                                        <i class=\"fa fa-folder-o folder\"></i>\n                                    </div>\n                                    <span class=\"submission-form__drop-box__drag\">Drag &amp; Drop</span>\n                                    <span class=\"submission-form__drop-box__select\">or click to select files</span>\n                                    <div ng-show=\"files\" class=\"submission-form__file-list\">\n                                        <ul>\n                                            <li ng-repeat=\"f in files\">File: {{f.name}}</li>\n                                        </ul>\n                                    </div>\n                                </div>\n                                <div ng-no-file-drop>\n                                    <!--File Drag/Drop is not supported-->\n                                    <div class=\"button\" ng-file-select ng-model=\"files\" ng-multiple=\"true\">Choose Files</div>\n                                    <ul>\n                                        <li ng-repeat=\"f in files\">{{f.name}}</li>\n                                    </ul>\n                                </div>\n                                <p class=\"submission-form__input-help\">We accept all kinds of images, but if you\'re an expert in image layout, our standard card specs are: JPGs sized to <strong>1150px x 673px</strong> at 72dpi.</p>\n                            </div>\n                            <div class=\"form-row\">\n                                <div class=\"additional-wrap\">\n                                    <label for=\"additional\">Additional information?</label>\n                                    <textarea class=\"submission-form__textarea--short\" name=\"ideaAdditional\" ng-model=\"submission.ideaAdditional\" ng-change=\"submission.storeIdea()\" placeholder=\"submission.Submitting to a contest? Have something else to share? Let us know.\" cols=\"30\" rows=\"10\" ng-disabled=\"submission.successMessageFinal\"></textarea>\n                                </div>\n                            </div>\n                            <div class=\"form-row\" ng-if=\"!submission.submissionId || submission.ideaState.toLowerCase() == \'unpublished\'\">\n                                <button class=\"button submission-form__submit-btn\" ng-click=\"submission.validateForm($event);\" ng-disabled=\"submission.successMessageFinal\"><span class=\"vote-btn__submit-loading-icon fa fa-refresh fa-spin\" ng-show=\"submission.submitting\"></span> Submit Your Awesome Idea</button>\n                                <span class=\"submission-form__error final\">Please fill in all the required fields.</span>\n                            </div>\n                            <div class=\"form-row\" ng-if=\"submission.ideaState.toLowerCase() == \'published\'\">\n                                Thanks for submitting an idea! <a href=\"/submission\">Click here</a> to submit again.\n                            </div>\n                        </div>\n                        <!-- inner -->\n                    </div>\n                    <!-- submission-panel-->\n                    <!-- <div id=\"submission-2\" class=\"submission-panel\" ng-class=\"{\'submission-panel--active\':submission.upperBound >= \'2\'}\"> -->\n                    <div id=\"submission-2\" class=\"submission-panel\" ng-class=\"{\'submission-panel--active\':submission.upperBound >= \'2\'}\">\n                        <div class=\"submission-panel--inner submission-panel--final\">\n                            <h3 class=\"submission-panel__title\">Please Tell Us a Little More</h3>\n                            <!-- a short and snappy description of you -->\n                            <div class=\"form-row\">\n                                <label for=\"designer_bio\">Add your designer bio:</label>\n                                <textarea name=\"designer_bio\" ng-model=\"customer.designerBio\" ng-change=\"submission.storeIdea()\" placeholder=\"A poor but noble Venetian...\"></textarea>\n                            </div>\n                            <!-- Profile Picture - Should have upload, but also the preview assigned to a matching email address, if one exists. -->\n                            <div class=\"form-row\">\n                                <div class=\"column__6\">\n                                    <label for=\"\">Upload Your Profile Image (10 MB max)</label>\n                                    <div ng-file-drop ng-file-select ng-model=\"profileImage\" class=\"submission-form__drop-box\" drag-over-class=\"dragover\" ng-multiple=\"false\" allow-dir=\"false\" accept=\"image/*,application/pdf,application/postscript\">\n                                        <div class=\"submission-form__drop-box__icons\">\n                                            <i class=\"fa fa-camera camera\"></i>\n                                            <i class=\"fa fa-file-photo-o file\"></i>\n                                            <i class=\"fa fa-folder-o folder\"></i>\n                                        </div>\n                                        <span class=\"submission-form__drop-box__drag\">Drag &amp; Drop</span>\n                                        <span class=\"submission-form__drop-box__select\">or click to select profile image</span>\n                                    </div>\n                                    <div ng-no-file-drop>\n                                        <!--File Drag/Drop is not supported-->\n                                        <div class=\"button\" ng-file-select ng-model=\"files\" ng-multiple=\"true\">Choose Files</div>\n                                        <ul>\n                                            <li ng-repeat=\"f in files\">{{f.name}}</li>\n                                        </ul>\n                                    </div>\n                                </div>\n                                <div class=\"column__6\">\n                                    <div style=\"background-image: url({{customer.image}});\" class=\"submission-form__upload-previews__profile\"></div>\n                                </div>\n                            </div>\n                            <!-- end of Profile Picture -->\n                            <!-- your social media accounts -->\n                            <!-- <div class=\"form-row\">\n							<label>Want people to see your social media accounts?  Share links to your Twitter, Instagram, Facebook, or YouTube accounts.</label>\n							<label for=\"link_twitter\" class=\"visuallyhidden\">Twitter account link:</label>\n							<input type=\"text\" name=\"link_twitter\" class=\"social-link\" ng-model=\"submission.link_twitter\" ng-change=\"submission.storeIdea()\" placeholder=\"twitter.com/...\">								\n							<label for=\"link_instagram\" class=\"visuallyhidden\">Instagram account link:</label>\n							<input type=\"text\" name=\"link_instagram\" class=\"social-link\" ng-model=\"submission.link_instagram\" ng-change=\"submission.storeIdea()\" placeholder=\"instagram.com/...\">								\n							<label for=\"link_facebook\" class=\"visuallyhidden\">Facebook account link:</label>\n							<input type=\"text\" name=\"link_facebook\" class=\"social-link\" ng-model=\"submission.link_facebook\" ng-change=\"submission.storeIdea()\" placeholder=\"facebook.com/...\">								\n							<label for=\"link_youtube\" class=\"visuallyhidden\">Youtube account link:</label>\n							<input type=\"text\" name=\"link_youtube\" class=\"social-link\" ng-model=\"submission.link_youtube\" ng-change=\"submission.storeIdea()\" placeholder=\"youtube.com/...\">															\n						</div> -->\n                            <div class=\"form-row\">\n                                <!-- submission.isValid -->\n                                <button class=\"submission-form__submit-btn\" type=\"submission.submit\" ng-click=\"submission.updateProfile()\"><span class=\"vote-btn__submit-loading-icon fa fa-refresh fa-spin\" ng-show=\"submission.profileUpdating\"></span> Update Your Profile</button>\n                            </div>\n                        </div>\n                        <!-- inner -->\n                    </div>\n                    <!-- submission-panel -->\n                </fieldset>\n                <!-- end submission-form__not-ready -->\n            </form>\n	        <div class=\"submission-preview__wrapper\">\n	            <div class=\"submission-preview\" du-scrollspy=\"submissionForm\" offset=\"108\" sidebar-scroll>\n	                <!-- product card preview -->\n	                <div class=\"product-card\" product=\"cards.products[0]\" ng-class=\"{\'hidden\':submission.upperBound >= \'2\'}\">\n	                    <div class=\"product-card__image\" ng-class=\"{\'active\':submission.idea.media.preview.image}\" ng-mousedown=\"submission.repositionCover($event, \'begin\')\" ng-mousemove=\"submission.repositionCover($event, \'move\')\" ng-mouseup=\"submission.repositionCover($event, \'end\')\">\n	                        <div class=\"flex-center\">\n	                            <div class=\"button-wrapper\">\n	                                <h5 class=\"reposition-cover\">Drag to reposition cover</h5>\n	                                <button class=\"button button-secondary button-secondary--upload\" ng-click=\"submission.summonCoverUpload()\">\n	                                    <span>Upload a cover image</span>\n	                                </button>\n	                            </div>\n	                        </div>\n	                        <img src=\"/media/catalog/product/placeholder/default/default.jpg\" alt=\"\" ng-if=\"!submission.idea.media.images.length > 0\">\n	                        <img ng-src=\"{{submission.idea.media.preview.image}}\" alt=\"Idea Preview Image\" ng-if=\"submission.idea.media.preview.image\" style=\"margin-top: 0;\" id=\"cover-preview\">\n	                    </div>\n	                    <div class=\"product-card__details\">\n	                        <!-- if user has name -->\n	                        <div class=\"product-card__designer-image\" style=\"background-image: url({{customer.image}});\" ng-show=\"customer.loggedIn\"></div>\n							<small class=\"product-card__designer-name\" ng-show=\"customer.loggedIn\">By: {{customer.firstname}} {{customer.lastname }}</small>\n	                        <!-- else -->\n	                        <h4 class=\"product__name\">\n			            	<span class=\"product-card__name\" ng-if=\"submission.ideaName\">{{submission.ideaName}}</span>\n			            	<span class=\"product-card__name demo-state\" ng-if=\"!submission.ideaName\">World\'s Best Pants</span>\n				        </h4>\n	                        <p ng-if=\"submission.ideaShortDescription\">{{submission.ideaShortDescription}}</p>\n	                        <p ng-if=\"!submission.ideaShortDescription\" class=\"demo-state\">Absolutely, certifiabily the best pants in the world.</p>\n	                        <div class=\"product-card-status ng-scope\" ng-if=\"product.state !== \'crowdfunding\'\">\n	                            <h4 class=\"product-card__price\">\n				                <span class=\"product-card__price--in-stock active\" ng-class=\"{\'active\':submission.upperBound >= \'2\'}\">\n				                    <span ng-if=\"submission.ideaMsrp.length\">${{submission.ideaMsrp}}</span>\n				                    <span class=\"demo-state\" ng-if=\"!submission.ideaMsrp\">$100-120</span>\n				                </span>\n				            </h4>\n	                        </div>\n	                    </div>\n	                </div>\n	                <!-- product card preview -->\n                    <div class=\"submission-form__not-ready\" ng-show=\"customer.loggedIn && submission.ideaState.toLowerCase()!=\'published\' && submission.ideaName && submission.ideaStory\" ng-class=\"{\'hidden\':submission.upperBound >= \'2\'}\">\n    		            <p><span class=\"submission-form__not-ready__copy\"><span class=\"row\">Not ready to share your idea yet? </span>You can always </span><button class=\"submission-form__submit-btn submission-form__save-btn button-small\"  type=\"submission.submit\" ng-click=\"submission.save(true)\"><span class=\"vote-btn__submit-loading-icon fa fa-refresh fa-spin\" ng-show=\"submission.submitting\"></span> Save for later</button></p>    \n    	            </div>\n                </div>\n                \n	 \n	        </div>\n	    </div>\n        </div>\n</div>\n");
  $templateCache.put("/angular/app/thinktank/submission/submission-success-modal.html", "<div class=\"modal__content submission-success-modal\" ng-show=\"display\" ng-class=\"{closing: closing}\">\n    <div class=\"modal__close\">\n        <button ng-click=\"close()\" class=\"betabrand-close-circle\"><span class=\"visuallyhidden\">Close Modal</span></button> \n    </div>\n\n    <div class=\"submission-success-modal__content\">\n    \n        <h1>Thank you for your submission!</h1>\n\n        <p>We\'ll review it and reach out to you within 48 hours.</p>\n\n        <p>In the meantime, view other ideas in the Think Tank:</p>\n\n        <a href=\"/think-tank.html\" class=\"button blue auto\">View more Ideas</a>\n        \n    </div>\n\n    \n</div>\n<div class=\"modal__overlay\" ng-show=\"display\" ng-click=\"close()\"></div>\n");
  $templateCache.put("/angular/app/thinktank/survery-pagination.tpl.html", "<ul class=\"pagination survey\" ng-if=\"1 < pages.length\">\n    <ul class=\"progress-bar\">\n        <li class=\"progress-bar__link\" ng-repeat=\"pageNumber in pages track by $index\" ng-class=\"{ active : pagination.current >= pageNumber, disabled : pageNumber == \'...\' }\"></li>\n    </ul>\n    <div class=\"range-label\">\n       {{ pagination.current }} / {{ pagination.last }}\n    </div>\n<!--     <li ng-if=\"boundaryLinks\" ng-class=\"{ disabled : pagination.current == 1 }\">\n        <a href=\"\" ng-click=\"setCurrent(1)\">&laquo;</a>\n    </li>\n    <li ng-if=\"directionLinks\" class=\"pagination__direction\" ng-class=\"{ disabled : pagination.current == 1 }\">\n        <a href=\"\" ng-click=\"setCurrent(pagination.current - 1)\">&lsaquo;</a>\n    </li> -->\n<!--     <li ng-repeat=\"pageNumber in pages track by $index\" ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' }\">\n        <a href=\"\" ng-click=\"setCurrent(pageNumber)\">{{ pageNumber }}</a>\n    </li> -->\n\n    <li ng-if=\"directionLinks\" class=\"pagination__direction\" ng-hide=\"pagination.current == pagination.last\" ng-class=\"{ disabled : pagination.current == pagination.last }\">\n        <a href=\"\" ng-click=\"setCurrent(pagination.current + 1)\"><i class=\"fa-angle-right fa\"></i></a>\n    </li>\n    <li ng-if=\"boundaryLinks\"  ng-class=\"{ disabled : pagination.current == pagination.last }\">\n        <a href=\"\" ng-click=\"setCurrent(pagination.last)\"><i class=\"fa-angle-right fa\"></i></a>\n    </li>\n</ul>");
  $templateCache.put("/angular/app/thinktank/thinktank.html", "<div class=\"thinktank category\" ng-controller=\"ThinkTankController\" category-scrolled>\n    <div class=\"thinktank__header\"></div>\n    <div class=\"thinktank__description\">\n        <p>This is where Betabrand products are born. Vote for your favorites. Help us improve \'em.</p>\n        <p>At Betabrand, you create the future of fashion. <a ng-href ng-click=\"showHowItWorksModal()\" ng-class=\"{\'ng-hide\':isMobile}\">How does this work?</a></p>        \n    </div>\n\n    <filter-sorter data=\"data\" filter-sorters=\"filterSorter\" ng-show=\"::data.products\"></filter-sorter>\n    \n    \n    <section class=\"category__products grid-container\">\n        <div class=\"product-card__submit grid-item\" ng-if=\"data.id==67\">\n            <div class=\"product__pad\">\n                <submit-idea></submit-idea>\n            </div>\n        </div>\n        <product-card \n            class=\"category__product grid-item\" \n            product=\"::product\" \n            category=\"::data.filteredProducts\" \n            index=\"{{::$index}}\" \n            filters=\"{{::product.filterClasses}}\" \n            position=\"{{::product.position}}\" \n            is-think-tank-category=\"::data.isThinkTankCategory\" \n            ng-repeat=\"product in data.filteredProducts  | limitTo : revealCount track by product.id\"></product-card>\n            \n        <p class=\"category-products__emptyresults\" ng-if=\"data.filteredProducts.length == 0\">\n            Sorry, the filters you selected didn\'t match any products.\n        </p>\n    </section>\n\n    <span class=\"category__products--loading\">\n        <div class=\"spinner\" ng-if=\"revealCount < data.filteredProducts.length\">\n            <div class=\"bounce1\"></div>\n            <div class=\"bounce2\"></div>\n            <div class=\"bounce3\"></div>\n        </div>\n    </span>\n</div>\n");
  $templateCache.put("/angular/app/thinktank/vote-button.html", "<button class=\"vote-btn\" ng-disabled=\"::customer.data.votedProducts[product.id]\" ng-click=\"voteButtonClick()\" ng-class=\"::{\'vote-btn--success\' : customer.data.votedProducts[product.id], \'submitClicked\' : submitClicked}\" aria-live=\"assertive\">\n	<span class=\"vote-btn__submit-loading-icon fa fa-refresh fa-spin\" class=\"vote-btn__submit-loading-icon--show\"><span class=\"visuallyhidden\">Vote in progress</span></span>\n	<span class=\"vote-btn__submit-text\" ng-class=\"::{\'vote-btn__submit-text--success\' : customer.data.votedProducts[product.id]}\" ng-if=\"::!buttonTextFollow.bts\">\n		<span class=\"vote-btn__submit-text--voted\">Voted</span>\n		<span class=\"vote-btn__submit-text--vote\">Vote</span>\n		<span class=\"visuallyhidden\"> for {{::product.name}}\n	</span>\n	<span class=\"vote-btn__submit-text\" ng-class=\"::{\'vote-btn__submit-text--success\' : customer.data.votedProducts[product.id]}\" ng-if=\"::buttonTextFollow.bts\">{{::!customer.data.votedProducts[product.id] ? buttonTextFollow.bts : buttonTextFollow.btd}}</span>\n</button>\n");
  $templateCache.put("/angular/app/thinktank/voting-page.html", "<div itemscope itemtype=\"http://schema.org/Product\" class=\"thinktank-idea\" ng-controller=\"VotingPageController\">\n	<div class=\"page-nav\" ng-class=\"{\'page-nav--sticky\' : scrollPass }\">\n		<div class=\"inner\">\n			<div class=\"links\">\n				<ul>\n					<li ng-href=\"#story--scrolljs\" offset=\"170\" du-smooth-scroll du-scrollspy>Story</li>\n					<li ng-href=\"#comments--scrolljs\" offset=\"180\" du-smooth-scroll du-scrollspy>Comments ({{data.commentsCount.count}})</li>\n				</ul>					\n			</div>\n			<div class=\"vote-again\">\n                <vote-button product=\"data\"></vote-button>\n            </div>\n		</div>\n	</div>\n	<div class=\"thinktank-idea-inner\">\n        <!-- Breadcrumbs -->\n        <div class=\"product__breadcrumbs-wrapper\" ng-include=\"\'angular/app/product/breadcrumbs.html\'\"></div>\n\n		<div class=\"top-section\">\n	        <meta itemprop=\"itemCondition\" content=\"http://schema.org/NewCondition\"/>\n	        <meta itemprop=\"sku\" content=\"{{data.sku}}\"/>\n\n            <div class=\"top-section__inner\">\n				<div class=\"top-section__sidebar\">\n					<div class=\"top-section__title\">\n						<h1 itemprop=\"name\" id=\"name\" class=\"top-section__name\">{{ data.name }}</h1>\n						<h2 itemprop=\"description\" class=\"top-section__description\">{{ data.seoFriendlyTagline }}</h2>\n						<div class=\"top-section__sharing\" ng-class=\"{\'top-section__sharing--open\' : openShare}\">\n							<div class=\"sharing-methods\">\n								<a facebook class=\"facebookShare\" data-title=\'{{ data.name }}\' data-picture-url=\'{{ data.media[0].url }}\' data-url=\'{{ data.canonicalUrl }}\' data-shares=\'shares\'>{{ shares }}</a>\n								<a twitter class=\"twitterShare\" data-lang=\"en\" data-count=\'horizontal\' data-url=\'{{ data.canonicalUrl }}\' data-via=\'Betabrand\' data-size=\"medium\" data-text=\'{{ data.name }}\' ></a>\n								<div pintrest class=\"pinterestShare\" data-href=\'{{ data.canonicalUrl }}\' data-description=\'{{ data.name }}\' data-img=\'{{ data.media[0].url }}\'></div>				\n							</div>\n						</div>\n\n\n					</div>\n					<div class=\"stats\">\n						<div class=\"stats__votes\">\n							<span id=\"vote-count-{{::data.id}}\" class=\"value\">{{ data.thinktankCounts.voting.count | number:0 }}</span>\n							<span class=\"unit\">Votes</span>\n						</div>\n						<div class=\"stats__comments\">\n							<a ng-href=\"#comments--scrolljs\" offset=\"180\" du-smooth-scroll du-scrollspy>\n								<span class=\"value\">{{data.commentsCount.count}}</span>\n								<span class=\"unit\">Comments</span>\n							</a>\n						</div>\n					</div>\n					\n					<div class=\"product-designers product-designers--short\" ng-include=\"\'/angular/app/thinktank/designers.html\'\" ng-if=\"data.designers.length > 0\"></div>\n	                \n	                <vote-button product=\"data\"></vote-button>\n					\n					<div class=\"top-section__how-it-works\">\n	                    <a ng-click=\"showHowItWorksModal()\">How does this work?</a>\n	                </div>	\n				</div>	\n\n				<img class=\"top-section__image\" ng-src=\"{{ data.media[0].url }}\" alt=\"{{ data.media[0].label }}\">	\n\n				<div class=\"top-section__mobile-detail\">\n					<p class=\"top-section__mobile-description\">{{ data.shortDescription }}</p>\n					<div class=\"stats\">\n						<div class=\"stats__votes\">\n							<span class=\"value\">{{ data.thinktankCounts.voting.count | number:0 }}</span>\n							<span class=\"unit\">Votes</span>\n						</div>\n						<div class=\"stats__comments\">\n							<a ng-href=\"#comments--scrolljs\" offset=\"180\" du-smooth-scroll du-scrollspy>\n								<span class=\"value\">{{data.commentsCount.count}}</span>\n								<span class=\"unit\">Comments</span>\n							</a>\n						</div>\n					</div>\n\n				</div>	\n			</div>\n		</div>\n\n		<div class=\"story\" id=\"story--scrolljs\">\n			<div class=\"row\">\n				<div class=\"story__main\">\n					<h3 class=\"story-text__title\" ng-bind-html=\"data.shortDescription\"></h3>\n					<div class=\"story__text\" ng-bind-html=\"data.story | sanitize\" compile></div>						\n				</div>		\n			</div>\n\n			<div id=\"video\" class=\"story__gallery\" anchor-scroll ng-if=\"data.videos.length > 0\">\n                <div class=\"story__gallery__image\" ng-repeat=\"item in data.videos track by $index\">\n                    <bb-video name=\"{{item.name}}\" description=\"{{item.description}}\" url=\"{{item.url}}\" play=\"item.play\"></bb-video>\n				</div>\n			</div>\n		        		\n			<div class=\"story__gallery\" ng-repeat=\"image in data.media track by $index\" ng-if=\"$index > 0\">\n				<img itemprop=\"image\" class=\"story__gallery__image\" ng-src=\"{{ image.url }}\" alt=\"{{ image.label }}\" ng-if=\"image.type == \'image\'\">\n				<div class=\"story__gallery__description\" ng-show=\"image.label != \'\' \" ng-if=\"image.type == \'image\'\">\n					<p>{{ image.label }}</p>\n		        	</div>\n		        </div>\n\n			<div class=\"story__pull-quote\" ng-if=\"data.description\">\n				<h4>{{ data.description }}</h4>\n			</div>\n\n		</div>\n\n		<div class=\"product-designers product-designers--long\" ng-include=\"\'/angular/app/thinktank/designers.html\'\" ng-if=\"data.designers.length > 0\"></div>\n\n		<div class=\"product-comments\" id=\"comments--scrolljs\">\n	        <comments-thread highlights=\"commentHighlights\" thread-id=\"\'product-\'+data.id\" customer=\"customer.data\"></comments-thread>\n	    </div>\n    </div>\n</div>\n");
  $templateCache.put("/angular/app/tooltip/tooltip.html", "<a class=\"titip-top\">\n	<i class=\"{{icon}}\" ng-show=\"icon\"></i>{{label}} \n	<div class=\"titip-content\" ng-transclude></div>\n</a>");
  $templateCache.put("/angular/app/tweaksuggestion/tweaksuggestion.html", "<div class=\"tweak-suggestion--set\">\n	<button type=\"button\" class=\"button button-secondary tweak-suggestion--trigger\" ng-click=\"activateTweaksuggestion($event)\" data-id=\"{{vm.product.id}}\" ng-class=\"{\'active\': vm.activatedState && !vm.submittedState, \'submitted\': vm.submittedState}\" ng-disabled=\"vm.submittedState\">\n		<span class=\"inactive-text\">Suggest a tweak<span class=\"visuallyhidden\"> for {{vm.product.name}}</span></span>\n		<span class=\"active-text\">Send Suggestion<span class=\"visuallyhidden\"> for {{vm.product.name}}</span></span>\n		<span class=\"disabled-text\">Thanks!</span>\n	</button>\n	<div class=\"tweak-suggestion\">\n		<textarea id=\"tweak-suggestion-content\" my-enter=\"submitTweaksuggestion($event)\" my-escape=\"refocusTweaksuggestion()\" placeholder=\"How would you improve this product?\"></textarea>\n	</div>\n</div>\n");
}]);
BetabrandApp.directive('dynFbCommentBox', ['$facebook', function($facebook) {
  function createHTML(href, numposts, colorscheme, width) {
    return '<div class="fb-comments" ' + 'data-href="' + href + '" ' + 'data-numposts="' + numposts + '" ' + 'data-colorsheme="' + colorscheme + '" ' + 'data-width="' + width + '">' + '</div>';
  }
  return {
    restrict: 'A',
    scope: {},
    link: function postLink(scope, elem, attrs) {
      attrs.$observe('pageHref', function(newValue) {
        var href = newValue;
        var numposts = attrs.numposts || 5;
        var colorscheme = attrs.colorscheme || 'light';
        var width = attrs.width || '100%';
        elem.html(createHTML(href, numposts, colorscheme, width));
        $facebook.parse(elem[0]);
      });
    }
  };
}]);
BetabrandApp.directive('fbCommentCount', ['$facebook', function($facebook) {
  function createHTML(href) {
    return '<span class="fb-comments-count" ' + 'data-href="' + href + '" ' + '</span>';
  }
  return {
    restrict: 'A',
    scope: {},
    link: function postLink(scope, elem, attrs) {
      attrs.$observe('pageHref', function(newValue) {
        var href = newValue;
        elem.html(createHTML(href));
        $facebook.parse(elem[0]);
      });
    }
  };
}]);
BetabrandApp.controller('HowItWorksController', ['$scope', 'ThinkTankService', 'CategoryService', 'ModalService', 'PageService', 'ProductService', function HowItWorksController($scope, ThinkTankService, CategoryService, ModalService, PageService, ProductService) {
  $scope.showIdeaModal = function() {
    ModalService.showModal({
      templateUrl: "/angular/app/modal/submit-idea/idea-modal.html",
      controller: "IdeaModalController"
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
  ThinkTankService.getConfig().then(function(config) {
    $scope.data = config
    return CategoryService.getCategory(69)
  }).then(function(data) {
    $scope.crowdfunding = data
    return CategoryService.getCategory(80)
  }).then(function(data) {
    $scope.funded = data
    return ProductService.getProductsForCategoryId(69, 6)
  }).then(function(data) {
    $scope.crowdfunding.products = data
    return ProductService.getProductsForCategoryId(80, 6)
  }).then(function(data) {
    $scope.funded.products = data
    $scope.$emit('viewLoaded')
  })
  PageService.setMicrodataItemType('QAPage')
}])
BetabrandApp.directive('sidebarScroll', ['$window', '$rootScope', '$timeout', function($window, $rootScope, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs, controller) {
      scope.frameResize = function() {
        var body = document.body,
          html = document.documentElement,
          footerOffset = angular.element(document.querySelector('#footer'))[0].getBoundingClientRect().top
        if ((footerOffset < (elm[0].offsetHeight + 145)) && (window.scrollY > 0)) {
          var totalOffset = ((elm[0].offsetHeight + 145) - footerOffset) * -1
          elm.css({
            'margin-top': totalOffset + 'px'
          })
        } else {
          elm.css({
            'margin-top': '0'
          })
        }
      }
      scope.cleanUp = function() {
        angular.element($window).off('scroll resize')
      }
      angular.element($window).on('scroll resize', scope.frameResize)
      $timeout(function() {
        angular.element($window).triggerHandler('scroll');
      }, 0);
    }
  }
}])
angular.module('BetabrandApp').controller('SubmissionLandingController', SubmissionLandingController)
SubmissionLandingController.$inject = ['$scope', '$document', '$timeout', '$upload', '$q', '$log', '$http', 'CustomerService', 'TrackingService', 'ThinkTankService', 'CategoryService', 'ModalService', 'PageService', 'ProductService', '$routeParams', '_', '$window', '$location']

function SubmissionLandingController($scope, $document, $timeout, $upload, $q, $log, $http, CustomerService, TrackingService, ThinkTankService, CategoryService, ModalService, PageService, ProductService, $routeParams, _, $window, $location) {
  var vm = this
  vm.ideaPhaseOne = 'New Idea Customer Views'
  vm.activeTab = (vm.submissionId) ? 3 : 1
  vm.upperBound = 1
  vm.idea = {
    type: 'ideaForm',
    name: 'name',
    shortDescription: '',
    story: '',
    occasion: '',
    fabric: '',
    msrp: '',
    gender: '',
    additional: '',
    thumbnail: '',
    media: {
      preview: {
        image: "",
        offset: 0
      },
      images: [],
      video: [],
      links: []
    },
    isValid: false
  }
  vm.coverImageIndex = 0
  vm.repositionCoverActive = false
  vm.initialY = ''
  vm.initialPreview = ''
  vm.submissionAttempted = false
  vm.profileUpdating = false
  vm.submissionId = $routeParams.id
  vm.refreshUserData = function() {
    CustomerService.getData().then(function(data) {
      $scope.customer = data
    })
  }
  $scope.$watch(function() {
    return CustomerService.getData()
  }, function() {
    vm.refreshUserData()
  })
  $timeout(function() {
    angular.element($window).triggerHandler('scroll')
  }, 0)
  vm.setPanel = function(tabId) {
    $log.debug('vm.submissionForm.$valid', vm.submissionForm.$valid)
    if (vm.submissionForm.$valid) {
      var duration = 500
      var offset = 108
      var matchingPanel = angular.element(document.getElementById('submissionForm'))
      $document.scrollToElement(matchingPanel, offset, duration)
      vm.upperBound = (tabId >= vm.activeTab) ? tabId : vm.activeTab
      vm.activeTab = tabId
      $log.debug('Run setPanel', tabId)
      var tabs = document.getElementsByClassName('submission-panel')
      $log.debug(tabs[tabId - 1].offsetTop)
      var elm = tabs[tabId - 1]
    } else {
      $log.debug('is NOT valid')
    }
  }
  vm.filePreview = function(e) {
    $log.debug('run file preview', e)
  }
  vm.validateForm = function(e) {
    var loggedIn = CustomerService.data.loggedIn
    var hasBio = CustomerService.data.designerBio && CustomerService.data.image
    vm.submissionAttempted = true
    $log.debug('validateForm', e)
    e.preventDefault()
    vm.submitted = true
    $log.debug('$scope.submissionForm', $scope.submissionForm)
    $log.debug('Error $scope.submissionForm')
    $log.debug('CustomerService.data', CustomerService.data)
    if (!loggedIn) {
      vm.submitting = true
      $log.debug('not logged in')
      CustomerService.showLoginModal({
        source: "idea"
      }).then(function(loggedIn) {
        if (loggedIn && hasBio) {
          vm.refreshUserData()
          $log.debug('no data designerBio or Image')
          _submitIdea()
        } else if (loggedIn) {
          $log.debug('is loggedIn')
          vm.refreshUserData()
          vm.setPanel(2)
          _submitIdea()
        } else {
          $log.debug('is not loggedIn')
          vm.submitting = false
        }
      }, function() {
        vm.submitting = false
      })
    } else if (loggedIn && !hasBio) {
      $log.debug('Logged in but no bio or image')
      vm.setPanel(2)
      vm.ideaPublished = true
      _submitIdea()
    } else {
      $log.debug('Logged in')
      $log.debug('Idea Submit: already logged in')
      vm.ideaPublish = true
      vm.ideaPublished = true
      _submitIdea()
    }
  }
  vm.errorMessage = false
  vm.successMessage = false
  vm.summonCoverUpload = function() {
    $timeout(function() {
      angular.element(document.getElementById('cover-upload').previousSibling)[0].click()
    }, 100)
  }
  vm.repositionCover = function(event, sequence) {
    var CurY = (window.Event) ? event.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
    var coverPreview = angular.element(document.getElementById('cover-preview'))[0]
    if (vm.idea.media.images.length > 0 && sequence === 'begin') {
      vm.repositionCoverActive = true
      vm.initialPreview = coverPreview.style.marginTop
      vm.initialY = (window.Event) ? event.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
    } else if (vm.idea.media.images.length > 0 && sequence === 'move' && vm.repositionCoverActive) {
      var newY = parseInt(vm.initialPreview) - (vm.initialY - CurY)
      coverPreview.style.marginTop = newY + 'px'
      vm.idea.media.preview.offset = coverPreview.style.marginTop
    } else if (vm.idea.media.images.length > 0 && sequence === 'end') {
      vm.repositionCoverActive = false
    } else {
      return true
    }
  }
  $scope.$watch(function() {
    return $scope.files
  }, function() {
    _uploadFiles($scope.files)
  })
  $scope.$watch(function() {
    return $scope.profileImage
  }, function() {
    $log.debug($scope.profileImage)
    if (typeof $scope.profileImage == "undefined")
      return
    CustomerService.uploadImage($scope.profileImage).then(function(result) {
      var data = {
        designerImageUrl: result.image
      }
      CustomerService.updateAccount($scope.customer.id, data).then(function() {
        CustomerService.getData(true).then(function(data) {
          if ($scope.customer.designerBio !== data.designerBio) {
            $scope.customer.image = data.image
          }
          $scope.customer.image = data.image
        })
      })
    })
  })

  function _uploadFiles(files) {
    var deferred = $q.defer()
    if (files && files.length) {
      var count = 0
      angular.forEach(files, function(file, index) {
        $upload.upload({
          url: "/thinktank/index/submitimages/",
          fields: {
            'title': vm.ideaName,
          },
          file: file
        }).progress(function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
          $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name)
        }).success(function(data, status, headers, config) {
          $scope.filesUploaded = true
          $log.debug('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data))
          count++
          vm.ideaMedia = vm.ideaMedia || {}
          vm.idea.media.images = vm.idea.media.images || []
          vm.coverImageIndex = vm.coverImageIndex || 0
          vm.idea.media.images.push(data.url + '?iopts=680x')
          vm.idea.media.preview.image = vm.idea.media.images[vm.coverImageIndex]
          if (count == files.length) {
            $scope.files = null
            $scope.filesUploaded = false
            deferred.resolve(data)
          }
        }).error(function(data) {
          $log.debug(file)
          if (data.message) {
            data.message = data.message + " (" + file.name + ")"
          }
          deferred.reject(data)
        })
      })
    } else {
      deferred.resolve({
        "result": "no files"
      })
    }
    $log.debug('22', vm.ideaMediaImages);
    return deferred.promise
  }
  vm.storeIdea = function() {
    if (!vm.submissionId && 'localStorage' in window && window['localStorage'] !== null) {
      localStorage['thinktankSubmissionName'] = vm.ideaName ? vm.ideaName : ""
      localStorage['thinktankSubmissionStory'] = vm.ideaStory ? vm.ideaStory : ""
      localStorage['thinktankShortDescription'] = vm.ideaShortDescription ? vm.ideaShortDescription : ""
      localStorage['thinktankOccasion'] = vm.ideaOccasion ? vm.ideaOccasion : ""
      localStorage['thinktankFabric'] = vm.ideaFabric ? vm.ideaFabric : ""
      localStorage['thinktankMsrp'] = vm.ideaMsrp ? vm.ideaMsrp : ""
      localStorage['thinktankAdditional'] = vm.ideaAdditional ? vm.ideaAdditional : ""
      localStorage['thinktankGender'] = vm.ideaGender ? vm.ideaGender : ""
      localStorage['idea.media.images'] = vm.idea.media.images ? vm.idea.media.images : ""
      localStorage['coverImageIndex'] = vm.coverImageIndex ? vm.coverImageIndex : 0
    } else if (vm.submissionId) {
      vm.save(false)
    }
  }
  vm.deleteImage = function(index, event) {
    event.preventDefault()
    if (vm.idea.media.images[index] === vm.idea.media.preview.image) {
      vm.idea.media.images.splice(index, 1)
      if (($scope.files !== null) && ($scope.files !== '')) {
        $scope.files.splice(index, 1)
      }
      vm.coverImageIndex = 0
      vm.idea.media.preview.image = vm.idea.media.images[vm.coverImageIndex]
    } else {
      vm.idea.media.images.splice(index, 1)
      if (($scope.files !== null) && ($scope.files !== '')) {
        $scope.files.splice(index, 1)
      }
    }
  }
  vm.previewImage = function(index, event) {
    event.preventDefault()
    vm.coverImageIndex = index
    vm.idea.media.preview.image = vm.idea.media.images[vm.coverImageIndex]
    angular.element(document.getElementById('cover-preview'))[0].style.marginTop = 0
  }
  vm.calcPreviewWidth = function() {
    angular.element(document.querySelector('.submission-preview'))[0].style.width = angular.element(document.querySelector('.submission-preview__wrapper'))[0].offsetWidth + 'px'
  }
  vm.updateProfile = function() {
    vm.profileUpdating = true
    var data = {
      designerBio: $scope.customer.designerBio
    }
    CustomerService.updateAccount($scope.customer.id, data).then(function() {
      CustomerService.getData(true).then(function(data) {
        $scope.customer = data
        vm.showSuccessModal()
        vm.profileUpdating = false
      })
    })
  }

  function _loadStoredIdea() {
    if (!vm.submissionId && 'localStorage' in window && window['localStorage'] !== null) {
      if (localStorage['thinktankSubmissionName']) {
        vm.ideaName = localStorage['thinktankSubmissionName']
      }
      if (localStorage['thinktankSubmissionStory']) {
        vm.ideaStory = localStorage['thinktankSubmissionStory']
      }
      if (localStorage['thinktankShortDescription']) {
        vm.ideaShortDescription = localStorage['thinktankShortDescription']
      }
      if (localStorage['thinktankOccasion']) {
        vm.ideaOccasion = localStorage['thinktankOccasion']
      }
      if (localStorage['thinktankMsrp']) {
        vm.ideaMsrp = localStorage['thinktankMsrp']
      }
      if (localStorage['thinktankAdditional']) {
        vm.ideaAdditional = localStorage['thinktankAdditional']
      }
      if (localStorage['thinktankFabric']) {
        vm.ideaFabric = localStorage['thinktankFabric']
      }
      if (localStorage['thinktankMedia']) {
        vm.ideaMedia = null
        localStorage['thinktankMedia'] = null
      }
    } else if (vm.submissionId) {
      ThinkTankService.getDesign(vm.submissionId).then(function(response) {
        vm.ideaName = response.data.name
        vm.ideaStory = response.data.story
        vm.ideaShortDescription = response.data.shortDescription
        vm.ideaOccasion = response.data.occasion
        vm.ideaMsrp = response.data.msrp
        vm.ideaAdditional = response.data.additional
        vm.ideaFabric = response.data.fabric
        vm.ideaGender = response.data.gender
        vm.ideaState = response.data.state
        vm.idea.media = response.data.media
      })
    }
  }
  _loadStoredIdea()

  function _clearStoredIdea() {
    if ('localStorage' in window && window['localStorage'] !== null) {
      localStorage.removeItem('thinktankSubmissionName')
      localStorage.removeItem('thinktankSubmissionStory')
      localStorage.removeItem('thinktankShortDescription')
      localStorage.removeItem('thinktankOccasion')
      localStorage.removeItem('thinktankAdditional')
      localStorage.removeItem('thinktankMsrp')
      localStorage.removeItem('thinktankFabric')
      localStorage.removeItem('thinktankMedia')
      localStorage.removeItem('ideaMedia')
      localStorage.removeItem('idea.media.images')
      localStorage.removeItem('coverImageIndex')
    }
  }
  vm.showSuccessModal = function() {
    ModalService.showModal({
      templateUrl: "/angular/app/thinktank/submission/submission-success-modal.html",
      controller: "SubmissionSuccessModalController"
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
  vm.save = function(redirect) {
    var loggedIn = CustomerService.data.loggedIn
    vm.submitting = true
    if (redirect && !loggedIn) {
      CustomerService.showLoginModal({
        source: "idea"
      }).then(function(loggedIn) {
        if (loggedIn) {
          _submit().then(function() {
            if (redirect) {
              $location.path("/account/submissions")
            }
          }, function() {})
        } else {
          vm.submitting = false
        }
      }, function() {
        vm.submitting = false
      })
    } else {
      $log.debug('Idea Submit: already logged in')
      _submit().then(function() {
        if (redirect) {
          $location.path("/account/submissions")
        }
      }, function() {})
    }
    TrackingService.trackEvent('Participate', {
      'Participation Type': 'Save Design'
    })
  }
  var _submitIdea = _.debounce(function() {
    $log.debug('_submitIdea')
    var deferred = $q.defer()
    vm.errorMessage = false
    vm.isValid = true
    vm.submitting = true
    vm.ideaPublished = true
    _uploadFiles($scope.files).then(function(data) {
      if (data && data.result) {
        _submit().then(function(data) {
          deferred.resolve(data)
          _clearStoredIdea()
          TrackingService.trackEvent('Participate', {
            'Participation Type': 'Submit Design'
          })
          vm.submitting = false
          vm.successMessage = true
          vm.submitted = false
          if ($scope.submission.ideaPublished && $scope.customer.designerBio && $scope.customer.image) {
            vm.successMessageFinal = true
            vm.submissionAttempted = false
            vm.showSuccessModal()
          }
          vm.isValid = false
          vm.ideaName = ""
          vm.ideaStory = ""
          vm.ideaShortDescription = ""
          vm.ideaOccasion = ""
          vm.ideaMsrp = ""
          vm.ideaAdditional = ""
          vm.ideaSuggestedFabric = ""
          vm.ideaSubmissionId = ""
          vm.submissionForm.$setPristine()
          vm.submissionForm.$setUntouched()
        }, function(data) {
          deferred.reject(data)
          vm.submitting = false
        })
      }
    }, function(data) {
      deferred.reject(data)
      vm.submitting = false
      vm.errorMessage = data.message
    })
    return deferred.promise
  }, 1000)
  var _submit = function() {
    var submission = {
      name: $scope.submission.ideaName,
      story: $scope.submission.ideaStory,
      occasion: $scope.submission.ideaOccasion,
      shortDescription: $scope.submission.ideaShortDescription,
      occasion: $scope.submission.ideaOccasion,
      msrp: $scope.submission.ideaMsrp,
      additional: $scope.submission.ideaAdditional,
      fabric: $scope.submission.ideaFabric,
      gender: $scope.submission.ideaGender,
      published: $scope.submission.ideaPublished,
      media: $scope.submission.idea.media
    }
    if (vm.submissionId)
      submission['id'] = vm.submissionId
    return ThinkTankService.saveDesign(submission)
  }
  vm.submitted = false
  ThinkTankService.getConfig().then(function(config) {
    $scope.data = config
    return CategoryService.getCategory(69)
  }).then(function(data) {
    $scope.crowdfunding = data
    return CategoryService.getCategory(80)
  }).then(function(data) {
    $scope.funded = data
    return ProductService.getProductsForCategoryId(69, 6)
  }).then(function(data) {
    $scope.crowdfunding.products = data
    return ProductService.getProductsForCategoryId(80, 6)
  }).then(function(data) {
    $scope.funded.products = data
    $scope.$emit('viewLoaded')
    angular.element($window).bind('resize', function() {
      vm.calcPreviewWidth()
    })
    vm.calcPreviewWidth()
  })
  PageService.setMicrodataItemType('QAPage')
  PageService.setBodyClass('submission-page')
  $scope.$on("$destroy", function() {
    angular.element($window).unbind('resize')
  })
}
BetabrandApp.controller('SubmissionSuccessModalController', ['$scope', '$rootScope', '$location', '$document', '$timeout', 'hotkeys', 'TrackingService', 'CustomerService', 'close', function($scope, $rootScope, $location, $document, $timeout, hotkeys, TrackingService, CustomerService, close) {
  $scope.display = true
  $scope.closing = false
  hotkeys.bindTo($scope).add({
    combo: 'esc',
    description: 'Close Modal',
    callback: function() {
      $scope.close()
    }
  })
  $scope.$on('closeModals', function() {
    $scope.close()
  })
  $scope.close = function() {
    $scope.closing = true
    $timeout(function() {
      $scope.display = false
      close()
    }, 610)
  }
}])
BetabrandApp.controller('ThinkTankController', ['$scope', 'ModalService', 'PageService', function ThinkTankController($scope, ModalService, PageService) {
  $scope.showHowItWorksModal = function() {
    ModalService.showModal({
      templateUrl: "/angular/app/modal/how-it-works/how-it-works-modal.html",
      controller: "HowItWorksModalController"
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
  PageService.setBodyClass('category__page think-tank-landing')
}])
BetabrandApp.directive('voteButton', ['CustomerService', 'TrackingService', '$log', '$q', '$http', '$rootScope', function(CustomerService, TrackingService, $log, $q, $http, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/angular/app/thinktank/vote-button.html',
    scope: {
      product: "="
    },
    replace: true,
    link: function(scope, element, attrs) {
      scope.customer = CustomerService
      scope.submitClicked = false
      scope.buttonTextFollow = {
        'bts': attrs['buttonTextSubmitted'],
        'btd': attrs['buttonTextDefault']
      }
      scope.voteButtonClick = function() {
        scope.submitClicked = true
        TrackingService.trackEvent('Vote Start');
        if (!CustomerService.data.loggedIn) {
          CustomerService.showLoginModal({
            "action": "vote",
            source: "vote",
            product: scope.product
          }).then(function() {
            _postVote(scope.product)
          })
        } else {
          _postVote(scope.product)
        }
      }

      function _postVote(product) {
        var deferred = $q.defer()
        if (product && product.id) {
          $http({
            method: "POST",
            url: "/api/rest/thinktank/vote/",
            data: {
              'productId': product.id
            }
          }).success(function(data) {
            scope.submitClicked = false
            if (data) {
              if (product && product.thinktankCounts) {
                if (data.voting.count > product.thinktankCounts.voting.count)
                  product.thinktankCounts = data
                else
                  product.thinktankCounts.voting.count++
                document.getElementById('vote-count-' + product.id).innerHTML = product.thinktankCounts.voting.count;
              }
              TrackingService.trackEvent('Participate', {
                'Participation Type': 'Vote'
              });
              CustomerService.updateVotedProducts(product.id)
            }
            deferred.resolve(data)
          }).error(function(data) {
            scope.submitClicked = false
            $log.debug('_postVote fail:', data)
            deferred.reject(data)
          })
        } else {
          $log.debug('_postVote fail: no product id')
          deferred.reject()
        }
        return deferred.promise
      }
    }
  }
}])
BetabrandApp.controller('VotingPageController', ['$scope', 'VotingPageService', 'ProductService', 'LookupService', 'ModalService', '$document', 'PageService', '$sce', "_", function($scope, VotingPageService, ProductService, LookupService, ModalService, $document, PageService, $sce, _) {
  $scope.service = VotingPageService
  $scope.openShare = false
  $scope._ = _
  $scope.showHowItWorksModal = function() {
    ModalService.showModal({
      templateUrl: "/angular/app/modal/how-it-works/how-it-works-modal.html",
      controller: "HowItWorksModalController"
    }).then(function(modal) {
      modal.close.then(function(result) {})
    })
  }
  var container = angular.element(document.getElementById('story--scrolljs'));
  $scope.scrollPass = false
  $document.on('scroll', function() {
    if ($document.scrollTop() > 400) {
      $scope.scrollPass = true
      $scope.$apply();
    } else {
      $scope.scrollPass = false
      $scope.$apply();
    }
  })
  angular.element(document).ready(function() {
    var e = document.getElementById('story__text--scrolljs')
    var storyTextHeight = (e || {}).offsetHeight
    if (storyTextHeight > 300) {
      $scope.tooTall = true
      $scope.$apply();
    }
  })
  $scope.isActive = function(sectionNum) {
    if ($scope.sectionScroll == sectionNum) {
      return 'active'
    } else {
      return 'inactive'
    }
  };
  $scope.currentPage = 1
  $scope.formData = {}
  $scope.formTemplate = [{
    "type": "text",
    "label": "How much would you pay for this?",
    "model": "price"
  }, {
    "type": "text",
    "label": "What other colors would you like to see this in?",
    "model": "color"
  }, {
    "type": "text",
    "label": "What is one thing you would change?",
    "model": "suggestion"
  }]
  $scope.questionCount = $scope.formTemplate.length - 1
  $scope.processForm = function() {
    VotingPageService.postSurvey($scope.formData).then(function() {
      $scope.$emit('viewLoaded')
    }, function(error) {})
  };
  PageService.setBodyClass('voting__page')
  PageService.setMicrodataItemType('CollectionPage')
}])
BetabrandApp.factory('VotingPageService', ['$http', '$q', function VotingPageService($http, $q) {
  return {
    postSurvey: function(formData) {
      var deferred = $q.defer()
      $http({
        method: "POST",
        url: "https://formkeep.com/f/363350efb25d",
        data: formData
      }).success(function(data) {
        deferred.resolve(data)
        self.data = data
      }).error(function(data) {
        deferred.reject(data)
      })
      return deferred.promise
    }
  }
}])
BetabrandApp.directive('toolTip', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      label: '@',
      icon: '@'
    },
    transclude: true,
    templateUrl: '/angular/app/tooltip/tooltip.html',
    link: function(scope) {}
  };
})
BetabrandApp.factory('TrackingService', ['$rootScope', '$location', '$injector', '$kookies', '$scrollDepth', '$log', '$q', '_', 'APP_CONFIG', 'LoggingService', function($rootScope, $location, $injector, $kookies, $scrollDepth, $log, $q, _, APP_CONFIG, LoggingService) {
  function TrackingService() {
    var self = this
    var trackers = {
      mixpanel: {
        init: $q.defer(),
        autoTrackVirtualPages: true,
        onLoad: function() {
          if (!window.mixpanel) {
            $log.error("mixpanel missing")
            window.mixpanel = []
          }
          if (APP_CONFIG.mixpanelKey) {
            mixpanel.init(APP_CONFIG.mixpanelKey);
          } else {
            mixpanel.init('bb81c80ab1c4773a3f6c2947c1fc5229');
          }
          mixpanel.set_config({
            track_pageview: false,
            debug: true
          });
          trackers.mixpanel.init.resolve();
        },
        createCustomer: function(action, method, data) {
          method = _.capitalize(method)
          mixpanel.alias(data.id)
          mixpanel.name_tag(data.email)
          mixpanel.register({
            "Signup Date": data.createdAt,
            "Signup Method": method
          })
          mixpanel.track("Signup", {
            "Signup Method": method
          })
          mixpanel.people.increment('Signed up with ' + method)
        },
        loginCustomer: function(action, method, data) {
          var now = new Date()
          mixpanel.people.set({
            "$firstname": data.firstname,
            "$lastname": data.lastname,
            "$email": data.email,
            "$created": data.createdAt,
            "$last_login": now.toISOString().substring(0, now.toISOString().length - 5)
          });
          mixpanel.identify(data.id)
          mixpanel.track("Login", {
            "Login Method": _.capitalize(method)
          })
        },
        updateCustomerData: function(action, data) {
          mixpanel.register({
            "Logged In": data.loggedIn
          })
          var repeat = !!(data || {}).repeatCustomer
          if (!repeat) {
            repeat = _getRepeatCustomerCookieValue()
          } else {
            _setRepeatCustomerCookieValue()
          }
          mixpanel.register({
            "Repeat Customer": repeat
          });
          mixpanel.register({
            "New Visitor": _userVisitCount() == 1
          })
        },
        checkoutSuccess: function(action, data) {
          _setRepeatCustomerCookieValue()
          switch (data.analytics.paymentMethod) {
            case 'authorizenet':
              data.analytics.paymentMethod = "Standard Credit Card"
              break
            case 'authorize_cim':
              data.analytics.paymentMethod = "Saved Credit Card"
              break
            case 'betapaypal_expresscheckout':
              data.analytics.paymentMethod = "Paypal Express Checkout"
              break
          }
          var mpData = {
            "Transaction Amount": data.analytics.transactionTotal,
            "Number Of Items": data.analytics.orderNumberOfItems,
            'Number Of CF Items': data.analytics.orderNumberOfCfItems,
            'Number Of Non-CF Items': data.analytics.orderNumberOfStandardItems,
            'Payment Method': data.analytics.paymentMethod
          }
          if (typeof data.analytics.referral == "object") {
            mpData['Referral Code'] = data.analytics.referral.code
            mpData['Referral Program'] = data.analytics.referral.program
          }
          mixpanel.track("Purchase", mpData)
          mixpanel.people.track_charge(data.analytics.transactionTotal)
          mixpanel.people.increment('Purchased')
          angular.forEach(data.analytics.transactionProducts, function(value, index) {
            var product = data.analytics.transactionProducts[index]
            var mpData = self.buildProductTrackingData(product)
            mpData["Product Quantity"] = product.quantity
            if (true == product.crowdfunded) {
              mpData["Crowdfunded"] = product.crowdfunded
              mpData["Tier"] = product.tier
            }
            mixpanel.track("Purchase items", mpData)
          });
        },
        trackPage: function(path) {
          self.getTrackingData().then(function(data) {
            if (data['Shop Section']) {
              mixpanel.track('View Shop Page', data)
            } else {
              if (data['Source']) {
                mixpanel.track('View ' + data['Source'], data)
              } else {
                $log.debug('TrackingService Warning: No Source property for Page Track, path:', $location.path())
              }
            }
          })
        },
        trackEvent: function(action, data) {
          self.getTrackingData().then(function(trackingData) {
            var extend = angular.extend({}, trackingData || {}, data)
            mixpanel.track(action, extend)
          })
        },
        blacklist: []
      },
      gtm: {
        init: $q.defer(),
        autoTrackVirtualPages: true,
        previousPageUrl: null,
        onLoad: function() {
          if (!window.dataLayer) {
            $log.error("GTM dataLayer missing")
            window.dataLayer = []
          }
          dataLayer.push({
            'event': 'initialPageLoad'
          })
          $scrollDepth.init({
            eventName: 'analyticsEvent'
          })
          trackers.gtm.init.resolve()
        },
        updateCustomerData: function(action, data) {
          data = data || {}
          var customerData = {
            id: data.id,
            email: data.email,
            client: data.client,
            gender: data.gender,
            createdAt: data.createdAt,
            loggedIn: data.loggedIn,
            hasAccount: data.hasAccount,
            repeatCustomer: data.repeatCustomer
          }
          dataLayer.push({
            'customerData': customerData
          })
        },
        addedToCart: function(action, data) {
          trackers.gtm.updateCartData(action, data)
          dataLayer.push({
            'event': 'addedToCart'
          })
        },
        removedFromCart: function(action, data) {
          trackers.gtm.updateCartData(action, data)
          dataLayer.push({
            'event': 'removedFromCart'
          })
        },
        updateCartData: function(action, data) {
          data = data || {}
          if (data.totals) {
            var totals = {}
            for (var i = 0; i < data.totals.length; i++) {
              totals[data.totals[i].code] = data.totals[i]
            }
            data.totals = totals
          }
          dataLayer.push({
            'cartData': data
          })
        },
        updateProductData: function(action, data) {
          data = data || {}
          var productData = {
            name: data.name,
            id: data.id,
            sku: data.sku,
            price: (data.prices || {}).final || '',
            discount: (data.prices || {}).discount_amount || '',
            tags: data.tags,
            canonicalUrl: data.canonicalUrl,
            imageUrl: data.thumbnail,
            category: data.categoryName,
            brand: "Betabrand"
          }
          var sp = data.simpleProducts
          if (sp) {
            productData.childSkus = [];
            for (var x = 0; x < sp.length; x++) {
              productData.childSkus.push({
                sku: sp[x].simple_product_sku,
                id: sp[x].simple_product_id,
                name: sp[x].simple_product_name
              });
            }
          }
          dataLayer.push({
            productData: productData
          })
        },
        updateCategoryData: function(action, data) {
          data = data || {}
          var categoryData = {
            id: data.id,
            name: data.name
          }
          if (data.products) {
            var productIds = data.products.map(function(product) {
              return product.id
            })
            categoryData['productIds'] = productIds;
          }
          dataLayer.push({
            categoryData: categoryData
          })
        },
        updateCategoryProductIds: function(action, data) {
          dataLayer.push({
            'categoryProductIds': data
          })
        },
        push: function(action, data) {
          dataLayer.push(data)
        },
        createCustomer: function() {
          dataLayer.push({
            'event': 'createCustomer'
          });
        },
        loginCustomer: function() {
          dataLayer.push({
            'event': 'customerLoggedIn'
          });
        },
        checkoutSuccess: function(action, data) {
          data.analytics.cartData = null
          dataLayer.push(data.analytics)
          dataLayer.push({
            'event': action
          })
        },
        trackPage: function(path) {
          var referrer = trackers.gtm.previousPageUrl ? trackers.gtm.previousPageUrl : (typeof document.referrer === 'undefined' ? '' : document.referrer)
          trackers.gtm.previousPageUrl = $location.absUrl()
          self.getTrackingData().then(function(trackingData) {
            dataLayer.push({
              'referrer': referrer,
              'virtualPagePath': path,
              'source': trackingData['Source'],
              'event': 'virtualPageview'
            })
          })
        },
        trackEvent: function(action, data) {
          var gData
          switch (action) {
            case 'Participate':
              gData = {
                'category': action
              }
              action = data['Participation Type']
              break;
            case 'Newsletter Signup':
              if ((data || {})['Email']) {
                dataLayer.push({
                  'newsletterSignupEmail': data['Email']
                })
              }
              gData = data || {}
              break;
            default:
              gData = data || {}
          }
          dataLayer.push({
            'eventCategory': gData.category,
            'eventAction': action,
            'eventLabel': gData.label,
            'eventValue': gData.value,
            'eventNonInteraction': gData.noninteraction,
            'event': 'analyticsEvent'
          })
        },
        timing: function(action, data) {
          angular.forEach(Object.keys(window.betabrand.timing), function(key) {
            if (typeof window.betabrand.timing[key] == "function" || key == "start") return
            dataLayer.push({
              'event': "timingEvent",
              'eventCategory': "App Initialization",
              'eventVar': key,
              'eventValue': window.betabrand.timing[key]
            })
          })
        },
        whitelist: ['Participate', 'View Cart', 'Newsletter Signup', 'Play Video', 'Pause Video', 'Percent Video Played']
      },
      optimizely: {
        checkoutSuccess: function(action, data) {
          var valueInCents = data.analytics.transactionTotal * 100
          _optimizely().push(['trackEvent', 'checkout_success', {
            'revenue': valueInCents
          }])
          if (data.analytics.items && data.analytics.items.length > 1) {
            _optimizely().push(['trackEvent', 'more_than_one_item'])
          }
        },
        trackEvent: function(action, data) {
          action = action.toLowerCase().replace(/ /g, "_")
          _optimizely().push(['trackEvent', action])
        },
        whitelist: ['Click Cross Sell', 'Click Checkout', 'Newsletter Signup', 'Add To Cart']
      },
      fullstory: {
        init: $q.defer(),
        onLoad: function() {
          window['_fs_ready'] = function() {
            trackers.fullstory.init.resolve()
          }
        },
        updateCustomerData: function(action, data) {
          trackers.fullstory.identifyCustomer('identifyCustomer', data)
        },
        identifyCustomer: function(action, data) {
          data = data || {}
          var fsData = {
              displayName: (data.firstname ? data.firstname : "") + (data.lastname ? " " + data.lastname : ""),
              email: data.email ? data.email : (data.Email ? data.Email : "")
            },
            id = data.id ? data.id : fsData.email
          if (id.length || fsData.displayName.length || fsData.email.length)
            FS.identify(id, fsData)
        },
        trackEvent: function(action, data) {
          switch (action) {
            case 'Newsletter Signup':
              trackers.fullstory.identifyCustomer('identifyCustomer', data)
              break
          }
        },
        whitelist: ['Newsletter Signup']
      },
      performance: {
        timing: function(action, data) {
          var params = $location.search()
          if (params.performance)
            window.betabrand.timing.tag = params.performance
        }
      }
    }

    function _optimizely() {
      return (window.optimizely && 'push' in window.optimizely) ? window.optimizely : []
    }

    function _getRepeatCustomerCookieValue() {
      var repeat = $kookies.get('betabrand-repeat-customer')
      return (typeof repeat != 'undefined' && repeat != 0)
    }

    function _setRepeatCustomerCookieValue() {
      $kookies.set('betabrand-repeat-customer', 1, {
        expires: 365,
        path: '/'
      })
    }

    function _parseUtma() {
      var utma = $kookies.get('__utma') || ''
      var v = utma.split('.')
      return {
        domainHash: v[0],
        userID: v[1] || '',
        initialVisitTs: Number(v[2] || ''),
        previousSessioTs: Number(v[3] || ''),
        currentSessionTs: Number(v[4] || ''),
        sessionNumber: Number(v[5] || '')
      }
    }

    function _userVisitCount() {
      return _parseUtma().sessionNumber || 1;
    }

    function _fixState(state) {
      if (state) {
        state = state.split("-").map(function(token, index) {
          if ("of" == token) {
            return token
          }
          return _.capitalize(token)
        }).join(" ")
      }
      return state
    }
    self.buildProductTrackingData = function(product) {
      var state = _fixState(product.state)
      var price = null;
      if ((product.prices || {}).final) {
        price = product.prices.final
      } else if (product.price) {
        price = Number(product.price)
      }
      return {
        "Product ID": product.id,
        "Product Name": product.name,
        "Product State": state,
        'Product Price': price,
        "Product Gender": _.capitalize(product.gender),
        "Product Category": product.categories
      }
    }
    var firstPageLoadInit = false
    var trackingPromise = null
    var receiveTrackingDeferred = null

    function _resetTrackingData() {
      trackingPromise = null
      receiveTrackingDeferred = $q.defer()
    }
    $rootScope.$on('viewLoaded', function(event, current) {
      if (!firstPageLoadInit) {
        angular.forEach(trackers, function(tracker, key) {
          if (tracker.onLoad && typeof(tracker.onLoad) == "function") {
            tracker.onLoad.apply(this)
          }
        }, this)
        firstPageLoadInit = true;
      }
      if (null == trackingPromise) {
        self.setTrackingPromise(null)
      }
      _trackPage($location.url(), true)
    });
    if ($injector.has('$location')) {
      $rootScope.$on('$locationChangeSuccess', function(event, current) {
        _resetTrackingData()
      });
    }
    self.setTrackingPromise = function(promise) {
      if (promise) {
        trackingPromise = promise
      } else {
        var defer = $q.defer()
        trackingPromise = defer.promise
        defer.resolve({})
      }
      receiveTrackingDeferred.resolve(trackingPromise)
    }
    self.getTrackingData = function() {
      return receiveTrackingDeferred.promise
    }

    function _callTracker(tracker, fn) {
      var args
      if (Object.prototype.toString.call(arguments[2]) == '[object Arguments]') {
        args = arguments[2];
      } else {
        args = []
        for (var i = 2; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
      }
      if (tracker.init && tracker.init.promise) {
        tracker.init.promise.then(function() {
          fn.apply(self, args)
        })
      } else {
        fn.apply(self, args)
      }
    }
    self.track = function(action) {
      var args = arguments
      switch (action) {
        case 'trackEvent':
          self.trackEvent(args)
          break;
        case 'trackPage':
          self.trackPage(args)
          break;
        default:
          angular.forEach(trackers, function(tracker, key) {
            if (tracker[action]) {
              $log.debug('track - ' + key + ': ', args)
              _callTracker(tracker, tracker[action], args)
            }
          })
      }
    }
    self.trackEvent = function(action, data) {
      if (typeof(action) === 'undefined') {
        $log.debug("undefined event:", data)
      } else {
        angular.forEach(trackers, function(tracker, key) {
          if (tracker.trackEvent && ((tracker.blacklist && (-1 == tracker.blacklist.indexOf(action))) || tracker.whitelist && (tracker.whitelist.indexOf(action) != -1))) {
            var trackEvent = $kookies.get('DEBUG') != '0' ? function(action, data) {
              $log.debug(key + ': TrackEvent - Action: ' + action + ', Data:', data)
              _callTracker(tracker, tracker.trackEvent, action, data)
            } : tracker.trackEvent
            trackEvent(action, data)
          }
        })
      }
    }
    self.trackPage = function(path, force) {
      force = force || false
      _trackPage(path, force)
    }
    var _trackPage = function(path, autoTracking) {
      angular.forEach(trackers, function(tracker, key) {
        var track = autoTracking == tracker.autoTrackVirtualPages
        if (track && tracker.trackPage) {
          $log.debug(key + ': ' + (autoTracking ? 'Auto ' : '') + 'Track Page: ' + path)
          _callTracker(tracker, tracker.trackPage, path)
        }
      })
    }
  }
  return new TrackingService()
}])
BetabrandApp.directive('tweaksuggestion', tweaksuggestion);

function tweaksuggestion() {
  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl: '/angular/app/tweaksuggestion/tweaksuggestion.html',
    scope: {
      product: "="
    },
    transclude: true,
    link: linkFunc,
    controller: TweaksuggestionController,
    controllerAs: 'vm',
    bindToController: true
  };
  return directive;

  function linkFunc(scope, el, attr, ctrl) {
    scope.data = {};
    scope.vm.CustomerService.getData().then(function(response) {
      if (!scope.data.email && response.email) {
        scope.data.email = response.email
      }
    });
    var suggestion = angular.element(document.getElementById('tweak-suggestion-content'))[0];
    var suggestionTrigger = angular.element(document.getElementsByClassName('tweak-suggestion--trigger'))[0];
    scope.submitTweaksuggestion = function(event) {
      scope.data.productId = ctrl.product.id
      if (suggestion.value !== '') {
        scope.vm.submittedState = true;
        scope.data.comment = 'Suggested Product Tweak: ' + suggestion.value;
        scope.vm.ProductService.submitFeedback('question', scope.data).then(function() {
          scope.vm.TrackingService.trackEvent('Suggest a Tweak')
        })
      } else {
        return true;
        event.preventDefault();
      }
    }
    scope.activateTweaksuggestion = function(event) {
      document.onclick = function(event) {
        closeTweakOffClick(event);
      };
      if (scope.vm.activatedState && (suggestion.value.length > 0) && !scope.vm.submittedState) {
        scope.submitTweaksuggestion();
        scope.vm.activatedState = !scope.vm.activatedState;
      } else if (scope.vm.activatedState && (document.activeElement == suggestionTrigger) && (suggestion.value.length > 0)) {
        scope.submitTweaksuggestion();
        suggestion.focus();
        scope.vm.activatedState = !scope.vm.activatedState;
      } else if (!scope.vm.activatedState && (document.activeElement == suggestionTrigger)) {
        suggestion.focus();
        scope.vm.activatedState = !scope.vm.activatedState;
      } else if (!scope.vm.activatedState) {
        suggestion.focus();
        scope.vm.activatedState = !scope.vm.activatedState;
      } else if (!suggestion.value.length > 0) {
        scope.submitTweaksuggestion();
        scope.vm.activatedState = !scope.vm.activatedState;
      } else {
        scope.submitTweaksuggestion();
        scope.vm.activatedState = !scope.vm.activatedState;
      }
    }
    scope.refocusTweaksuggestion = function() {
      scope.vm.activatedState = false;
      suggestionTrigger.focus();
    }

    function closeTweakOffClick(event) {
      var clickedElement = event.target;
      if (!clickedElement) return;
      var elementClasses = clickedElement.classList;
      var clickedOnTweak = elementClasses.contains('tweak-suggestion--trigger') || elementClasses.contains('tweak-suggestion') || elementClasses.contains('inactive-text') || elementClasses.contains('active-text') || elementClasses.contains('tweak-suggestion--content') || (clickedElement.parentElement !== null && (clickedElement.parentElement.classList.contains('tweak-suggestion--set')));
      if (!clickedOnTweak) {
        scope.vm.activatedState = false;
        suggestionTrigger.focus();
        return;
      }
    }
  }
}
TweaksuggestionController.$inject = ['$scope', 'CustomerService', 'ProductService', 'TrackingService', '$rootScope', '$document'];

function TweaksuggestionController($scope, CustomerService, ProductService, TrackingService) {
  var vm = this;
  vm.CustomerService = CustomerService;
  vm.ProductService = ProductService;
  vm.TrackingService = TrackingService;
  vm.activatedState = false;
  vm.submittedState = false;
}
angular.module('varnish', []).factory('VarnishCacheInterceptor', ['$log', function($log) {
  function VarnishCacheInterceptor() {
    var self = this
    self.perClientRoutes = []
    self.request = function(config) {
      angular.forEach(self.perClientRoutes, function(url) {
        var regexUrl = url
        regexUrl = regexUrl.replace(/(:[^/]+)/g, "[^/]+")
        var re = new RegExp("^/api/rest" + regexUrl + "/*$", "i")
        if (config.url.match(re)) {
          config.headers['X-Ng-CacheType'] = 'per-client';
          $log.debug("[Varnish] Added Per-client Header:", config.url, re)
        }
      })
      return config;
    }
  }
  return new VarnishCacheInterceptor();
}]).config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('VarnishCacheInterceptor')
}]).run(function($http, $log, VarnishCacheInterceptor, APP_CONFIG) {
  if (APP_CONFIG && 'perClientRoutes' in APP_CONFIG) {
    $log.debug("[VARNISH] Using constants", APP_CONFIG)
    VarnishCacheInterceptor.perClientRoutes = APP_CONFIG.perClientRoutes
  } else {
    $http({
      method: "get",
      url: "/api/rest/varnish/perclient/",
    }).success(function(response) {
      VarnishCacheInterceptor.perClientRoutes = response.routes
      $log.debug("[Varnish] Per-client routes loaded", response.routes)
    }).error(function(response) {
      $log.debug("[Varnish] Per-client routes failed to load", response)
    })
  }
})
