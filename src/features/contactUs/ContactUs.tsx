import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shared/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  contactUsSchema,
  type ContactUsFormValues,
} from "@/features/contactUs/schemas/contactUs.schema";
import { useSendMessage } from "@/features/contactUs/hooks/useSendMessage";

export default function ContactUsPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const { mutate, isPending } = useSendMessage();

  const onSubmit = (data: ContactUsFormValues) => {
    mutate(
      {
        conversation_id: crypto.randomUUID(),
        content: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
        type: "text",
      },
      {
        onSuccess: () => reset(),
      },
    );
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 pt-30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left - Info */}
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-h mb-3">
            Contact Us
          </h1>
          <p className="text-text text-sm leading-relaxed max-w-sm mb-10">
            We are committed to processing the information in order to contact
            you and talk about your questions
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-brand" />
              <span className="text-sm text-text-h">080 707 555-321</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="size-5 text-brand" />
              <span className="text-sm text-text-h">demo@example.com</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-brand mt-0.5" />
              <span className="text-sm text-text-h leading-relaxed">
                526 Melrose Street, Water Mill, 11976
                <br />
                New York
              </span>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Input
            type="text"
            placeholder="Name"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            type="email"
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="w-full">
            <Textarea
              placeholder="Message"
              className={`min-h-[140px] rounded-lg border-border-secondary px-4 py-3 resize-none ${
                errors.message
                  ? "border-destructive focus-visible:ring-destructive/20"
                  : ""
              }`}
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="brand"
            size="xl"
            fullWidth
            isLoading={isPending}
            className="rounded-full mt-2"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}
