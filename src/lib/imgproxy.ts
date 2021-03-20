import { createHmac } from 'crypto';
import { Buffer } from 'buffer';
import { transformers } from './transformer';
import { Adjust, Crop, Extend, GIFOptions, Gravity, Options, Padding, PNGOptions, Resize, RGBColor, Size, Trim, Watermark } from './types';

export class ImgProxy extends transformers {
  private options: any = {
    config: {},
    options: {},
    defaultOpts: {},
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
    resize: this.tresize,
    size: this.tsize,
    extend: this.textend,
    gravity: this.tgravity,
    crop: this.tcrop,
    padding: this.tpadding,
    background: this.tbackground,
    trim: this.ttrim,
    adjust: this.tadjust,
    watermark: this.twatermark,
    jpeg_options: this.tjpegOptions,
    png_options: this.tpngOptions,
    gif_options: this.tgifOptions,
  };

  constructor(
    { url, key, salt }: { url: string; key?: string; salt?: string },
    options: Options = {},
  ) {
    super();

    this.options = {
      config: { key, salt, url },
      settings: {},
    };

    this.isObject(options);

    for (const key in options) {
      this.setOption(key, options[key]);
    }
  }

  setOption(option: string, value: any): ImgProxy {
    if (value === null) {
      return this.resetOption(option);
    }

    this.options.settings[option] = `${this.abbreviations?.[option] ?? option}:${this.transformers?.[option]?.call?.(this, value) ?? value
      }`;

    return this;
  }

  setDefaultOptions(options: Options) {
    this.options.defaultOpts = options;
    this.options.settings = { ...options, ...this.options.settings};
    return this;
  }

  resetDefaultOptions() {
    this.options.defaultOpts = {};
    return this;
  }

  resetOptions() {
    this.options.settings = this.options.defaultOpts;
    return this;
  }

   resetOption(option: string) {
    delete this.options.settings?.[this.abbreviations?.[option] ?? option];
    return this;
  }

  resize(val: Resize) {
    return this.setOption('resize', val);
  }

  crop(val: Crop) {
    return this.setOption('crop', val);
  }

  size(val: Size) {
    return this.setOption('size', val);
  }

  extend(val: Extend) {
    return this.setOption('extend', val);
  }

  trim(val: Trim) {
    return this.setOption('trim', val);
  }

  adjust(val: Adjust) {
    return this.setOption('adjust', val);
  }

  resizingType(val: 'fit' | 'fill' | 'auto') {
    return this.setOption('resizing_type', val);
  }

  resizingAlgorithm(val: 'nearest' | 'linear' | 'cubic' | 'lanczos2' | 'lanczos3') {
    return this.setOption('resizing_algorithm', val);
  }

  width(width: number) {
    return this.setOption('width', `${width}`);
  }

  height(height: number) {
    return this.setOption('height', `${height}`);
  }

  dpr(val: number | string) {
    if (val > 0) {
      return this.setOption('dpr', `${val}`);
    }
    return this;
  }

  maxBytes(val: number) {
    return this.setOption('max_bytes', `${val}`);
  }

  padding(val: Padding) {
    return this.setOption('padding', val);
  }

  enlarge(val: number) {
    return this.setOption('enlarge', `${val}`);
  }

  pixelate(val: number) {
    return this.setOption('pixelate', `${val}`);
  }

  gravity(val: Gravity) {
    return this.setOption('gravity', val);
  }

  quality(quality: number) {
    return this.setOption('quality', `${quality}`);
  }

  background(color: RGBColor | string) {
    return this.setOption('background', color);
  }

  backgroundAlpha(val: number) {
    return this.setOption('background_alpha', `${val}`);
  }

  blur(val: number) {
    return this.setOption('blur', `${val}`);
  }

  saturation(val: number) {
    return this.setOption('saturation', `${val}`);
  }

  contrast(val: number) {
    return this.setOption('contrast', `${val}`);
  }

  brightness(val: number) {
    return this.setOption('brightness', `${val}`);
  }

  sharpen(val: number) {
    return this.setOption('sharpen', `${val}`);
  }

  watermark(val: Watermark) {
    return this.setOption('watermark', val);
  }

  watermarkUrl(val: string) {
    return this.setOption('watermark_url', val);
  }

  preset(...presets: string[]) {
    return this.setOption('preset', presets.join(':'));
  }

  cacheBuster(val: string) {
    return this.setOption('cachebuster', val);
  }

  format(val: string) {
    return this.setOption('format', val);
  }

  filename(val: string) {
    return this.setOption('filename', val);
  }

  rotate(val: number) {
    return this.setOption('rotate', val);
  }

  autoRotate(val: boolean) {
    return this.setOption('auto_rotate', val);
  }

  style(val: string) {
    return this.setOption('style', val);
  }

  page(val: number) {
    return this.setOption('page', `${val}`);
  }

  videoThumbnailSecond(val: number) {
    return this.setOption('video_thumbnail_second', `${val}`);
  }

  stripMetadata(val: boolean) {
    return this.setOption('strip_metadata', val);
  }

  strip_color_profile(val: boolean) {
    return this.setOption('strip_color_profile', val);
  }

  gifOptions(val: GIFOptions) {
    return this.setOption('gif_options', val);
  }

  pngOptions(val: PNGOptions) {
    return this.setOption('png_options', val);
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
