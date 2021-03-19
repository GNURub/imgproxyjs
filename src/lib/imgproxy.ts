import { createHmac } from 'crypto';
import { Buffer } from 'buffer';

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
    resizing_algorithm?:
        | 'nearest'
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

export class ImgProxy {
    private options: any = {
      config: {},
      options: {},
    };

    private abbreviations = {
      resize: 'rs',
      size: 'size',
      resizing_type: 'rt',
      resizing_algorithm: 'ra',
      width: 'w',
      height: 'h',
      enlarge: 'el',
      extend: 'ex',
      gravity: 'g',
      crop: 'c',
      padding: 'pd',
      trim: 't',
      quality: 'q',
      max_bytes: 'mb',
      background: 'bg',
      adjust: 'a',
      brightness: 'br',
      contrast: 'co',
      saturation: 'sa',
      blur: 'bl',
      sharpen: 'sh',
      pixelate: 'pix',
      unsharpening: 'ush',
      watermark: 'wm',
      watermark_url: 'wmu',
      video_thumbnail_second: 'vts',
      style: 'st',
      jpeg_options: 'jpgo',
      png_options: 'pngo',
      gif_options: 'gifo',
      preset: 'pr',
      cachebuster: 'cb',
      strip_metadata: 'sm',
      strip_color_profile: 'scp',
      auto_rotate: 'ar',
      rotate: 'rot',
      filename: 'fn',
      format: 'ext',
    };

    private transformers = {
      resize: this.resize,
      size: this.size,
      extend: this.extend,
      gravity: this.gravity,
      crop: this.crop,
      padding: this.padding,
      trim: this.trim,
      adjust: this.adjust,
      watermark: this.watermark,
      jpeg_options: this.jpegOptions,
      png_options: this.pngOptions,
      gif_options: this.gifOptions,
    };

    constructor(
      { url, key, salt }: { url: string; key?: string; salt?: string },
      options: Options = {},
    ) {
      this.options = {
        config: { key, salt, url },
        settings: {},
      };

      this.isObject(options);

      for (const key in options) {
        this.setOption(key, options[key]);
      }
    }

    setOption(option, value) {
      if (value === null) {
        return;
      }

      this.options.settings[option] = `${this.abbreviations?.[option] ?? option}:${
        this.transformers?.[option]?.call?.(this, value) ?? value
      }`;
    }

    private isObject(val: any) {
      if (!val || typeof val !== 'object') {
        throw 'Need to be an object param';
      }
    }


    background(val: string) {
      return this.setOption('background', val);
    }

    private resize(val: any) {
      this.isObject(val);
      const {
        resizing_type, width, height, enlarge, extend,
      } = val;
      return this.stringify([resizing_type, width, height, enlarge, extend]);
    }

    private size(val: any) {
      this.isObject(val);
      const {
        width, height, enlarge, extend,
      } = val;
      return this.stringify([width, height, enlarge, extend]);
    }

    private extend(val: any) {
      this.isObject(val);
      const { extend, gravity } = val;
      return this.stringify([extend, gravity]);
    }

    private gravity(val: any) {
      this.isObject(val);
      const { gravity_type, x_offset, y_offset } = val;
      return this.stringify([gravity_type, x_offset, y_offset]);
    }

    private crop(val: any) {
      this.isObject(val);
      const { width, height, gravity } = val;
      return this.stringify([width, height, gravity]);
    }

    private padding(val: any) {
      this.isObject(val);
      const {
        top, right, buttom, left,
      } = val;
      return this.stringify([top, right, buttom, left]);
    }

    private trim(val: any) {
      this.isObject(val);
      const {
        threshold, color, equal_hor, equal_ver,
      } = val;
      return this.stringify([threshold, color, equal_hor, equal_ver]);
    }

    private adjust(val: any) {
      this.isObject(val);
      const { brightness, contrast, saturation } = val;
      return this.stringify([brightness, contrast, saturation]);
    }

    private watermark(val: any) {
      this.isObject(val);
      const {
        opacity, position, x_offset, y_offset, scale,
      } = val;
      return this.stringify([opacity, position, x_offset, y_offset, scale]);
    }

    private jpegOptions(val: any) {
      this.isObject(val);
      const {
        progressive,
        no_subsample,
        trellis_quant,
        overshoot_deringing,
        optimize_scans,
        quant_table,
      } = val;
      return this.stringify([
        progressive,
        no_subsample,
        trellis_quant,
        overshoot_deringing,
        optimize_scans,
        quant_table,
      ]);
    }

    private pngOptions(val: any) {
      this.isObject(val);
      const { png_interlaced, png_quantize, png_quantization_colors } = val;
      return this.stringify([
        png_interlaced,
        png_quantize,
        png_quantization_colors,
      ]);
    }

    private gifOptions(val: any) {
      this.isObject(val);
      const { gif_optimize_frames, gif_optimize_transparency } = val;
      return this.stringify([gif_optimize_frames, gif_optimize_transparency]);
    }

    private stringify(option: any[]) {
      return option.map((o) => o ?? '').join(':');
    }

    private sign(target) {
      const hexKey = ImgProxy.hexDecode(this.options.config.key);
      const hexSalt = ImgProxy.hexDecode(this.options.config.salt);

      const hmac = createHmac('sha256', hexKey);
      hmac.update(hexSalt);
      hmac.update(target);
      return ImgProxy.urlSafeBase64(hmac.digest());
    }

    static hexDecode(hex) {
      return Buffer.from(hex, 'hex');
    }

    static urlSafeBase64(string) {
      return Buffer.from(string)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }

    public get(originalImage: string) {
      const { settings } = this.options;
      const { config } = this.options;

      if (!originalImage) {
        throw 'Missing required param: image';
      }

      const encoded_url = ImgProxy.urlSafeBase64(originalImage);
      const options = Object.values(settings).join('/');
      const path = options ? `/${options}/${encoded_url}` : `/${encoded_url}`;
      if (config.key && config.salt) {
        return `${config.url}/${this.sign(path)}${path}`;
      }

      return `${config.url}/insecure${path}`;
    }
}

export default ImgProxy;
