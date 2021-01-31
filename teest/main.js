//  new Vue( {
//         el:'#app',
//         data:{
//             name:'Yusoff',
//             anchor:'https://google.com',
//             link:'<a href="https://google.com">Google</a>'
//         },
//         // utk event 
//         methods:{
//             change_name:function()
//             {
//                 this.name=event.target.value;
//             }, 
//             sayHi:function()
//             {
//                 alert('Hi AAA')
//             }  
//         }

//     }

   
// );

// new Vue(
//     {
//         el:'#id_style',
//         data:{
//             // name:'Yusoff',
//             // anchor:'https:google.com',
//             // callName:'',
//             isActive:true,
//             error:true,
//             active:true,
//             red:'red',
//             font:'24'
//         },

//        methods:
//        {
//            change_name:function()
//            {
//                this.name=event.target.value;

//            },
//            alertName:function()
//            {
//                this.name='Akid';
//            },
//            hello:function()
//            {
//                alert('Hello word')

//            }, 
           

           
//        },
//        computed:{
//        computedName:function()
//            {
//                console.log("Name computed!!!!!!!!!")
//                return this.name;
//            },
//            watch:{
//                inputName: function(newName){
//                    if(newName){
//                        alert('You have changed Name')
//                    }
//                }
//            }

//         },
//         classObject: function()
//         {
//             return{
//                 active:this.isActive
//             }
//         }
//     }
// );

var obj=new Vue(
    {
    el:'#app',
    
      data:{
          currencies:{},
          amount:null,
          from:'EUR',
          to:'USD',
          nilai:0,
          loading:false,
          
          
      },
    //   methods:
    //   {
    //       reduce: function(){
    //           console.log('done minus')
    //           this.count=this.count-1;

    //       },
    //       add:function(){
    //         console.log('done add')
    //         this.count=this.count+1;
    //       }
    //   },
      mounted(){

        // axios.get('https://free.currconv.com/api/v7/currencies?apiKey=do-not-use-this-key')
        // .then(response=>
        //     this.currencies=response.data.results
            
        //     )

        this.getCurrencies();
      },

      computed:{
          formattedCurrencies()
          {
              return Object.values(this.currencies);
          },
          calculated()
          {
              return (Number(this.amount)*this.nilai).toFixed(3);
          },

          disabled()
          {
              return this.amount===0 ||! this.amount||this.loading;
          }

      },
      watch:{
          from()
          {
              this.nilai=0;
          },
          to()
          {
              this.nilai=0;
          }


          
      },
      methods:{
        getCurrencies()
        {

            const currencies=localStorage.getItem('currencies')
          

            if(currencies)
            {
                this.currencies=JSON.parse(currencies);

             
                return;
            }


            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=do-not-use-this-key')
            
            .then(response=> {
               

                this.currencies= response.data.results;
                localStorage.setItem('currencies', JSON.stringify(response.data.results))
          
            });
        },
        covertCurrency()
        {

            const key=`${this.from}_${this.to}`;
            this.loading=true;
            
            axios.get(`https://free.currconv.com/api/v7/convert?apiKey=do-not-use-this-key&q=${key}`)
            .then(response=>{

        
             this.loading=false
              this.nilai=response.data.results[key].val
              
            

            }
                   
                   
                )
        }
      }


    
}
)