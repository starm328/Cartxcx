<template>
	<div class="product-property" v-if="action">
		<div class="warp-bg" @click="close"></div>

		<div class="warp-main">
			<header>
				<img :src="pricture">
				<div>
					<p v-html='price'></p>
					<div v-if="data.entities.length > 1">
						<span v-if="fullySelected ">
							<span>已选择：</span>
							<span >{{MapselectedProduct}}</span>
						</span>
						<span v-else>
							<span>请选择：</span>
							<span>{{unSelected}}</span>
						</span>
					</div>
				</div>
			</header>
			库存{{stock}}

			<dl v-for="(item,index) in properties" :key="index" >
				<dt>{{item.label}}</dt>
				<dd v-for="(value,indexvalue) in item.values" :key="indexvalue" :class="[value.selected? 'is_selected': '']">
					<checkbox-group  @change="select(value)">
						<label class="checkbox" :class="value.selected? 'is_selected': ''">
							<checkbox @tap="checked" :value="value.label" :checked="value.selected"  :disabled="value.disabled":data-checked="value.selected"/>
							<span>{{value.label}}</span>
						</label>
					</checkbox-group>
				</dd>
			</dl>
			<p v-if="action == 'buy'" class="shop-btn" @click="buy">立即购买</p>
			<p v-if="action == 'cart'" class="shop-btn" @click="cart">加入购物车</p>
		</div>

	</div>
</template>

<script>
import arraying from '@/utils/arraying';
import server from '@/utils/server';
import Auth from '@/utils/Server/Auth';
import Order from '@/utils/Server/Order';
var CircularJSON = require('circular-json');
export default {
	name: 'product-property',
	data () {
	return {
		values: [],
		selectedValues: {},
		products: {},
		fullySelected: false,
		selectedProduct: undefined,
		totalStock: '-',
		quantity: 1,
		tips: undefined,
		unSelected: '',
		dialog: false,
		login: false,
		data:{entities:[],properties:[]},
		transitionName: 'bounce',
		logaction:'add-to-cart',
		cattrue:false,
		catfalse:false,
		loading:false,
		activeIndex:''
	}
	},
	props: {
		productId: Number,
		product: Object,
		action: String,
	},
	computed: {
		// 处理规格属性
		properties(){
			if(!( this.data )) return null;
			if( this.data.entities.length===1 && this.data.entities[0].values.length ===0)
			{
				console.log('1');
				// 只有一个规格，不用选了
				this.fullySelected= true;
				console.log(this.fullySelected)
				this.selectedProduct=this.data.entities[0].product;
				return;
			}
			// 便于通过id快速找到属性
			var propertiesMap= {};
			this.data.properties.forEach( property=> {
				propertiesMap[property.id]= property;
				property.values= {};
			} );



			// 遍历每个实体
			this.data.entities.forEach( entity=> {
				// 遍历实体的每个值
				if(entity && entity.values){
					entity.values= entity.values.map( meta=> {
						if( propertiesMap[meta.property] && propertiesMap[meta.property].values) {
							let value= propertiesMap[meta.property].values[meta.id];
							if(!( value ))
							{
								// 在属性下建立值表，存储值的字段和状态
								value=
								propertiesMap[meta.property].values[meta.id]=
								{
									id: meta.id,
									property: CircularJSON.stringify(propertiesMap[meta.property]),
									label: meta.label,
									stock: 0,
									disabled: true,
									selected: false,
								};

								// 用数组收录所有值
								this.values.push( value );
							}

							return value;
						}

					} );
					if( entity.product )
					{
						if(entity.values){
							this.products[entity.values.map( x=>x.id ).join()]= entity.product;

						}

						entity.product.values= entity.values;

						this.totalStock = entity.product.stock;

						if(entity.product.stock > 0){
							// this.selectedProduct = entity.product;
							// this.select( this.data.properties[0].values[0] );
						}

					}
				}
			} );

			// // 自动选取单值属性
			// this.data.properties.forEach( property=> {
			// 	const values= arraying( property.values );

			// 	if( 1===values.length )
			// 	{
			// 		values[0].selected= true;
			// 		z(values[0])
			// 		// this.select( values[0] );
			// 		this.selectedValues[values[0].id]= values[0];
			// 		this.unSelected= this.data.properties.filter( x=> !(x.id in this.selectedValues) ).map( x=> x.label ).join( ' ' );

			// 		this.checkDisabled();
			// 		this.checkFullySelected();
			// 	}

			// } );
			// 自动选取单一实体
			(products=> {
				if( 1===products.length )
				{
					products[0].values.forEach( value=> {
						value.selected= true;
						this.select( value );
					} );
				}
			})( arraying( this.products ) );
			this.unSelected= this.data.properties.map( x=> x.label ).join( ' ' );
			this.checkDisabled();
			return this.data.properties;

		},
		// 自动改变库存
		stock(){
			return this.selectedProduct ? this.selectedProduct.stock : this.totalStock;
		},
		picture(){
			this.selectedProduct && this.selectedProduct.picture ? this.selectedProduct.picture['200x200'] : this.product && this.product.main_picture? this.product.main_picture : ''
			return this.selectedProduct && this.selectedProduct.picture ? this.selectedProduct.picture['200x200'] : this.product && this.product.main_picture? this.product.main_picture : ''
		},
		price(){
			return this.selectedProduct ? this.selectedProduct.price : this.product.price;
		},
		MapselectedProduct() {
			return this.selectedProduct && this.data.entities.length > 1? this.selectedProduct.values.map( x=> `[${x.label}]` ).join( '' ) : ''
		}
	},
	created() {
		wx.pro.request({
			url:server.catShop.apiBaseUrl + 'products/' + this.productId + '/data',
			method: 'GET',
		})
		.then(d => {
			if(d.statusCode == '200'){
				this.data = d.data
			}
			// 2XX, 3XX
		})
		.catch(err => {
			alert('服务错误')
			// 网络错误、或服务器返回 4XX、5XX
		})
	},
	methods: {
		// 选择规格
		select(value){

		},
		checked(e) {
			if(e.currentTarget.dataset.checked){

			}else{

			}
		},
		checkFullySelected(){
			if( this.fullySelected= arraying( this.selectedValues ).length>=this.data.properties.length )
			{
				this.selectedProduct= this.products[arraying( this.selectedValues ).map( x=> x.id ).join()];
			}else{
				this.selectedProduct= undefined;
			}
		},
		checkDisabled(){
			this.data.properties.forEach( property=> {
				const selectedValues= arraying( this.selectedValues ).filter( selectedValue=> selectedValue.property.id!==property.id );

				arraying( property.values ).forEach( value=> {
					value.disabled= !this.data.entities.filter(
						entity=> (
							entity.product
						&&
							entity.values.indexOf( value )>-1
						&&
							selectedValues.map( value=> entity.values.indexOf( value )>-1 ).reduce( ( x, y )=> x&&y, true )
						)
					).length;
				} );
			} );
		},
		close() {
			this.$emit('change');
		},
		// 立即购买接口
		buy(){
			wx.showLoading({title: '加载中'})
			if(! this.selectedProduct )
			{
				wx.showToast({
					title: '请选择 '+this.unSelected,
					icon: 'none',
					duration: 2000
				})
				wx.hideLoading()
				return;
			}
			console.log(Auth.user)
			if(Auth.user){
				Order.add(this.selectedProduct.id,this.quantity,'', '',p=>{
					console.log(p)
				})
				wx.hideLoading()
			}else{
				wx.showToast({
					title: '未登录',
					icon: 'none',
					duration: 2000
				})
				wx.hideLoading()
			}
		},
		cart(){
			this.selectedProduct
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../global/style.less';
.product-property{
	position: fixed;
	bottom:0;
	left:0;
	width:100%;
	height:100%;
	.warp-bg{
		width:100%;
		height:100%;
		background:rgba(000,000,000,0.5)
	}
	.warp-main{
		position:fixed;
		bottom:0;
		width:100%;
		bottom:0;
		background:#fff;
		header{
			display:flex;
			margin:10px 0;
			img{
				width: 100px;
				height: 100px;
				margin-top: -35px;
				background-color: #fff;
				margin-left: 20px;
				box-shadow: 0 2px 16px hsla(0,0%,50%,.5);
				display: block;
			}
			>div{
				margin:0 10px;
				font-size:@fonttwo
			}
		}
		.shop-btn{
			width:100%;
			height:45px;
			line-height:45px;
			background:@auxiliary;
			text-align:center;
			color:#fff;
			font-size:@fonttwo;
		}
		dl{
			padding:0 10px;
			margin-bottom:20px;
			dt {
				line-height: 28px;
				display: block;
				font-size: 14px;
			}
			dd{
				float:left;
			}
			dd label span {
			  color: #000;
			  border-radius: 2px;
			  padding: .6em;
			  margin: .2em;
			  cursor: pointer;
			  background: #f3f3f3;
			  display: inline-block;
			}
			dd label.is_selected span{
				    background-color: #f23030;
				    color:#fff;
			}
			dd label.is_disabled span{
				    background-color: #f3f3f3;
				    color:#ccc;
			}
			&::after{
				clear:both;
				display:block;
				content:'';
			}
		}
	}
}
</style>
