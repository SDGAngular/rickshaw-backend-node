const { getAllDetailsFromProductsTable, getAllDetailsFromTestimonials, getProductDetails } = require("../Repository/homeRepository");



const productService = async (request,response)=>{
    const responseBody={}
    try{
       
        const productID = request.productID;
        if(!productID || productID.length===0){
            throw ({errorMessage:"error caught in service level", message:"productID required for search"})
        }
        responseBody.productDetails = await  getProductDetails(productID);
        responseBody.otherProducts = await getAllDetailsFromProductsTable();
        responseBody.productDetails.productPictureDetails = responseBody.productDetails.productPictureDetails.sort(function(a, b){return a.id - b.id})
        responseBody.otherProducts = responseBody.otherProducts.filter((eachProduct)=>{
            
            return eachProduct.productID!=productID;
        })


      
    }
    catch(error){
      
        throw ({errorMessage:"error caught in service level", message:error.message});

        
    }

    return responseBody;

}





module.exports={
    productService
}