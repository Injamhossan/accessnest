import { render, screen } from '@testing-library/react'
import ProductCard from '../ProductCard'

// Mock dependencies
jest.mock('@/store/langStore', () => ({
  useLangStore: () => ({ lang: 'en' })
}))

const mockAddItem = jest.fn()
jest.mock('@/store/cartStore', () => ({
  useCartStore: (selector: any) => {
    // Return mockAddItem when the selector is called
    // We assume the component calls: useCartStore((state) => state.addItem)
    // For our tests, we'll just return mockAddItem directly.
    return mockAddItem
  }
}))

jest.mock('@/utils/dictionary', () => ({
  dict: {
    en: {
      productCard: {},
      admin: { categories: {} }
    }
  }
}))

jest.mock('@/lib/fpixel', () => ({
  event: jest.fn()
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Extract non-string attributes like fill
    const { fill, ...restProps } = props
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img data-fill={fill ? "true" : undefined} {...restProps} />
  },
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>
  }
})

describe('ProductCard', () => {
  const mockProps = {
    id: '1',
    slug: 'test-product',
    title: 'Test Product Title',
    description: 'Test description',
    price: '100',
    rating: 4.5,
    reviews: 10,
    image: '/test-image.jpg',
    category: 'digital'
  }

  it('renders product title and price', () => {
    render(<ProductCard {...mockProps} />)
    
    expect(screen.getByText('Test Product Title')).toBeInTheDocument()
    expect(screen.getByText('৳100')).toBeInTheDocument()
  })

  it('calls addItem and tracking when Add to Cart is clicked', () => {
    mockAddItem.mockClear()
    const fp = require('@/lib/fpixel')
    fp.event.mockClear()

    render(<ProductCard {...mockProps} />)
    
    const addToCartBtn = screen.getByText('Add to Cart').closest('button')
    addToCartBtn?.click()

    expect(mockAddItem).toHaveBeenCalledWith({
      id: '1',
      slug: 'test-product',
      title: 'Test Product Title',
      price: '100',
      image: '/test-image.jpg',
      category: 'digital'
    })

    expect(fp.event).toHaveBeenCalledWith('AddToCart', expect.any(Object))
  })

  it('calls tracking when Add to Wishlist is clicked', () => {
    const fp = require('@/lib/fpixel')
    
    // Clear mock from previous test to ensure clean state
    fp.event.mockClear() 

    const { container } = render(<ProductCard {...mockProps} />)
  
    const wishlistBtn = container.querySelector('button')
    wishlistBtn?.click()

    expect(fp.event).toHaveBeenCalledWith('AddToWishlist', expect.any(Object))
  })
})
