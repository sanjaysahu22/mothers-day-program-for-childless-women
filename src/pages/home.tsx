import CategorySuggestions from "../components/category"
import PeopleSuggestions from "../components/suggest"
import BlogPosts from "../components/miniblog"
import Header from "@/components/header"


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
     <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto p-4 flex gap-8">
          <aside className="w-1/4 fixed top-20 bottom-0 overflow-y-auto pr-4">
            <div className="space-y-8">
              <CategorySuggestions />
              <PeopleSuggestions />
            </div>
          </aside>
          <div className="w-1/4" aria-hidden="true"></div>
          <section className="w-3/4   overflow-y-auto" style={{ height: 'calc(100vh - 5rem)' }}>
            <BlogPosts />
         
          </section>
        </div>
      </main>
    </div>
  )
} 