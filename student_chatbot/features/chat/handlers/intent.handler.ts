export function resolveIntent(message: string, lastUserMessage?:string ): string {
 
    
    let intent = "default";
    
    if(message.toLowerCase().includes("placement")) {
        intent = "placement_query";
    }
    else if(
        message.toLowerCase().includes("package") &&
        lastUserMessage?.toLowerCase().includes("placement")
    ) {
        intent = "placement_query";
    }
    return intent;
}