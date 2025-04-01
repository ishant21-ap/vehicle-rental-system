import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        quote:
            "“I was really impressed with the level of service I received from this car rental company. The process was smooth and easy, and the car I rented was in excellent condition. The staff was friendly and helpful, and I felt well taken care of throughout my rental period. I would definitely recommend this company to anyone looking for a premium car rental experience.”",
        name: "John Doe",
        location: "From Texas",
        avatar: "", // Optional avatar image URL
    },
    {
        id: 2,
        quote:
            "“Fantastic experience! The vehicles are in top condition and the customer service is outstanding.”",
        name: "Jane Smith",
        location: "From California",
        avatar: "",
    },
    {
        id: 3,
        quote:
            "“A reliable car rental service with great rates. The booking process was straightforward and hassle-free.”",
        name: "Alex Johnson",
        location: "From Florida",
        avatar: "",
    },
];

const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevTestimonial = () => {
        setCurrentIndex(
            currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
        );
    };

    const nextTestimonial = () => {
        setCurrentIndex(
            currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
        );
    };

    const { quote, name, location, avatar } = testimonials[currentIndex];

    return (
        <div className="w-full flex flex-col bg-[#F6F8ED] h-[500px]">
            {/* Header */}
            <div className="py-5 px-20 flex items-center justify-between w-full h-24">
                <span className="text-4xl font-semibold text-black">
                    What Our Customers Say
                </span>
                <div className="flex gap-x-7">
                    <div
                        onClick={prevTestimonial}
                        className="bg-black p-4 rounded-full text-white cursor-pointer"
                    >
                        <ArrowLeft />
                    </div>
                    <div
                        onClick={nextTestimonial}
                        className="bg-black p-4 rounded-full text-white cursor-pointer"
                    >
                        <ArrowRight />
                    </div>
                </div>
            </div>
            {/* Testimonial Quote */}
            <div className="flex flex-col items-center justify-center px-10 text-black h-[300px]">
                <span className="text-2xl font-semibold text-center">{quote}</span>
            </div>
            {/* Author Info */}
            <div className="flex items-center px-20 pb-10 gap-x-5 h-24">
                <div className="w-16 h-16 rounded-full bg-black p-2 flex items-center justify-center">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={name}
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <span className="text-white text-xs">NULL</span>
                    )}
                </div>
                <div className="flex flex-col text-black">
                    <div className="text-2xl font-semibold">{name}</div>
                    <div className="text-lg">{location}</div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
