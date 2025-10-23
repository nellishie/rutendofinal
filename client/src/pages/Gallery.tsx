import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaPlus, FaTrash, FaTimes, FaImages, FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Link } from "wouter";
import type { GalleryImage } from "@shared/schema";

export default function Gallery() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({ title: "", description: "", imageUrl: "" });
  const { toast } = useToast();

  const { data: images, isLoading } = useQuery<{ data: GalleryImage[] }>({
    queryKey: ["/api/gallery"],
  });

  const addImageMutation = useMutation({
    mutationFn: async (imageData: typeof newImage) => {
      return await apiRequest("/api/gallery", {
        method: "POST",
        body: JSON.stringify(imageData),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "Success!",
        description: "Image added successfully.",
      });
      setNewImage({ title: "", description: "", imageUrl: "" });
      setIsAddModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/gallery/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "Success!",
        description: "Image removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddImage = () => {
    if (!newImage.title || !newImage.imageUrl) {
      toast({
        title: "Validation Error",
        description: "Please provide a title and image URL.",
        variant: "destructive",
      });
      return;
    }
    addImageMutation.mutate(newImage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link href="/">
            <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back">
              <FaArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Achievement Gallery
              </h1>
              <p className="text-lg text-muted-foreground">
                A collection of memorable moments and achievements
              </p>
            </div>

            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2"
              size="lg"
              data-testid="button-add-image"
            >
              <FaPlus className="w-4 h-4" />
              Add Image
            </Button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-card rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : images?.data && images.data.length > 0 ? (
          <motion.div
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {images.data.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group break-inside-avoid mb-6"
                data-testid={`card-gallery-image-${index}`}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg bg-card">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    data-testid={`img-gallery-${index}`}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg mb-1" data-testid={`text-title-${index}`}>
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className="text-sm text-white/90" data-testid={`text-description-${index}`}>
                          {image.description}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-4 right-4"
                      onClick={() => deleteImageMutation.mutate(image.id)}
                      disabled={deleteImageMutation.isPending}
                      data-testid={`button-delete-${index}`}
                    >
                      <FaTrash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <FaImages className="w-24 h-24 mx-auto mb-6 text-muted-foreground/50" />
            <h2 className="text-2xl font-semibold mb-2">No Images Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start building your gallery by adding your first achievement picture!
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2"
              data-testid="button-add-first-image"
            >
              <FaPlus className="w-4 h-4" />
              Add Your First Image
            </Button>
          </motion.div>
        )}

        <AnimatePresence>
          {isAddModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setIsAddModalOpen(false)}
              data-testid="modal-add-image"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Add New Image</h2>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsAddModalOpen(false)}
                    data-testid="button-close-modal"
                  >
                    <FaTimes className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Title *
                    </label>
                    <Input
                      placeholder="Achievement title..."
                      value={newImage.title}
                      onChange={(e) =>
                        setNewImage({ ...newImage, title: e.target.value })
                      }
                      data-testid="input-title"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Image URL *
                    </label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={newImage.imageUrl}
                      onChange={(e) =>
                        setNewImage({ ...newImage, imageUrl: e.target.value })
                      }
                      data-testid="input-image-url"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Description (Optional)
                    </label>
                    <Textarea
                      placeholder="Brief description of the achievement..."
                      value={newImage.description}
                      onChange={(e) =>
                        setNewImage({ ...newImage, description: e.target.value })
                      }
                      className="min-h-24"
                      data-testid="input-description"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddModalOpen(false)}
                      className="flex-1"
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddImage}
                      disabled={addImageMutation.isPending}
                      className="flex-1"
                      data-testid="button-submit"
                    >
                      {addImageMutation.isPending ? "Adding..." : "Add Image"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
