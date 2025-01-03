export const styles = {
  layout: "min-h-screen bg-[#191A1B] flex flex-col",
  header: "flex justify-between p-6",
  main: "flex-1 flex flex-col items-center justify-center -mt-32",
  title: "text-white text-5xl font-medium mb-16",
  search: {
    container: "relative w-full max-w-3xl",
    input: "w-full bg-[#212224] text-white text-lg rounded-xl px-6 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600",
    buttons: "absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#2A2B2D] rounded-lg p-1",
    button: "text-gray-400 hover:text-white px-3 py-1.5 text-sm transition-colors font-['Geist_Sans'] rounded-md hover:bg-[#2D3131]",
    divider: "w-px h-5 bg-[#2D3131]",
    submitButton: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-[#2A2B2D]"
  }
};