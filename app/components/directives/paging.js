angular.module('paging', []).directive('paging', function () {
	var regex = /\{page\}/g;
	return {
		restrict: 'EA',
		link: fieldLink,
		template: fieldTemplate,
		scope: {
			page: '=',
			pageSize: '=',
			total: '=',
			dots: '@',
			ulClass: '@',
			activeClass: '@',
			disabledClass: '@',
			adjacent: '@',
			pagingAction: '&',
			pgHref: '@',
			textFirst: '@',
			textLast: '@',
			textNext: '@',
			textPrev: '@',
			textFirstClass: '@',
			textLastClass: '@',
			textNextClass: '@',
			textPrevClass: '@',
			textTitlePage: '@',
			textTitleFirst: '@',
			textTitleLast: '@',
			textTitleNext: '@',
			textTitlePrev: '@'
		}
	};

	function fieldLink(scope, el, attrs) {
		scope.$watchCollection('[page,pageSize,total]', function () {
			build(scope, attrs);
		});
	}

	function fieldTemplate(el, attrs){
		return '<ul data-ng-hide="Hide" data-ng-class="ulClass"> ' +
			'<li ' +
				'title="{{Item.title}}" ' +
				'data-ng-class="Item.liClass" ' +
				'data-ng-repeat="Item in List"> ' +
					'<a ' + 
						(attrs.pgHref ? 'data-ng-href="{{Item.pgHref}}" ' : 'href ') +
						'data-ng-class="Item.aClass" ' +
						'data-ng-click="Item.action()" ' +
						'data-ng-bind="Item.value">'+ 
					'</a> ' +
			'</li>' +
		'</ul>'
		scope.$apply();
	}

	function setScopeValues(scope, attrs) {

		scope.List = [];
		scope.Hide = false;
		
		scope.page = parseInt(scope.page) || 1;
		scope.total = parseInt(scope.total) || 0;
		scope.adjacent = parseInt(scope.adjacent) || 1;

		scope.pgHref = scope.pgHref || '';
		scope.dots = scope.dots || '...';
		
		scope.ulClass = scope.ulClass || 'pagination';
		scope.activeClass = scope.activeClass || 'active';
		scope.disabledClass = scope.disabledClass || 'disabled';

		scope.textFirst = scope.textFirst || '<<';
		scope.textLast = scope.textLast || '>>';
		scope.textNext = scope.textNext || '>';
		scope.textPrev = scope.textPrev || '<';
		
		scope.textFirstClass = scope.textFirstClass || '';
		scope.textLastClass= scope.textLastClass || '';
		scope.textNextClass = scope.textNextClass || '';
		scope.textPrevClass = scope.textPrevClass || '';

		scope.textTitlePage = scope.textTitlePage || 'Page {page}';
		scope.textTitleFirst = scope.textTitleFirst || 'First Page';
		scope.textTitleLast = scope.textTitleLast || 'Last Page'; 
		scope.textTitleNext = scope.textTitleNext || 'Next Page'; 
		scope.textTitlePrev = scope.textTitlePrev || 'Previous Page';

		scope.hideIfEmpty = evalBoolAttribute(scope, attrs.hideIfEmpty);
		scope.showPrevNext = evalBoolAttribute(scope, attrs.showPrevNext);
		scope.showFirstLast = evalBoolAttribute(scope, attrs.showFirstLast);
		scope.scrollTop = evalBoolAttribute(scope, attrs.scrollTop);

		//scope.$apply();
	}

	function evalBoolAttribute(scope, value){
		return angular.isDefined(value)
			? !!scope.$parent.$eval(value)
			: false;
	}

	function validateScopeValues(scope, pageCount) {
		if (scope.page > pageCount) {
			scope.page = pageCount;
		}
		if (scope.page <= 0) {
			scope.page = 1;
		}
		if (scope.adjacent <= 0) {
			scope.adjacent = 2;
		}
		if (pageCount <= 1) {
			scope.Hide = scope.hideIfEmpty;
		}
	}

	function internalAction(scope, page) {
		if (scope.page == page) {
			return;
		}
		scope.page = page;
		scope.pagingAction({
			page: scope.page,
			pageSize: scope.pageSize,
			total: scope.total
		});
		if (scope.scrollTop) {
			scrollTo(0, 0);
		}
	}

	function addPrevNext(scope, pageCount, mode) {
		if ((!scope.showPrevNext && !scope.showFirstLast) || pageCount < 1) {
			return;
		}
		var disabled, alpha, beta;

		if (mode === 'prev') {
			disabled = scope.page - 1 <= 0;
			var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;
			if(scope.showFirstLast){
				alpha = {
					value: scope.textFirst,
					title: scope.textTitleFirst,
					aClass: scope.textFirstClass,
					page: 1
				};
			}

			if(scope.showPrevNext){
				beta = {
					value: scope.textPrev,
					title: scope.textTitlePrev,
					aClass: scope.textPrevClass,
					page: prevPage
				};
			}
		} else {
			disabled = scope.page + 1 > pageCount;
			var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;

			if(scope.showPrevNext){
				alpha = {
					value: scope.textNext,
					title: scope.textTitleNext,
					aClass: scope.textNextClass,
					page: nextPage
				};
			}

			if(scope.showFirstLast){
				beta = {
					value: scope.textLast,
					title: scope.textTitleLast,
					aClass: scope.textLastClass,
					page: pageCount
				};
			}	
		}

		var buildItem = function (item, disabled) {
			return {
				value: item.aClass ? '' : item.value,
				title: item.title,
				liClass: disabled ? scope.disabledClass : '',
				aClass: item.aClass,
				pgHref: scope.pgHref.replace(regex, item.page),
				action: function () {
					if (!disabled) {
						internalAction(scope, item.page);
					}
				}
			};
		};

		if(alpha){
			var alphaItem = buildItem(alpha, disabled);
			scope.List.push(alphaItem);
		}

		if(beta){
			var betaItem = buildItem(beta, disabled);
			scope.List.push(betaItem);
		}
	}

	function addRange(start, finish, scope) {
		var i = 0;
		for (i = start; i <= finish; i++) {
			scope.List.push({
				value: i,
				title: scope.textTitlePage.replace(regex, i),
				liClass: scope.page == i ? scope.activeClass : '',
				pgHref: scope.pgHref.replace(regex, i),
				action: function () {
					internalAction(scope, this.value);
				}
			});
		}
	}

	function addDots(scope) {
		scope.List.push({
			value: scope.dots,
			liClass: scope.disabledClass
		});
	}

	function addFirst(scope, next) {
		addRange(1, 2, scope);
		if (next != 3) {
			addDots(scope);
		}
	}

	function addLast(pageCount, scope, prev) {
		if (prev != pageCount - 2) {
			addDots(scope);
		}
		addRange(pageCount - 1, pageCount, scope);
	}

	function build(scope, attrs) {
		if (!scope.pageSize || scope.pageSize <= 0) {
			scope.pageSize = 1;
		}
		var pageCount = Math.ceil(scope.total / scope.pageSize);

		setScopeValues(scope, attrs);
		validateScopeValues(scope, pageCount);

		var start, finish;
		var fullAdjacentSize = (scope.adjacent * 2) + 2;

		addPrevNext(scope, pageCount, 'prev');

		if (pageCount <= (fullAdjacentSize + 2)) {
			start = 1;
			addRange(start, pageCount, scope);
		} else {
			if (scope.page - scope.adjacent <= 2) {
				start = 1;
				finish = 1 + fullAdjacentSize;

				addRange(start, finish, scope);
				addLast(pageCount, scope, finish);
			} else if (scope.page < pageCount - (scope.adjacent + 2)) {
				start = scope.page - scope.adjacent;
				finish = scope.page + scope.adjacent;

				addFirst(scope, start);
				addRange(start, finish, scope);
				addLast(pageCount, scope, finish);
			} else {
				start = pageCount - fullAdjacentSize;
				finish = pageCount;

				addFirst(scope, start);
				addRange(start, finish, scope);
			}
		}
		addPrevNext(scope, pageCount, 'next');
	}
});