import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartItem = {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  description:string
}

type CartStore = {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  removeFromCart: (id: string) => void
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      removeFromCart: (id ) =>
  set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          )

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + 1,
                    }
                  : cartItem
              ),
            }
          }

          return {
            cart: [
              ...state.cart,
              {
                ...item,
                quantity: 1,
              },
            ],
          }
        }),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
    }),
    {
      name: "restaurant-cart",
    }
  )
)

export default useCartStore