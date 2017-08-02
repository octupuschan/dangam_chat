

var apiService = new window.eep.util.ApiService();
var Tags = eep.ui.react.Tags;

var GoodsOptionDetail = React.createClass({
	displayName: 'GoodsOptionDetail',

	componentDidMount: function componentDidMount() {
		this.init();
	},
	init: function init() {
		this.load();
	},

	load: function load() {
		// console.log("load");
		var goodsCode = this.props.goodsCode;
		var that = this;

		if (goodsCode == undefined) {
			return;
		}

		apiService.get('/api/v1/goods/option/' + goodsCode).done(function (data) {
			// console.log('data',data);
			that.setState({ data: data });
		});
	},

	setOptionGroupData: function setOptionGroupData(goodsOptionGroupCode) {
		var that = this;
		// console.log('data11',this.state.data);

		apiService.get('/api/v1/option/' + goodsOptionGroupCode).done(function (data) {
			// console.log('data12',data);
			that.setState({ data: data });
		});
	},

	_handleClickOptionAddButton: function _handleClickOptionAddButton() {
		var state = {};
		var data = this.state.data;
		data.push({
			goodsOptionName: '',
			goodsOptionItemName: [],
			goodsOptionItemList: [],
			goodsCode: this.props.goodsCode,
			tenantId: this.props.tenantId
		});

		state = $.extend({}, this.state, { data: data });
		console.log('add action :', state);
		this.setState(state);
	},

	getInitialState: function getInitialState() {
		// console.log("getInitialState");
		var state = {
			data: []
		};
		return state;
	},

	getDefaultProps: function getDefaultProps() {
		var props = {
			goodsCode: '',
			tenantId: 'hishop'
		};
		return props;
	},

	_makeRows: function _makeRows() {
		var rows = [];
		var that = this;
		var arr;

		$.each(this.state.data, function (index, data) {
			arr = [];
			if (data.goodsOptionItemName == undefined) {
				for (var i = 0; i < data.goodsOptionItemList.length; i++) {
					arr.push(data.goodsOptionItemList[i].goodsOptionItemName);
				}
				data.goodsOptionItemName = arr;
				// console.log(data.goodsOptionItemName);
			}

			rows.push(React.createElement(
				'div',
				{ className: 'row', key: data.goodsOptionSn },
				React.createElement(
					'div',
					{ className: 'col-md-2' },
					React.createElement(
						'label',
						{ className: 'control-label', htmlFor: 'optionlabel' },
						index == 0 ? '옵션생성' : ''
					)
				),
				React.createElement(
					'div',
					{ className: 'col-md-1' },
					React.createElement(
						'label',
						{ className: 'control-label' },
						'옵션:'
					)
				),
				React.createElement(
					'div',
					{ className: 'col-md-2' },
					React.createElement('input', { className: 'form-control', ref: 'optionName', value: data.goodsOptionName, id: 'option/' + index, placeholder: 'input text', onChange: that.handleChange })
				),
				React.createElement(
					'div',
					{ className: 'col-md-1' },
					React.createElement(
						'lebel',
						{ className: 'control-label' },
						'항목: '
					)
				),
				React.createElement(
					'div',
					{ className: 'col-md-5' },
					React.createElement(Tags, { tags: data.goodsOptionItemName, onChange: that.handleTagsChange, index: index })
				),
				React.createElement(
					'div',
					{ className: 'col-md-1' },
					React.createElement(
						'button',
						{ className: 'btn btn-info btn-sm', onClick: function () {
								return that._deleteRow(index);
							} },
						'삭제'
					)
				)
			));
		});

		return rows;
	},

	_deleteRow: function _deleteRow(index) {
		var state = {};
		var data = this.state.data;
		data.splice(index, 1);

		state = $.extend({}, this.state, { data: data });
		this.setState(state);
	},

	_handleSaveOptionValue: function _handleSaveOptionValue() {
		//parameter 배열을 새로 만들어준다. (GoodsOptionValue 에 맞도록)
		var data = this.state.data;
		var that = this;
		var goodsOptionValuesDetailTemp = [];
		var allOptions = [];

		$.each(data, function (j, goodsOption) {
			allOptions.push(goodsOption.goodsOptionItemList);
		});

		var result = eep.util.cartesianProduct(allOptions);
		// console.log(result);

		var returnValue = [];

		for (var i = 0; i < result.length; i++) {
			$.each(result[i], function (j, resultObj) {
				goodsOptionValuesDetailTemp.push({
					goodsCode: that.props.goodsCode,
					goodsOptionItemSn: i + 1,
					goodsOptionValueSn: j + 1,
					goodsOptionItemValue: resultObj.goodsOptionItemName,
					useAt: 'Y',
					tenantId: that.props.tenantId
				});
			});
			returnValue.push({
				goodsCode: that.props.goodsCode,
				goodsOptionItemSn: i + 1,
				useAt: 'Y',
				inventoryQuantity: 0,
				displayQuantity: 0,
				realSalePrice: 0,
				goodsOptionValueDetailList: goodsOptionValuesDetailTemp,
				tenantId: that.props.tenantId
			});
			goodsOptionValuesDetailTemp = [];
		}

		// console.log('returnValue',returnValue);
		// console.log(JSON.stringify(returnValue));

		// this.getOptionNames();
		var goodsOptionValue = this.refs.goodsOptionValue;

		apiService.put('/api/v1/goods/' + this.props.goodsCode + '/option/value', returnValue).done(function (returnParam) {
			// console.log(returnParam);
			alert("저장 완료되었습니다.");
			goodsOptionValue.setState({ data: returnParam });
			// location.reload();
		});
	},

	_handleSaveOptions: function _handleSaveOptions() {
		if (!confirm('아래 판매가, 재고수량, 통보수량이 초기화됩니다. 저장하시겠습니까?')) {
			return;
		}

		var data = this.state.data;
		var that = this;

		for (var i = 0; i < data.length; i++) {
			var arr = [];

			data[i].goodsCode = this.props.goodsCode;

			//tags 수정이 없을때는 String 값으로 넘어온다. 이걸 풀어서 배열로 만드는 로직 필요.
			if (data[i].goodsOptionItemName.constructor == Array) {
				//Array
				arr = data[i].goodsOptionItemName;
			} else {
				// alert("string!!!");
				arr = data[i].goodsOptionItemName.split(',');
			}

			data[i].goodsOptionItemList = [];
			for (var j = 0; j < arr.length; j++) {
				data[i].goodsOptionItemList.push({
					goodsOptionItemName: arr[j],
					goodsOptionSn: data[i].goodsOptionSn,
					goodsCode: this.props.goodsCode,
					goodsOptionName: data[i].goodsOptionName,
					tenantId: data[i].tenantId
				});
			}
		}
		// console.log('compareObject', this.compareObject(beforeSave, data));

		console.log('save data :', data);

		apiService.put('/api/v1/goods/option/' + this.props.goodsCode, data).done(function (data) {
			that.setState({ data: data });
			that._handleSaveOptionValue();
		});
	},

	handleTagsChange: function handleTagsChange(e) {
		var data = this.state.data;
		// console.log('eee',e);

		data[e.index].goodsOptionItemName = e.tags;
		this.setState({ data: data });
	},

	handleChange: function handleChange(e) {
		var val = e.target.value;
		//id (option/index)로 셋팅됨.
		var id = e.target.id.split('/');
		var dataType = id[0];
		var index = id[1];

		var data = this.state.data;

		if (dataType == 'option') {
			data[index].goodsOptionName = val;
		}
		// console.log(data);
		this.setState({ data: data });
	},

	_handleClickLoadOptionGroupButton: function _handleClickLoadOptionGroupButton() {
		var modal = this.refs.tableSection;

		modal.init();
		modal.show();
	},

	render: function render() {
		var _this = this;

		// console.log("render");
		return React.createElement(
			'div',
			null,
			React.createElement(
				'button',
				{ className: 'btn btn-primary marginTB-xs', id: 'loadOptionGroupButton', onClick: this._handleClickLoadOptionGroupButton },
				React.createElement('i', { className: 'fa fa-plus-square' }),
				'옵션정보 불러오기'
			),
			React.createElement(TableSection, { ref: 'tableSection', setOptionGroupData: this.setOptionGroupData, getOptionGroupList: this.props.getOptionGroupList, title: '옵션그룹 불러오기', onComplete: function () {
					_this.refs.tableSection.hide();_this.reload();
				} }),
			React.createElement(
				'div',
				{ className: 'smart-widget' },
				React.createElement(
					'div',
					{ className: 'smart-widget-header' },
					'상품옵션관리'
				),
				React.createElement(
					'div',
					{ className: 'form-group', id: 'optionForm' },
					this._makeRows(),
					React.createElement(
						'div',
						null,
						'저장버튼을 누르면 아래 판매가와 재고값이 초기화됩니다. 주의해서 저장해주시기 바랍니다.'
					),
					React.createElement(
						'button',
						{ className: 'btn btn-primary marginTB-xs', id: 'addOptionButton', onClick: this._handleClickOptionAddButton },
						React.createElement('i', { className: 'fa fa-plus-square' }),
						'항목추가'
					),
					React.createElement(
						'button',
						{ className: 'btn btn-primary marginTB-xs', id: 'saveOptionButton', onClick: this._handleSaveOptions },
						React.createElement('i', { className: 'fa fa-save m-right-xs' }),
						'저장'
					)
				)
			),
			React.createElement(GoodsOptionValue, { goodsCode: this.props.goodsCode, ref: 'goodsOptionValue' })
		);
	}
});

window.GoodsOptionDetail = GoodsOptionDetail;