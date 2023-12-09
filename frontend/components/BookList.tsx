import { NextComponentType } from "next";
import { useAppSelector } from "@/redux/hooks";
import { selectStudent } from "@/redux/reducer/studentSlice";

// Define the BookList component as a Next.js functional component
const BookList: NextComponentType = () => {
  // Retrieve student data from the Redux store using the selectStudent selector
  const { result, pending } = useAppSelector(selectStudent);

  // Extract the first 5 books from the result, if available
  const books = result?.books?.slice(0, 5);

  // If there is an ongoing answer or login operation, do not render the component
  if (pending.answer || pending.login) {
    return null;
  }

  // Render the BookList component
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-500">
        Recommended Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {books?.map((book, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={book.image}
              alt={book.title}
              className="w-128 h-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-700 mb-2">{book.author}</p>
            <p className="text-gray-600">{book.description}</p>
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4 block"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookList;
