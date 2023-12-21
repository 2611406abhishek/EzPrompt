import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (READ)
export const GET =  async (req,{params}) =>{
     
      try{
          await connectToDB();
          const prompt = await Prompt.findById(params.id).populate('creator');

          if(!prompt)    return new Response("Prompt not found",{status:404});
           

          return new Response(JSON.stringify(prompt),{
            status:200
          })
      }catch(err)
      {
           return new Response("Failed to fetch  Prompt",{status:500});
      }

}

// PATCH(UPDATE)

export const PATCH =  async (req,{params}) =>{
      const {prompt,tag} = await req.json();

      try{
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found",{status:404})

        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:200})

      }catch(err)
      {
        return new Response("Failed to update Prompt",{status:500})
      }
}

// DELETE
export const DELETE = async (req,{params}) =>{

     try{
         await connectToDB();
         await Prompt.findByIdAndDelete(params.id);
         return new Response("Prompt Deleted successfully",{status : 200})
         
     }catch(err)
     {
        return new Response("Failed to Delete",{status:500})
     }
}