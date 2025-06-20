export default async function ImageExtractor(imageObjs){
    return await Promise.all(
        Object.values(imageObjs).map(async(objs)=>{
            const img=await objs()
            return img.default
        })
    )
}