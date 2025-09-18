"use client";

import {
  useState,
  useActionState,
  useOptimistic,
  useRef,
  useEffect,
} from "react";
import {
  FiX,
  FiMenu,
  FiSearch,
  FiPaperclip,
  FiSmile,
  FiSend,
  FiTrash2,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import EmojiPicker from "emoji-picker-react";

async function sendMessageAction(prevState, formData) {
  const message = formData.get("message");
  const image = formData.get("image");

  if (!message && !image) {
    return { error: "chat.messageOrImageError", success: false };
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const success = Math.random() > 0.1;

  if (success) {
    const messageData = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
      sender: "you",
    };

    if (image) {
      return {
        success: true,
        message: "chat.imageSent",
        data: { ...messageData, type: "image", content: image },
      };
    }

    return {
      success: true,
      message: "chat.messageSent",
      data: {
        ...messageData,
        type: message.includes(":") ? "emoji" : "text",
        content: message.trim(),
      },
    };
  } else {
    return {
      error: "chat.messageSendFailed",
      success: false,
    };
  }
}

const ChatPage = () => {
  const { t } = useTranslation();
  const [selectedChat, setSelectedChat] = useState("jubayer-ahmad");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputFormRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);

  const [state, formAction, isPending] = useActionState(sendMessageAction, {
    success: false,
  });

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, newMessage]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [optimisticMessages, isPending]);

  useEffect(() => {
    if (state.success && state.data) {
      if (!messages.find((msg) => msg.id === state.data.id)) {
        setMessages((prev) => [...prev, state.data]);
        setPreviewImage(null);
      }
    }
  }, [state]);

  useEffect(() => {
    setMessages([]);
    setPreviewImage(null);
    setShowEmojiPicker(false);
  }, [selectedChat]);

  const handleEmojiClick = (emojiObject) => {
    const input = inputFormRef.current?.querySelector("input[name=message]");
    if (input) input.value += emojiObject.emoji;
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !emojiButtonRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const clearImagePreview = () => {
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleFormSubmit = async (formData) => {
    const message = formData.get("message");
    if (!message || message.trim() === "") {
      if (previewImage) {
        const formDataWithImage = new FormData();
        formDataWithImage.append("image", previewImage);
        addOptimisticMessage({
          id: Date.now(),
          sender: "You",
          content: previewImage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: true,
          type: "image",
          isPending: true,
        });
        formAction(formDataWithImage);
        return;
      }
      return;
    }

    addOptimisticMessage({
      id: Date.now(),
      sender: "You",
      content: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
      type: message.includes(":") ? "emoji" : "text",
      isPending: true,
    });

    const form = document.getElementById("message-form");
    if (form) form.reset();

    formAction(formData);
  };

  const conversations = [
    {
      id: "henry-dholi",
      name: "Henry Dholi",
      lastMessage: "Come across your profile and...",
      avatar: "/user1.jpg",
      isActive: true,
      time: "2:00pm",
    },
    {
      id: "jubayer-ahmad",
      name: "Jubayer Ahmad",
      lastMessage: "You are welcome!",
      avatar: "/user2.jpg",
      isActive: false,
      time: "2:00pm",
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedUser = conversations.find((conv) => conv.id === selectedChat);

  return (
    <div className="flex h-[90vh] bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 lg:z-0 w-80 bg-white border-r border-gray-200 flex flex-col h-full`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {t("chat.activeConversations")}
              </h2>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {conversations.length}
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder={t("chat.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                setSelectedChat(conversation.id);
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 ${
                selectedChat === conversation.id
                  ? "bg-[#0C2397]"
                  : "hover:bg-gray-50"
              }`}
            >
              <img
                src={conversation.avatar || "/placeholder.svg"}
                alt={conversation.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium text-sm truncate ${
                    selectedChat === conversation.id
                      ? "text-gray-100"
                      : "text-gray-900"
                  }`}
                >
                  {conversation.name}
                </h3>
                <p
                  className={`text-xs truncate ${
                    selectedChat === conversation.id
                      ? "text-gray-100"
                      : "text-gray-600"
                  }`}
                >
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <img
            src={selectedUser?.avatar || "/placeholder.svg?height=40&width=40"}
            alt={selectedUser?.name || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">
              {selectedUser?.name || "Unknown User"}
            </h3>
            <p className="text-sm text-gray-500">
              {isPending
                ? t("chat.sendingMessage")
                : t("chat.messageTo", { name: selectedUser?.name || "user" })}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {optimisticMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isOwn ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-xs sm:max-w-md lg:max-w-lg">
                {!message.isOwn && (
                  <p className="text-xs text-gray-500 mb-1 ml-1">
                    {message.sender}
                  </p>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl relative ${
                    message.isOwn
                      ? "bg-blue-600 text-white rounded-br-md "
                      : "bg-gray-200 text-gray-900 rounded-bl-md"
                  } ${message.isPending ? "opacity-70" : ""}`}
                >
                  {message.type === "image" ? (
                    <img
                      src={message.content}
                      alt="Sent image"
                      className="max-w-full h-auto rounded-lg"
                    />
                  ) : (
                    <p className="text-md">{message.content}</p>
                  )}
                  {message.isPending && (
                    <div className="absolute -right-1 -bottom-1">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                <p
                  className={`text-xs text-gray-500 mt-1 ${
                    message.isOwn ? "text-right mr-1" : "ml-1"
                  }`}
                >
                  {message.time}
                  {message.isPending && (
                    <span className="ml-1 text-yellow-600">Sending...</span>
                  )}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="mx-4 mb-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{state.error}</p>
          </div>
        )}

        {/* Image Preview */}
        {previewImage && (
          <div className="mx-4 mb-2 p-3 bg-gray-100 border border-gray-200 rounded-lg flex items-center gap-3">
            <img
              src={previewImage}
              alt="Image preview"
              className="max-w-[100px] h-auto rounded-lg"
            />
            <button
              onClick={clearImagePreview}
              className="p-2 hover:bg-gray-200 rounded-full"
              disabled={isPending}
            >
              <FiTrash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
        )}

        {/* Message Input */}
        <div
          ref={inputFormRef}
          className="bg-white border-t border-gray-200 p-4 relative"
        >
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-16 right-10 z-10"
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <form
            id="message-form"
            action={handleFormSubmit}
            className="flex items-center gap-3"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                name="message"
                placeholder={t("chat.messageTo", {
                  name: selectedUser?.name || "user",
                })}
                className="w-full pl-4 pr-24 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  disabled={isPending}
                >
                  <FiPaperclip className="w-5 h-5 text-gray-400" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  ref={emojiButtonRef}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  disabled={isPending}
                >
                  <FiSmile className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors flex items-center justify-center"
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FiSend className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
