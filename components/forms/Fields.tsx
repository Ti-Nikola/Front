'use client';

import { CalendarIcon, Check, ChevronsUpDown, InfoIcon } from 'lucide-react';
import { HTMLInputTypeAttribute } from 'react';
import { UseFormReturn } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { OptionsArray } from '@/types/Generic';
import { cn } from '@/utils/cn';
import { formatDateToDisplay } from '@/utils/dates';
import { formatDecimal, formatNumberWithDots, formatPercentage } from '@/utils/numbers';
import { formatRut } from '@/utils/rut';

interface FieldProps {
  form: UseFormReturn<any>;
  fieldId: string;
  fieldName: string;
  formDescription?: string;
  disabled?: boolean;
  placeholder?: string;
  containerClassName?: string;
  className?: string;
}

interface CheckBoxFieldProps extends FieldProps {
  options: OptionsArray;
}

interface ComboboxFieldProps extends FieldProps {
  options: OptionsArray;
  inputPlaceholder?: string;
}

interface InputFieldProps extends FieldProps {
  tooltip?: string;
  tooltipClassName?: string;
  type?: HTMLInputTypeAttribute;
}

interface SelectFieldProps extends FieldProps {
  options: OptionsArray;
}

const CheckBoxField = ({
  form,
  options,
  fieldId,
  fieldName,
  disabled = false,
  formDescription,
  containerClassName,
  className,
}: CheckBoxFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={() => (
        <FormItem className={containerClassName}>
          <div className="mb-4">
            <FormLabel className="text-base">{fieldName}</FormLabel>
            <FormDescription>{formDescription}</FormDescription>
          </div>
          {options.map((option) => (
            <FormField
              key={option.value}
              control={form.control}
              name={fieldId}
              render={({ field }) => {
                return (
                  <FormItem
                    key={option.value}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        disabled={disabled}
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, option.value])
                            : field.onChange(
                                field.value?.filter((value: string) => value !== option.value)
                              );
                        }}
                        className={className}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ComboboxField = ({
  form,
  options,
  fieldId,
  fieldName,
  disabled = false,
  placeholder = 'Seleccionar',
  inputPlaceholder,
  formDescription,
  containerClassName,
  className,
}: ComboboxFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', containerClassName)}>
          <FormLabel>{fieldName}</FormLabel>
          <Popover>
            <PopoverTrigger asChild className="bg-transparent">
              <FormControl>
                <Button
                  disabled={disabled}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-[254px] justify-between',
                    (!field.value || field.value === 'all') && 'text-muted-foreground',
                    className
                  )}
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[254px] p-0">
              <Command>
                <CommandInput placeholder={inputPlaceholder} className="h-9" />
                <CommandList className="relative">
                  <CommandEmpty>No se encontraron resultados</CommandEmpty>
                  <CommandGroup className="overflow-y-scroll">
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          form.setValue(fieldId, option.value);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            option.value === field.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const DatePickerField = ({
  form,
  fieldId,
  fieldName,
  disabled = false,
  placeholder = 'Selecciona una fecha',
  formDescription,
  containerClassName,
  className,
}: FieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', containerClassName)}>
          <FormLabel>{fieldName}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant={'outline'}
                  className={cn(
                    'w-[254px] bg-transparent text-left font-normal',
                    !field.value && 'text-muted-foreground',
                    className
                  )}
                >
                  {field.value ? formatDateToDisplay(field.value) : <span>{placeholder}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const DecimalField = ({
  form,
  fieldId,
  fieldName,
  placeholder,
  formDescription,
  disabled = false,
  containerClassName,
  className = 'w-[254px]',
}: FieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', containerClassName)}>
          <FormLabel>{fieldName}</FormLabel>

          <FormControl>
            <Input
              placeholder={placeholder}
              className={className}
              type="text"
              disabled={disabled}
              value={field.value}
              onChange={(e) => {
                const formattedValue = formatDecimal(e.target.value);
                field.onChange(formattedValue);
              }}
            />
          </FormControl>

          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const InputField = ({
  form,
  fieldId,
  fieldName,
  type = 'text',
  placeholder,
  formDescription,
  tooltip,
  disabled = false,
  containerClassName,
  className,
  tooltipClassName,
}: InputFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', containerClassName)}>
          <FormLabel className="flex items-center justify-between">
            {fieldName}
            {tooltip && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="size-3" />
                </TooltipTrigger>
                <TooltipContent className={cn('relative', tooltipClassName)}>
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </FormLabel>
          <FormControl>
            {type === 'number' ? (
              <Input
                placeholder={placeholder}
                className={cn('w-[254px]', className)}
                type="text"
                maxLength={13}
                disabled={disabled}
                value={field.value}
                onChange={(e) => {
                  const formattedValue = formatNumberWithDots(e.target.value);
                  field.onChange(formattedValue);
                }}
              />
            ) : (
              <Input
                placeholder={placeholder}
                className={cn('w-[254px]', className)}
                type={type}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>

          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PercentageField = ({
  form,
  fieldId,
  fieldName,
  placeholder,
  formDescription,
  disabled = false,
  containerClassName,
  className = 'w-[254px]',
}: FieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', containerClassName)}>
          <FormLabel>{fieldName}</FormLabel>

          <FormControl>
            <Input
              placeholder={placeholder}
              className={className}
              type="text"
              maxLength={6}
              disabled={disabled}
              value={field.value}
              onChange={(e) => {
                const formattedValue = formatPercentage(e.target.value);
                field.onChange(formattedValue);
              }}
            />
          </FormControl>

          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PhoneField = ({
  form,
  fieldId,
  fieldName,
  placeholder,
  formDescription,
  disabled = false,
  containerClassName,
  className,
}: InputFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', containerClassName)}>
          <FormLabel className="flex items-center justify-between">{fieldName}</FormLabel>
          <FormControl className="">
            <PhoneInput
              country={'cl'}
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
              }}
              disabled={disabled}
              placeholder={placeholder || '+56 912 345 678'}
              inputClass={cn(
                'max-w-[254px] flex h-9 w-full rounded-md px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                className
              )}
            />
          </FormControl>

          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const RutField = ({
  form,
  fieldId,
  fieldName,
  placeholder,
  formDescription,
  disabled = false,
  containerClassName,
  className = 'w-[254px]',
}: FieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', containerClassName)}>
          <FormLabel>{fieldName}</FormLabel>

          <FormControl>
            <Input
              placeholder={placeholder}
              className={className}
              type="text"
              disabled={disabled}
              value={field.value}
              onChange={(e) => {
                const formattedValue = formatRut(e.target.value);
                field.onChange(formattedValue);
              }}
            />
          </FormControl>

          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SelectField = ({
  form,
  options,
  fieldId,
  fieldName,
  disabled = false,
  placeholder = 'Seleccionar',
  formDescription,
  containerClassName,
  className,
}: SelectFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col xs:w-min', containerClassName)}>
          <FormLabel>{fieldName}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                disabled={disabled}
                className={cn(
                  className,
                  !field.value || field.value === 'all' ? 'text-muted-foreground' : '',
                  options.find((option) => option.value === field.value)?.className
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={String(option.value)}
                  className={option.className}
                >
                  {option.className ? '' : option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SwitchField = ({
  form,
  fieldId,
  fieldName,
  formDescription,
  disabled = false,
  containerClassName,
  className,
}: FieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex min-w-[250px] flex-row items-center justify-between rounded-lg border p-3 shadow-sm',
            containerClassName
          )}
        >
          <div className="flex flex-col">
            <FormLabel>{fieldName}</FormLabel>

            <FormDescription>{formDescription}</FormDescription>
          </div>
          <FormControl className="relative bottom-1">
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              className={className}
              disabled={disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const TextareaField = ({
  form,
  fieldId,
  fieldName,
  disabled = false,
  placeholder,
  formDescription,
  containerClassName,
  className = 'w-[254px]',
}: FieldProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldId}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', containerClassName)}>
          <FormLabel>{fieldName}</FormLabel>

          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn('text-start', className)}
              disabled={disabled}
              {...field}
            />
          </FormControl>

          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export {
  CheckBoxField,
  ComboboxField,
  DatePickerField,
  DecimalField,
  InputField,
  PercentageField,
  PhoneField,
  RutField,
  SelectField,
  SwitchField,
  TextareaField,
};
