export type GravityType = 'no' | 'so' | 'ea' | 'we' | 'noea' | 'nowe' | 'soea' | 'sowe' | 'ce';
export type ResizeType = 'fit' | 'fill' | 'fill-down' | 'force' | 'auto';
export type ResizeAlgorithm = 'nearest' | 'linear' | 'cubic' | 'lanczos2' | 'lanczos3';
export type ValueOf<T> = T[keyof T];

export interface Abbreviations {
  [key: string]: string;
}
export interface Settings {
  url: string;
  key?: string;
  salt?: string;
  autoreset: boolean;
}

export interface Gravity {
  gravity_type: GravityType;
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
  gravity?: GravityType;
  x_offset?: number;
  y_offset?: number;
}

export interface ExtendAspectRatio {
  extend: boolean;
  gravity?: Omit<GravityType, 'sm'>;
  x_offset?: number;
  y_offset?: number;
}

export interface Crop {
  width?: number;
  height?: number;
  gravity?: GravityType;
  x_offset?: number;
  y_offset?: number;
}

export interface Zoom {
  zoom_x_y?: number;
  zoom_x?: number;
  zoom_y?: string;
}

export interface Padding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface Gradient {
  opacity?: number;
  color?: string;
  direction?: 'down' | 'up' | 'left' | 'right';
  start?: number;
  stop?: number;
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

export interface UnsharpMaskingOptions {
  mode?: 'auto' | 'none' | 'always';
  weight?: number;
  divider?: number;
}

export interface BlurDetectionsOptions {
  sigma?: number;
  classNames?: string[];
}

export interface DrawDetectionsOptions {
  draw?: boolean;
  classNames?: string[];
}

export interface Options {
  resize?: Resize;
  size?: Size;
  resizing_type?: ResizeType;
  resizing_algorithm?: ResizeAlgorithm;
  width?: number;
  height?: number;
  min_width?: number;
  min_height?: number;
  webp_options?: number;
  dpr?: number;
  dpi?: number;
  enlarge?: boolean;
  raw?: boolean;
  extend?: Extend;
  extend_aspect_ratio?: ExtendAspectRatio;
  gravity?: Gravity;
  crop?: Crop;
  padding?: Padding;
  trim?: Trim;
  gradient?: Gradient;
  quality?: number;
  max_bytes?: number;
  max_src_resolution?: number;
  max_src_file_size?: number;
  max_animation_frames?: number;
  max_animation_frame_resolution?: number;
  background?: RGBColor | string;
  background_alpha?: number;
  adjust?: Adjust;
  brightness?: string;
  expires?: string;
  contrast?: number;
  saturation?: number;
  blur?: number;
  sharpen?: number;
  pixelate?: number;
  watermark?: Watermark;
  watermark_url?: string;
  style?: string;
  fallback_image_url?: string;
  jpeg_options?: JPEGOptions;
  png_options?: PNGOptions;
  gif_options?: GIFOptions;
  unsharp_masking?: UnsharpMaskingOptions;
  blur_detections?: BlurDetectionsOptions;
  draw_detections?: DrawDetectionsOptions;
  skip_processing?: string[];
  preset?: string[];
  cachebuster?: string;
  video_thumbnail_second?: number;
  filename?: string;
  auto_rotate?: boolean;
  rotate?: number;
  page?: number;
  format?: string;
  strip_metadata?: boolean;
  keep_copyright?: boolean;
  strip_color_profile?: boolean;
  zoom?: Zoom;
  enforce_thumbnail?: boolean;
  return_attachment?: boolean;
  format_quality?: {
    [key: string]: number;
  };
}
