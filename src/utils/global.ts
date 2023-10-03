export function returnType(type: string) {
  if (type === "job") {
    return "bg-red-50";
  } else if (type === "story") {
    return "bg-green-50";
  } else if (type === "comment") {
    return "bg-blue-50";
  }
}
