import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import images from '../utils/images';
import { useEffect } from 'react';

const Photos = ({ query }) => {
  const [imageOrder, setImageOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredImages, setFilteredImages] = useState(images);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    setTimeout(() => {
      const initialImages = images;
      setImageOrder(initialImages);
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const newFilteredImages = imageOrder.filter((image) => {
      return image.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredImages(newFilteredImages);
  }, [query, imageOrder]);

  const onDragStart = () => {
    if (!isAuthenticated) {
      toast.error(
        'You need to be logged in to use drag and drop functionality.'
      );
    }
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedImageOrder = Array.from(imageOrder);
    const [reorderedImage] = updatedImageOrder.splice(result.source.index, 1);
    updatedImageOrder.splice(result.destination.index, 0, reorderedImage);

    setImageOrder(updatedImageOrder);
  };
  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (filteredImages.length === 0) {
    return <div>No results found</div>;
  }
  return (
    <section className="photos">
      {!isAuthenticated && (
        <div>
          <p>You need to be logged in to use drag and drop functionality.</p>
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="cards py-[5rem]"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredImages.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={image.id}
                  index={index}
                  isDragDisabled={!isAuthenticated}
                  onDragStart={onDragStart}
                >
                  {(provided) => (
                    <li
                      className="h-[17rem] w-full"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img
                        className="object-cover h-full w-full"
                        src={image.img}
                        alt=""
                      />

                      {image.tags.map((tag, index) => {
                        return (
                          <span
                            key={index}
                            className="bg-black px-3 py-1 text-white"
                          >
                            {tag.toUpperCase()}
                          </span>
                        );
                      })}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};
export default Photos;
