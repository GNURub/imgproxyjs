export interface Gravity {
    gravity_type:
    | 'no'
    | 'so'
    | 'ea'
    | 'we'
    | 'noea'
    | 'nowe'
    | 'soea'
    | 'sowe'
    | 'ce';
    x_offset?: number;
    y_offset?: number;
}

export interface RGBColor {
    r: number;
    g: number;
    b: number;
}

export interface Resize {
    resizing_type?: string;
    width?: number;
    height?: number;
    enlarge?: boolean;
    extend?: boolean;
}

export interface Size {
    width?: number;
    height?: number;
    enlarge?: boolean;
    extend?: boolean;
}

export interface Extend {
    extend: boolean;
    gravity?: string;
}

export interface Crop {
    width?: number;
    height?: number;
    gravity?: string;
}

export interface Padding {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

export interface Trim {
    threshold?: string;
    color?: string;
    equal_hor?: boolean;
    equal_ver?: boolean;
}

export interface Adjust {
    brightness?: number;
    contrast?: number;
    saturation?: number;
}

export interface Watermark {
    opacity: string;
    position?: string;
    x_offset?: number;
    y_offset?: number;
    scale?: string;
}

export interface JPEGOptions {
    progressive?: boolean;
    no_subsample?: boolean;
    trellis_quant?: boolean;
    overshoot_deringing?: boolean;
    optimize_scans?: boolean;
    quant_table?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export interface PNGOptions {
    png_interlaced?: boolean;
    png_quantize?: boolean;
    png_quantization_colors: number;
}

export interface GIFOptions {
    gif_optimize_frames?: boolean;
    gif_optimize_transparency?: boolean;
}

export interface Options {
    resize?: Resize;
    size?: Size;
    resizing_type?: 'fit' | 'fill' | 'auto';
    resizing_algorithm?: 'nearest'
    | 'linear'
    | 'cubic'
    | 'lanczos2'
    | 'lanczos3';
    width?: number;
    height?: number;
    dpr?: number;
    enlarge?: boolean;
    extend?: Extend;
    gravity?: Gravity;
    crop?: Crop;
    padding?: Padding;
    trim?: Trim;
    quality?: number;
    max_bytes?: number;
    background?: string;
    adjust?: Adjust;
    brightness?: string;
    contrast?: number;
    saturation?: number;
    blur?: number;
    sharpen?: number;
    pixelate?: number;
    watermark?: Watermark;
    watermark_url?: string;
    style?: string;
    jpeg_options?: JPEGOptions;
    png_options?: PNGOptions;
    gif_options?: GIFOptions;
    preset?: string[];
    cachebuster?: string;
    filename?: string;
    auto_rotate?: boolean;
    rotate?: number;
    format?: string;
}