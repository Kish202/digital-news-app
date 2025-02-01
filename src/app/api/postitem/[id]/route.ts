import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItem";

dbConnect();

export async function GET(_request:Request,
    {params}:{params:{id: string}}
)

{


    try {
        
    
    const postItem = await PostItem.findById(params.id).select('-__v');
    return Response.json(postItem);
} catch (error) {
        
return new Response(JSON.stringify({message:"no item found for this id"}),
{status: 404});

}
}

// using fetch doesnt need to return response it itself renders the fetch data on screen console