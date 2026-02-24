export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
   
      <div
        className="relative flex min-h-[845px] w-full max-w-8xl flex-col items-center justify-center rounded-xl bg-cover bg-c  bg-no-repeat shadow-2xl"
        style={{ backgroundImage: "url('/bot.jpg')" }}
      >
        
        <div className="absolute inset-0 bg-black/55 rounded-xl"></div>

        <div className="relative z-10 flex flex-col items-center  gap-6 text-center px-6">
          
          <h1 className="text-5xl  font-bold text-white">
             Student Help Chatbot
          </h1>

          <p className="max-w-md text-lg font-bold text-gray-200">
            Your AI Assistant for Academics, Doubts, and Learning Support.
          </p>
          <p className="max-w-md pt-2 text-sm text-gray-200"> 
            Created by Aryan Prasher, Anshika Yadav, Aditya Narayan, Itisha Panwar

          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200">
              Start Chatting
            </button>

            <button className="rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black">
              Learn More
            </button>
           
          </div>

          <div className="max-w-lg flex flex-col  font-bold text-gray-200  " >
            TASK FOR THIS WEEK :

            <p className="w-full text-gray-200 font-semibold text-xs"> * Make a branc of your name  </p>
            <p className="w-full text-gray-200 font-semibold text-xs"> * Add some comment in the /apps/page.tsx  </p>
            <p className="w-full text-gray-200 font-semibold text-xs"> * When the file is modified commit it to your made branch git commit -m "test"  </p>
            <p className="w-full text-gray-200 font-semibold text-xs"> * Now push the commited file to your made branch  "git push origin branchname" </p>
            <p className="w-full text-gray-200 font-semibold text-xs"> * If possible send me a PR request to merge the commmited changes to the main branch   </p>


            
          </div>
          

        </div>
      </div>
    </div>
  );
}


//test changes
// test changes
// test changes
// test changes
// test changes
// test changes itisha