import {
  Toaster as ChakraToaster,
  createToaster,
  Portal,
  Spinner,
  Stack,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
  ToastIndicator,
} from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top-end',
  pauseOnPageIdle: true,
})

// Renders each queued toast - Chakra v3's <ChakraToaster> takes a render-prop `children`
// function per toast rather than rendering anything by default.
export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <ToastRoot>
            {toast.type === 'loading' ? (
              <Spinner size="sm" color="brandOrange" />
            ) : (
              <ToastIndicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            </Stack>
            {toast.closable && <ToastCloseTrigger />}
          </ToastRoot>
        )}
      </ChakraToaster>
    </Portal>
  )
}
