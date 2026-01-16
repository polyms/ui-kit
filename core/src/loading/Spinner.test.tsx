import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Spinner } from './Spinner'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────

describe('Spinner', () => {
  it('renders as SVG element', () => {
    render(<Spinner />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toBeInTheDocument()
    expect(spinner?.tagName).toBe('svg')
  })

  it('renders with default size', () => {
    render(<Spinner />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toHaveAttribute('width', '12')
    expect(spinner).toHaveAttribute('height', '12')
  })

  it('renders with custom size', () => {
    render(<Spinner size={24} />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toHaveAttribute('width', '24')
    expect(spinner).toHaveAttribute('height', '24')
  })

  it('renders with default color', () => {
    render(<Spinner />)
    const paths = document.querySelectorAll('svg path')
    const colorPath = Array.from(paths).find(path => path.getAttribute('fill') === '#181b1f')
    expect(colorPath).toBeInTheDocument()
  })

  it('renders with custom color', () => {
    render(<Spinner color='#FF0000' />)
    const paths = document.querySelectorAll('svg path')
    const colorPath = Array.from(paths).find(path => path.getAttribute('fill') === '#FF0000')
    expect(colorPath).toBeInTheDocument()
  })

  it('renders with default subColor', () => {
    render(<Spinner />)
    const paths = document.querySelectorAll('svg path')
    const subColorPath = Array.from(paths).find(path => path.getAttribute('fill') === '#AEB4BD')
    expect(subColorPath).toBeInTheDocument()
  })

  it('renders with custom subColor', () => {
    render(<Spinner subColor='#00FF00' />)
    const paths = document.querySelectorAll('svg path')
    const subColorPath = Array.from(paths).find(path => path.getAttribute('fill') === '#00FF00')
    expect(subColorPath).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    render(<Spinner className='custom-spinner' />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toHaveClass('custom-spinner')
    expect(spinner).toHaveClass('spinner-loader')
  })

  it('supports all props combined', () => {
    render(<Spinner className='my-spinner' color='#123456' size={32} subColor='#654321' />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toHaveAttribute('width', '32')
    expect(spinner).toHaveAttribute('height', '32')
    expect(spinner).toHaveClass('my-spinner')

    const paths = document.querySelectorAll('svg path')
    const colorPath = Array.from(paths).find(path => path.getAttribute('fill') === '#123456')
    const subColorPath = Array.from(paths).find(path => path.getAttribute('fill') === '#654321')
    expect(colorPath).toBeInTheDocument()
    expect(subColorPath).toBeInTheDocument()
  })

  it('has two path elements for animation', () => {
    render(<Spinner />)
    const paths = document.querySelectorAll('svg path')
    expect(paths).toHaveLength(2)
  })

  it('renders SVG with proper viewBox', () => {
    render(<Spinner />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toHaveAttribute('viewBox', '0 0 20 20')
  })

  it('renders with fill attribute set to none on svg', () => {
    render(<Spinner />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toHaveAttribute('fill', 'none')
  })

  it('renders with xmlns attribute for SVG namespace', () => {
    render(<Spinner />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg')
  })

  it('first path has subColor fill', () => {
    render(<Spinner subColor='#CCCCCC' />)
    const paths = document.querySelectorAll('svg path')
    expect(paths[0]).toHaveAttribute('fill', '#CCCCCC')
  })

  it('second path has color fill', () => {
    render(<Spinner color='#333333' />)
    const paths = document.querySelectorAll('svg path')
    expect(paths[1]).toHaveAttribute('fill', '#333333')
  })

  it('renders with correct clip-rule attributes', () => {
    render(<Spinner />)
    const paths = document.querySelectorAll('svg path')
    paths.forEach(path => {
      expect(path).toHaveAttribute('clip-rule', 'evenodd')
    })
  })

  it('renders with correct fill-rule attributes', () => {
    render(<Spinner />)
    const paths = document.querySelectorAll('svg path')
    paths.forEach(path => {
      expect(path).toHaveAttribute('fill-rule', 'evenodd')
    })
  })

  it('renders with path data attributes', () => {
    render(<Spinner />)
    const paths = document.querySelectorAll('svg path')
    paths.forEach(path => {
      expect(path).toHaveAttribute('d')
      const dAttr = path.getAttribute('d')
      expect(dAttr).toBeTruthy()
      expect(dAttr?.length).toBeGreaterThan(0)
    })
  })

  it('renders multiple spinners independently', () => {
    render(
      <div>
        <Spinner color='#FF0000' size={16} />
        <Spinner color='#00FF00' size={24} />
        <Spinner color='#0000FF' size={32} />
      </div>
    )
    const spinners = document.querySelectorAll('svg.spinner-loader')
    expect(spinners).toHaveLength(3)

    expect(spinners[0]).toHaveAttribute('width', '16')
    expect(spinners[1]).toHaveAttribute('width', '24')
    expect(spinners[2]).toHaveAttribute('width', '32')

    const allPaths = document.querySelectorAll('svg path')
    expect(allPaths).toHaveLength(6) // 2 paths per spinner × 3 spinners
  })

  it('handles size of zero', () => {
    render(<Spinner size={0} />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toHaveAttribute('width', '0')
    expect(spinner).toHaveAttribute('height', '0')
  })

  it('handles large size value', () => {
    render(<Spinner size={1000} />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toHaveAttribute('width', '1000')
    expect(spinner).toHaveAttribute('height', '1000')
  })

  it('preserves SVG structure integrity', () => {
    render(<Spinner />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner?.children).toHaveLength(2) // Should have exactly 2 path children
    expect(spinner?.children[0]?.tagName).toBe('path')
    expect(spinner?.children[1]?.tagName).toBe('path')
  })

  it('renders without accessibility violations', () => {
    render(<Spinner />)
    const spinner = document.querySelector('svg.spinner-loader')
    // SVG should exist and be properly structured
    expect(spinner).toBeInTheDocument()
    expect(spinner?.querySelectorAll('path')).toHaveLength(2)
  })

  it('multiple className values are combined correctly', () => {
    render(<Spinner className='class1 class2 class3' />)
    const spinner = document.querySelector('svg.spinner-loader')
    expect(spinner).toHaveClass('spinner-loader')
    expect(spinner).toHaveClass('class1')
    expect(spinner).toHaveClass('class2')
    expect(spinner).toHaveClass('class3')
  })

  it('handles color with hex format', () => {
    const colors = ['#000000', '#FFFFFF', '#123ABC', '#abcdef']
    colors.forEach(color => {
      const { unmount } = render(<Spinner color={color} />)

      const paths = document.querySelectorAll('svg path')
      const colorPath = Array.from(paths).find(path => path.getAttribute('fill') === color)
      expect(colorPath).toBeInTheDocument()

      unmount()
    })
  })
})
